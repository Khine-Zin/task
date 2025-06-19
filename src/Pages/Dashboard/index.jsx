import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";

import EnhancedTable from "./Table";
import toast from "react-hot-toast";
import axios from "axios";
import { SERVER_URL } from "../../api/url";
import { Button } from "@mui/material";

const Dashboard = () => {

   
     
const[loading,setLoading]=useState(false)
const [data,setData]=useState({})
 const [download,setDownload] =useState(false)  

     const fetchData= async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get(`${SERVER_URL}/dashboard/dashboard/recent-task-overview`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          });
          setData(response.data.data);
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

    const handleDownload = async () => {
  setDownload(true);
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${SERVER_URL}/dashboard/dashboard/recent-task-download`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      responseType: 'blob' // 👈 MUST for file download!
    });

    // Create a Blob from the response data
    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    // Optional: Dynamic filename
    const date = new Date();
    const fileName = `Brand-Overview-${date.toISOString().split('T')[0]}.xlsx`;
    a.download = fileName;

    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

    // Cleanup and UI state
    setDownload(false);
   
    toast.success('Successfully Downloaded!', {
      position: 'top-right',
      duration: 5000,
    });
   

  } catch (err) {
   setDownload(false)
    let errorMessage = 'An error occurred. Please try again later.';

    if (err.response) {
      switch (err.response.status) {
        case 401:
        case 400:
          errorMessage = err.response.data?.message || 'Unauthorized';
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
  }
};



    useEffect(() => {
        fetchData(); // Call the fetchData function to fetch data for the current year and selected month
    }, []); 
  return ( 
    <div className="p-5 flex flex-col gap-5 mt-20 lg:mt-24 hide-scrollbar" >
  <div className="flex justify-between items-center">
  <h1 className="text-gray-600 text-xl">Task Management</h1>
    <Button
            variant="contained"
            sx={{
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: "#000000",
              textTransform: 'none',
              marginTop:1
            }}
           
            onClick={()=>handleDownload()} 
          >
          {download ? "Downloading" :"Excel Download"}
          </Button>
  </div>
   
    {/* <ChartGroup/> */}
  {
    loading ? <div className="text-center">Loading....</div> :(
      <EnhancedTable data={data}/>
    )
  }
    <Footer/>
   
</div>
  );
};

export default Dashboard;