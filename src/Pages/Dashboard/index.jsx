import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";

import EnhancedTable from "./Table";
import toast from "react-hot-toast";
import axios from "axios";
import { SERVER_URL } from "../../api/url";

const Dashboard = () => {
  const currentMonth = new Date().getMonth() + 1;
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());  // Set default to current year
      const [selectedMonth, setSelectedMonth] = useState(currentMonth);  // Default to January (numeric format)
       const [years, setYears] = useState([]); 
const[loading,setLoading]=useState(false)
const [data,setData]=useState({})
      const handleYearChange = (event) => {
        setSelectedYear(event.target.value); // Set selected year when dropdown changes
    };
    const formattedDate = `${selectedMonth} 31 ${selectedYear}`;

     const fetchData= async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get(`${SERVER_URL}/dashboard/dashboard/recent-task-overview?date=${formattedDate}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          });
         if(selectedMonth <= currentMonth){
          setData(response.data.data);
         }else{
          setData([]);
         }
        } catch (err) {
          let errorMessage = 'An error occurred. Please try again later.';
    
          if (err.response) {
            switch (err.response.status) {
              case 401:
              case 400:
                errorMessage = err.response.data?.message || 'Your Token is blacklist.';
                localStorage.clear();
                setUser(null);
                navigate("/");
                break;
              case 500:
                errorMessage = err.response.data?.message || 'Server error. Please try again later.';
                break;
              case 503:
                errorMessage = 'Service is temporarily unavailable. Please try again later.';
                break;
              case 502:
                errorMessage = 'Bad Gateway: The server is down. Please try again later.';
                break;
              default:
                errorMessage = err.response.data?.message || 'An error occurred.';
            }
          } else if (err.request) {
            errorMessage = 'Network error. Please check your internet connection.';
          } else {
            errorMessage = `Error: ${err.message}`;
          }
    
          toast.error(errorMessage, {
            position: 'top-right',
            duration: 5000,
          });
        } finally {
          setLoading(false);
        }
      };
console.log(selectedMonth,currentMonth)
    // Handler for month selection change
    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value); // Set selected month when dropdown changes
    };
   
  const monthToAbbreviation = (month) => {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months[parseInt(month) - 1]; // Convert month number to month abbreviation
};

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const lastTwoYears = [currentYear, currentYear - 1, currentYear - 2]; // Get current and last two years
        setYears(lastTwoYears); // Set the years state

        fetchData(); // Call the fetchData function to fetch data for the current year and selected month
    }, [selectedYear, selectedMonth]); 
  return ( 
    <div className="p-5 flex flex-col gap-5 mt-20 lg:mt-24 hide-scrollbar" >
  <div className="flex justify-between items-center">
  <h1 className="text-gray-600 text-xl">Task Management</h1>
    <div className="flex gap-4 justify-center items-center">
                        <p>Year:</p>
                        <select
                            id="options"
                            name="options"
                            className="mt-1 block w-full py-1 px-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                            value={selectedYear}
                            onChange={handleYearChange}
                            aria-label="Select Year"
                        >
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                        <p>Month:</p>
                        <select
                            value={selectedMonth}
                            onChange={handleMonthChange}
                            className="mt-1 block w-full py-1 px-2 border border-gray-300 rounded-md shadow-sm"
                            aria-label="Select Month"
                        >
                            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map((month) => (
                                <option key={month} value={month}>
                                    {monthToAbbreviation(month)} {/* Display month abbreviation */}
                                </option>
                            ))}
                        </select>
                    </div>
  </div>
   
    {/* <ChartGroup/> */}
  {
    loading ? "Loading...." :(
      <EnhancedTable data={data}/>
    )
  }
    <Footer/>
   
</div>
  );
};

export default Dashboard;