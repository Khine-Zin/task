import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import IconButton from '@mui/material/IconButton';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import toast, { Toaster } from 'react-hot-toast';  // Import toast and Toaster

import { Box, FormControl, InputLabel, MenuItem, Select, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { SERVER_URL } from '../../api/url';
import userStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { Info, Storefront, UploadFile } from '@mui/icons-material';
import FileUpload from '../../components/FileUpload';
import { FiUploadCloud } from 'react-icons/fi';
import { RiUploadCloud2Fill } from 'react-icons/ri';
import { MdCloudUpload } from 'react-icons/md';
import Datepicker from '../../components/DatePicker';
import Monthpicker from '../../components/Monthpicker';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



const Plan = () => {


 const [searchQuery, setSearchQuery] = React.useState("");
 const [id,setId]=React.useState("")
 const setUser = userStore((state) => state.setUser);
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [newUser, setNewUser] = React.useState({ name: '', email: '', role: '', password: '' });
const [monthsearch,setMonthSearch]=React.useState("")
const [brand,setBrand]=React.useState([])
  const [loading,setLoading]=React.useState(false)
  const [Create,setCreate]=React.useState(false)
    const navigate = useNavigate();
const [yearsearch,setYearSearch]=React.useState("")
  const [data, setData] = React.useState([]);
  const [pager, setPager] = React.useState({ currentPage: 1, pageSize: 10 });
  const debounceTimer = React.useRef(null);
  const [bannerImage, setBannerImage] = React.useState("");
  const [social,setSocail]=React.useState('')

const filtered = brand.filter(item => item.name === searchQuery);

const filteredMonth = filtered?.[0]?.months.filter(item => item.year === yearsearch);

// console.log("Start Date:", startDateFormatted);
// console.log("End Date:", endDateFormatted);

  const fetchData= async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${SERVER_URL}/plan/view-plan?page=${pager.currentPage}&limit=${pager.pageSize}&status=confirm&brand=${searchQuery==="All" ? "" :searchQuery}&search=${yearsearch==="All"? "":yearsearch}&category=${monthsearch ==="All" ? "":monthsearch}`, {
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


 React.useEffect(() => {
  
  
    fetchData();
  }, [pager.currentPage,monthsearch,searchQuery,yearsearch]); 

  const handlePageChange = (direction) => {
    setPager(prev => {
      const newPage = prev.currentPage + direction;
      return {
        ...prev,
        currentPage: newPage,
      };
    });
  };

const fileContent = new Blob(["dummy content"], { type: "image/jpeg" });

const file = new File(
  [fileContent],
  "IMG-4b17871b0dd059bc2eb8d34a9f4314d3-V.jpg",
  {
    type: "image/jpeg",
    lastModified: 1746972689590
  }
);





  const handleCreateAccountClick = (row) => {
  setId(row._id);
  setSocail(row?.task?.soical_media)
    setOpenCreateDialog(true);
  };
console.log(social)
  const handleCreateUserSubmit = async() => {
   setCreate(true)
    const token = localStorage.getItem("token");


    try {
      const formData = new FormData();
      formData.append("date", newUser.startDate);
     if(social==="tiktok-script"){
       formData.append("design",file);
     }else{
       formData.append("design",bannerImage);
     }
      
      const response = await axios.post(
        `${SERVER_URL}/plan/create-plan/${id}`,
        formData,
        {
          headers: {
            "Authorization": token,
            'Accept': 'multipart/form-data',
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
    setCreate(false)
     if(response.data?.statusCode===201){
      fetchData()
      toast.success('Successful Created!', {
        position: 'top-right',
        duration: 5000,
    });
    setOpenCreateDialog(false);
    setNewUser("");
    setBannerImage("")
   }else if(response.data?.statusCode===203){
      toast.error(`${response.data?. message
        }`, {
          position: 'top-right',
          duration: 5000,
      });
   }
 
  } catch (err) {
      let errorMessage = 'An error occurred. Please try again later.';
      setCreate(false)
     
      if (err.response) {
          switch (err.response.status) {
              case 401:
              case 400:
                  errorMessage = err.response.data?.message || 'Unauthorized';
                  localStorage.clear();
                  setUser(null);
                  navigate("/"); // Redirect to login
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

   
      // Error toast
      toast.error(errorMessage, {
          position: 'top-right',
          duration: 5000,
      });
  }

  };

    const fetchBrand = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
  
      try {
       
        const brandResponse = await axios.get(`${SERVER_URL}/brand/view-brand?page=1&limit=30`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
        setBrand(brandResponse.data.data?.currentDatas);
  
  
      } catch (err) {
        if (!errorShown) { // Show error only if it hasn't been shown yet
          handleError(err);
          setErrorShown(true); // Mark that the error has been shown
        }
      } finally {
        setLoading(false);
      }
    };

     React.useEffect(() => {
          const timeoutId = setTimeout(() => {
            fetchBrand();
          }, 1000); // Set the delay in milliseconds (e.g., 1000ms = 1 second)
        
          return () => clearTimeout(timeoutId); // Cleanup the timeout on unmount
        }, []); // Empty dependency array ensures it runs only once

console.log(data)
  return (
    <div className="mt-24 lg:mx-4 mx-2">
      <div className='hidden lg:block'>
      <div className='flex justify-between gap-3 items-center mb-5 mt-[100px]'>
      <h2 className="text-xl text-gray-700">Total: {loading ? "0":data.total        }</h2>
       <div className="relative flex gap-5">
                <FormControl sx={{ width: 200 }} margin="normal">
        <InputLabel id="role-label">Select Brand</InputLabel>
        <Select
          labelId="role-label"
          id="role"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          label="Select Brand"
           
        >
            <MenuItem value="All">All</MenuItem>
          {brand.length === 0 ? (
            <MenuItem disabled>No option</MenuItem>
          ) : (
            brand.map((user) => (
              <MenuItem key={user._id} value={user.name}>
                {user.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
           <FormControl sx={{ width: 200 }} fullWidth margin="normal">
        <InputLabel id="year-label">Select Year</InputLabel>
        <Select
          labelId="year-label"
          id="year"
          value={yearsearch}
          label="Select Year"
          onChange={(e) => setYearSearch(e.target.value)}
        >
           <MenuItem value="All">All</MenuItem>
          {filtered?.length === 0 || !filtered?.[0]?.months ? (
            <MenuItem disabled>No option</MenuItem>
          ) : (
            [...new Set(filtered?.[0]?.months?.map((m) => m.year))].map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
      
         <FormControl sx={{ width: 200 }} fullWidth margin="normal">
        <InputLabel id="month-label">Select Month</InputLabel>
        <Select
          labelId="month-label"
          id="month"
          value={monthsearch}
          label="Select Month"
          onChange={(e) => setMonthSearch(e.target.value)}
        >
           <MenuItem value="All">All</MenuItem>
          {filteredMonth?.length === 0 ? (
            <MenuItem disabled>No option</MenuItem>
          ) : (
            filteredMonth?.map((user) => (
              <MenuItem key={user._id} value={user.month}>
                {["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth", "Eleventh", "Twelfth"][user.month - 1]} Month
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
              
                </div>
      </div>
      </div>
      <div className='flex justify-between gap-3 items-center mb-5 mt-[100px] lg:hidden'>
      <h2 className="text-xl text-gray-700">Plan</h2>
       
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
            <StyledTableCell align="left">Post</StyledTableCell>
            <StyledTableCell align="left">Brand Name</StyledTableCell>
            <StyledTableCell align="left">Month</StyledTableCell>
            <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {data?.currentDatas?.[0]?.content?.length === 0 ? (
    <StyledTableRow>
      <StyledTableCell colSpan={5} align="center">
        There is no plan found
      </StyledTableCell>
    </StyledTableRow>
  ) : (
    data?.currentDatas?.map((dataItem, index) =>
      dataItem?.content?.map((row, rowIndex) =>
        row?.tasks?.map((taskItem, taskIndex) => {
          const task = taskItem?.task;
          return (
            <StyledTableRow key={index}>
               <StyledTableCell align="left"> {task?.soical_media === "tiktok-trend"
    ? `tiktok-trend-${task?.postNumber}`
    : task?.soical_media === "tiktok-slide"
    ? `tiktok-slide-${task?.postNumber}`
    : task?.soical_media === "tiktok-script"
    ? `tiktok-script-${task?.postNumber}`
     : task?.soical_media === "free"
    ? `free post-${task?.postNumber}`
    : `post-${task?.postNumber}`}</StyledTableCell>
              <StyledTableCell align="left">{task?.brand?.name}</StyledTableCell>
            <TableCell align="left">
                     {task?.year} - {["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"][task?.month - 1]} Month 
                    </TableCell>
              <StyledTableCell align="left">
                <IconButton
                  onClick={() => handleCreateAccountClick(taskItem)}
                  aria-label="update"
                >
                  <MdCloudUpload />
                </IconButton>
           <Tooltip title={task?.headline ? task?.headline:"No headline" } >
           <IconButton
                  onClick={() =>
                    navigate("/plan/detail", { state: taskItem })
                  }
                  aria-label="info"
                >
                  <Info />
                </IconButton>
           </Tooltip>
              </StyledTableCell>
            </StyledTableRow>
          );
        })
      )
    )
  )}
</TableBody>

        </Table>
      </TableContainer>
      <div className="flex gap-2 justify-end items-center mt-4">
        <p>Page {pager.currentPage} of {data.totalPages}</p>
        <div className="flex gap-2">
          <button disabled={pager.currentPage === 1} onClick={() => handlePageChange(-1)} className="p-2 bg-gray-200 rounded-l hover:bg-gray-300">
            <HiChevronLeft />
          </button>
          <button disabled={pager.currentPage === data.totalPages} onClick={() => handlePageChange(1)} className="p-2 bg-gray-200 rounded-r hover:bg-gray-300">
            <HiChevronRight />
          </button>
        </div>
      </div>
  

      {/* Create User Form Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} fullWidth maxWidth="sm">
  <DialogTitle>{social==="tiktok-script" ? "Calendar Date" :"Upload Graphic"}</DialogTitle>
  <DialogContent style={{ width: "500" }}>
  
  <Box display="flex" gap={2} mt={2}>
      {/* Start Date */}
      <Box flex={1}>
        <InputLabel shrink> Date</InputLabel>
        <Datepicker
          value={newUser.startDate}
          onChange={(e) => setNewUser({ ...newUser, startDate: e.target.value })}
          name="startDate"
        />
      </Box>
    
   
    </Box>
  
   {
    social !=="tiktok-script" && (
       <FileUpload setBannerImage={setBannerImage} image={bannerImage} />
    )
   }
  </DialogContent>
  <DialogActions sx={{ mb: 2, mr: 2 }}>
    <Button onClick={() => {
      setBannerImage("")
      setNewUser("")
      setOpenCreateDialog(false)
    }} sx={{ color: "#666464" }}>
      Cancel
    </Button>
    <Button onClick={handleCreateUserSubmit} sx={{ backgroundColor: "#262323", color: "#ffffff" }}>
      {Create ? "loading..." : "Upload"}
    </Button>
  </DialogActions>
</Dialog>


     
    </div>
  );
};

export default Plan;
