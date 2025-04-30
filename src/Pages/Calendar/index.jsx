import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import toast, { Toaster } from 'react-hot-toast';  // Import toast and Toaster

import { Box, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { SERVER_URL } from '../../api/url';
import userStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { CheckCircle, Download } from '@mui/icons-material';
import { useState } from 'react';
import Datepicker from '../../components/DatePicker';

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



const Task= () => {


 
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
 const setUser = userStore((state) => state.setUser);
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [newUser, setNewUser] = React.useState({ name: '', email: '', role: '', password: '' });

  const [loading,setLoading]=React.useState(false)
  const [Create,setCreate]=React.useState(false)
    const navigate = useNavigate();
  const isTabletOrSmaller = useMediaQuery('(max-width: 960px)');
  const [datacontent, setDataContent] = React.useState([]);
  const [dataHeadline, setDataHeadline] = React.useState([]);
  const [brand,setBrand]=React.useState([])

  const [pager, setPager] = React.useState({ currentPage: 1, pageSize: 9});
  const debounceTimer = React.useRef(null);
  const role = localStorage.getItem("userRole");
  const [type, setType] = React.useState("headline");
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);

  };
  const filteredPost = dataHeadline?.filter((post) => {
    const postBrand = post.brand?.name === newUser.brand;
    const deadlineDate = new Date(post.deadline);
    const startDate = new Date(newUser.start_date);
    const endDate = new Date(newUser.end_date);
 

    // Deadline က start နဲ့ end ကြားမှာရှိလား စစ်မယ်
    const isWithinDateRange = deadlineDate >= startDate && deadlineDate <= endDate;
  
    return postBrand && isWithinDateRange;
  });
  const [item,setItem]=useState("")
    
  const [errorShown, setErrorShown] = React.useState(false);

  const [total,settotal]=useState([])
  
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };
  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      // Fetch task data first based on pager.currentPage
      const taskResponse = await axios.get(`${SERVER_URL}/content-calendar/view-content-calendar?page=${pager.currentPage}&limit=${pager.pageSize}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      const taskData = taskResponse.data?.data.currentDatas[0];

      setDataContent(taskData?.content);
      setDataHeadline(taskData?.headline);
      settotal(taskResponse.data?.data?.totalPages)
     

    } catch (err) {
      if (!errorShown) { // Show error only if it hasn't been shown yet
        handleError(err);
        setErrorShown(true); // Mark that the error has been shown
      }
    } finally {
      setLoading(false);
    }
  };
  console.log(datacontent)
  const fetchBrand = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
     
      const brandResponse = await axios.get(`${SERVER_URL}/brand/view-brand?page=${pager.currentPage}&limit=${pager.pageSize}`, {
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
  
  
    fetchData();
  }, [pager.currentPage]); // Dependency on pager.currentPage

  
  
    React.useEffect(() => {
      const timeoutId = setTimeout(() => {
        fetchBrand();
      }, 1000); // Set the delay in milliseconds (e.g., 1000ms = 1 second)
    
      return () => clearTimeout(timeoutId); // Cleanup the timeout on unmount
    }, []); // Empty dependency array ensures it runs only once
    
  

  const handleError = (err) => {
    setErrorShown(true)
    let errorMessage = "An error occurred. Please try again later.";
  
    if (err.response) {
      switch (err.response.status) {
        case 401:
        case 400:
          errorMessage = err.response.data?.message || "Your Token is blacklist.";
          localStorage.clear();
          setUser(null);
          navigate("/");
          break;
        case 500:
          errorMessage = err.response.data?.message || "Server error. Please try again later.";
          break;
        case 503:
          errorMessage = "Service is temporarily unavailable. Please try again later.";
          break;
        case 502:
          errorMessage = "Bad Gateway: The server is down. Please try again later.";
          break;
        default:
          errorMessage = err.response.data?.message || "An error occurred.";
      }
    } else if (err.request) {
      errorMessage = "Network error. Please check your internet connection.";
    } else {
      errorMessage = `Error: ${err.message}`;
    }
  
    toast.error(errorMessage, {
      position: "top-right",
      duration: 5000,
    });
  };
  const handlePageChange = (direction) => {
    setPager(prev => {
      const newPage = prev.currentPage + direction;
      return {
        ...prev,
        currentPage: newPage,
      };
    });
  };




  const handleClick = (user,item,type) => {
 
    setSelectedUser(user)
    setItem(item) 
    setOpenDialog(true);
  };



  const confirm =async () => {
 
    setCreate(true)
    const token = localStorage.getItem("token");
// if(selectedUser==="confirm"){
// console.log(item)
// return false
// }

    try {
      const response = await axios.post(
          `${SERVER_URL}/content-calendar/action-content-calendar/${item._id}`,{
            "action":selectedUser
          }, {
              headers: {
                "Authorization":token,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
             
          }
      );
  if(response){
   setCreate(false)
   toast.success('Successfully!', {
    position: 'top-right',
    duration: 5000,
});
fetchData()
setOpenDialog(false)
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


  const cancelDelete = () => {
    setOpenDialog(false);
  };

  const handleDownload = () => {
    setOpenCreateDialog(true);
    setNewUser("")
    setType("headline")
  };
console.log(type)
const handleCreateUserSubmit = async () => {
  setCreate(true);
  const token = localStorage.getItem("token");

  const endpoints = {
    headline: `${SERVER_URL}/content-calendar/download-headline-content-calendar`,
    content: `${SERVER_URL}/content-calendar/download-content-content-calendar`,
    calendar: `${SERVER_URL}/content-calendar/download-content-calendar`,
  };

  const selectedEndpoint = endpoints[type];

  if (!selectedEndpoint) {
    toast.error("Invalid type selected", {
      position: 'top-right',
      duration: 5000,
    });
    setCreate(false);
    return;
  }

  try {
    const response = await axios.get(
      `${selectedEndpoint}?startdate=${newUser?.start_date}&enddate=${newUser?.end_date}&brandId=${newUser?.brand}`,
      {
        headers: {
          Authorization: token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    setCreate(false);

    if (response.data?.statusCode === 201) {
      fetchData();
      toast.success('Successfully Created!', {
        position: 'top-right',
        duration: 5000,
      });
      setOpenCreateDialog(false);
      setNewUser("");
      setBannerImage("");
    } else if (response.data?.statusCode === 203) {
      toast.error(response.data?.message || "Request failed", {
        position: 'top-right',
        duration: 5000,
      });
    }

  } catch (err) {
    setCreate(false);
    let errorMessage = 'An error occurred. Please try again later.';

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

    toast.error(errorMessage, {
      position: 'top-right',
      duration: 5000,
    });
  }
};





  return (
    <div className="mt-24 lg:mx-4 mx-2">
       <div className='hidden lg:block'>
     <div className='flex justify-between gap-3 items-center mb-5 mt-[100px]'>
      <h2 className="text-xl text-gray-700 font-bold">Headline</h2>
        {
          role ==="admin" && (
            <div className='flex gap-3 items-center'>
         <div className="relative">
         
          </div>
          <Button
            variant="contained"
            sx={{
              height: '43px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: "#000000",
              textTransform: 'none'
            }}
            startIcon={<Download />}
            onClick={handleDownload} 
          >
           Download
          </Button>
        </div>
          )
        }
      </div>
     </div>
     <div className='flex justify-between gap-3 items-center mb-5 mt-[100px] lg:hidden'>
      <h2 className="text-xl text-gray-700 font-bold">Headline</h2>
        <div className='flex gap-3 items-center'>
          
          {
            role==="admin" && (
              <Button
            variant="contained"
            sx={{
              height: '43px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: "#000000",
              textTransform: 'none'
            }}
           
            onClick={handleDownload} 
          >
           Download
          </Button>
            )
          }
        </div>
      </div>
      <TableContainer component={Paper}>
  <Table sx={{ minWidth: 500 }} aria-label="customized table">
    <TableHead>
      <TableRow>
      <StyledTableCell align="left">Post</StyledTableCell>
        <StyledTableCell align="left">Brand Name</StyledTableCell>
        <StyledTableCell align="center">Action</StyledTableCell> {/* Change to 'center' */}
      </TableRow>
    </TableHead>
    <TableBody>
  {dataHeadline === undefined || dataHeadline.length===0 ? (
    <StyledTableRow>
      <StyledTableCell colSpan={5} align="center">
        There is no headline task
      </StyledTableCell>
    </StyledTableRow>
  ) : (
    dataHeadline?.map((row) =>
      row?.tasks.map((item, index) => (
        <StyledTableRow key={index}>
            <StyledTableCell align="left">post - {item?.post}</StyledTableCell>
          <StyledTableCell align="left">{item?.brand?.name}</StyledTableCell>
          <StyledTableCell
            align="center"
            sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}
          >
            <Button
              onClick={() => handleClick("confirm", item,"headline")}
              variant="outlined"
              sx={{
                textTransform: 'none',
                backgroundColor: 'green',
                color: 'white',
                padding: '2px 4px',
                fontSize: '0.75rem',
              }}
            >
              Confirm
            </Button>

            <Button
              onClick={() => handleClick("revise", item,"headline")}
              variant="outlined"
              sx={{
                textTransform: 'none',
                backgroundColor: 'red',
                color: 'white',
                padding: '2px 4px',
                fontSize: '0.75rem',
              }}
            >
              Revise
            </Button>

            <Button
              onClick={() => navigate("/calendar/headline", { state: item })}
              sx={{
                textTransform: 'none',
                backgroundColor: 'orange',
                color: 'white',
                padding: '2px 4px',
                fontSize: '0.75rem',
              }}
            >
              Details
            </Button>
          </StyledTableCell>
        </StyledTableRow>
      ))
    )
  )}
</TableBody>

  </Table>
</TableContainer>

<div className='flex justify-between gap-3 items-center mb-5 mt-[100px]'>
        <h2 className="text-xl text-gray-700 font-bold">Content</h2>
      
      </div>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
    <TableHead>
      <TableRow>
      <StyledTableCell align="left">Post</StyledTableCell>
        <StyledTableCell align="left">Brand Name</StyledTableCell>
        <StyledTableCell align="center">Action</StyledTableCell> {/* Change to 'center' */}
      </TableRow>
    </TableHead>
    <TableBody>
  {datacontent === undefined || datacontent.length === 0 ? (
    <StyledTableRow>
      <StyledTableCell colSpan={5} align="center">
        There is no content task
      </StyledTableCell>
    </StyledTableRow>
  ) : (
    datacontent?.flatMap((row) =>
      row?.tasks.map((item, index) => (
        <StyledTableRow key={item._id || index}>
          <StyledTableCell align="left">post - {item?.post}</StyledTableCell>
          <StyledTableCell align="left">{item?.task?.brand?.name}</StyledTableCell>
          <StyledTableCell
            align="center"
            sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}
          >
            <Button
              onClick={() => handleClick("confirm", item, "content")}
              variant="outlined"
              sx={{
                textTransform: 'none',
                backgroundColor: 'green',
                color: 'white',
                padding: '2px 4px',
                fontSize: '0.75rem',
              }}
            >
              Confirm
            </Button>

            <Button
              onClick={() => handleClick("revise", item, "content")}
              variant="outlined"
              sx={{
                textTransform: 'none',
                backgroundColor: 'red',
                color: 'white',
                padding: '2px 4px',
                fontSize: '0.75rem',
              }}
            >
              Revise
            </Button>

            <Button
              onClick={() => navigate("/calendar/content", { state: item })}
              sx={{
                textTransform: 'none',
                backgroundColor: 'orange',
                color: 'white',
                padding: '2px 4px',
                fontSize: '0.75rem',
              }}
            >
              Details
            </Button>
          </StyledTableCell>
        </StyledTableRow>
      ))
    )
  )}
</TableBody>

  </Table>
</TableContainer>



   <div className="flex gap-5 justify-end items-center mt-4">
        <p>Headline Page {pager.currentPage} of {total?.headline}</p>
        <p>Content Page {pager.currentPage} of {total?.content}</p>
        <div className="flex gap-2">
          <button disabled={pager.currentPage === 1} onClick={() => handlePageChange(-1)} className="p-2 bg-gray-200 rounded-l hover:bg-gray-300">
            <HiChevronLeft />
          </button>
          <button disabled={pager.currentPage === total?.headline && total?.content} onClick={() => handlePageChange(1)} className="p-2 bg-gray-200 rounded-r hover:bg-gray-300">
            <HiChevronRight />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={cancelDelete}>
        <DialogTitle>Confirm </DialogTitle>
        <DialogContent>
          Are you sure you want to {selectedUser} this task?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} sx={{color:"#666464"}}>
            Cancel
          </Button>
          <Button onClick={confirm} sx={{ color: 'red' }}>
          {Create ? "loading...":selectedUser}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create User Form Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} fullWidth maxWidth="sm">
        {/* <DialogTitle>Download</DialogTitle> */}
        <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} fullWidth maxWidth="sm">
               <DialogTitle>Download Pdf</DialogTitle>
               <DialogContent style={{ width: '100%' }}>
               <RadioGroup row value={type} onChange={handleTypeChange}>
               <FormControlLabel value="headline" control={<Radio />} label="Headline" />
               <FormControlLabel value="content" control={<Radio />} label="Content" />
               <FormControlLabel value="calendar" control={<Radio />} label="Content Calendar" />
             </RadioGroup>
      
               
             <FormControl fullWidth margin="normal">
               <InputLabel id="role-label">Select Brand</InputLabel>
               <Select
                       labelId="role-label"
                       id="role"
                       value={newUser.brand}
                       onChange={(e) => setNewUser({ ...newUser, brand: e.target.value })}
                       label="Select Brand"
                     >
                      
                         {brand.length ===0 ? (
                              <MenuItem disabled>No option </MenuItem>
                         ):brand?.map((user) => (
                     <MenuItem key={user._id} value={user._id}>
                       {user.name}
                     </MenuItem>
                   ))}
                     </Select>
             </FormControl>
       
             <Box display="flex" gap={2} mt={2}>
             {/* Start Date */}
             <Box flex={1}>
               <InputLabel shrink>Start Date</InputLabel>
               <Datepicker
                 value={newUser.start_date}
                 onChange={(e) => setNewUser({ ...newUser, start_date: e.target.value })}
                 name="startDate"
               />
             </Box>
           
             {/* End Date */}
             <Box flex={1}>
               <InputLabel shrink>End Date</InputLabel>
               <Datepicker
                 value={newUser.end_date}
                 onChange={(e) => setNewUser({ ...newUser, end_date: e.target.value })}
                 name="endDate"
               />
             </Box>
           </Box>
       
   
       
       
   
       
       
            
               
               </DialogContent>
               <DialogActions sx={{ mb: 2, mr: 2 }}>
                 <Button onClick={() => {
                   setNewUser("")
                   setOpenCreateDialog(false)
                   }} sx={{ color: "#666464" }}>
                   Cancel
                 </Button>
                 <Button
                   onClick={handleCreateUserSubmit}
                   sx={{ backgroundColor: "#262323", color: "#ffffff" }}
                 >
                 {Create ? "loading...":"Download"}
                 </Button>
               </DialogActions>
             </Dialog>
        <DialogActions sx={{ mb: 2, mr: 2 }}>
          <Button onClick={() => {
            setNewUser("")
            setOpenCreateDialog(false)
            }} sx={{ color: "#666464" }}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateUserSubmit}
            sx={{ backgroundColor: "#262323", color: "#ffffff" }}
          >
          {Create ? "loading...":"Download"}
          </Button>
        </DialogActions>
      </Dialog>
   
     
    </div>
  );
};

export default Task;
