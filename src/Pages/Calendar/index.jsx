import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import toast, { Toaster } from 'react-hot-toast';  // Import toast and Toaster

import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Radio, RadioGroup, Select, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { SERVER_URL } from '../../api/url';
import userStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { CheckCircle, Download } from '@mui/icons-material';
import { useState } from 'react';
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



const Task= () => {


 
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
 const setUser = userStore((state) => state.setUser);
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [newUser, setNewUser] = React.useState({ name: '', email: '', role: '', password: '' });
  const [searchQuery, setSearchQuery] = React.useState("");
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
  const [monthsearch,setMonthSearch]=React.useState("")
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);

  };

  const date = new Date(monthsearch); // e.g., May 6, 2025

  const year = date.getFullYear();
  const month = date.getMonth(); // May = 4
  
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0); // last day of the month
  
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  
  // Remove the comma in the formatted date string
  const startDateFormatted = startDate.toLocaleString('en-US', options).replace(',', '');
  const endDateFormatted = endDate.toLocaleString('en-US', options).replace(',', '')

  const DownloadDate = new Date(newUser?.start_date);
  const year1 = DownloadDate.getFullYear();
  const month1 = DownloadDate.getMonth(); // May = 4
  
  const startDate1 = new Date(year1, month1, 1);
  const endDate1 = new Date(year1, month1 + 1, 0); // last day of the month
  
  const options1 = { month: 'long', day: 'numeric', year: 'numeric' };
  
  // Remove the comma in the formatted date string
  const startDateFormatted1 = startDate1.toLocaleString('en-US', options1).replace(',', '');
  const endDateFormatted1 = endDate1.toLocaleString('en-US', options1).replace(',', '')

const [download,setDownload]=useState([])
  const [item,setItem]=useState("")
    
  const [errorShown, setErrorShown] = React.useState(false);

  const [total,settotal]=useState([])
  const [selectedPosts, setSelectedPosts] = useState([]);

  const handleChange = (postId) => {
    setSelectedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };
  

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      // Fetch task data first based on pager.currentPage
      const taskResponse = await axios.get(`${SERVER_URL}/content-calendar/view-content-calendar?page=${pager.currentPage}&limit=${pager.pageSize}&brand=${searchQuery}&startDate=${startDateFormatted ==="Invalid Date" ? "" :startDateFormatted}&endDate=${endDateFormatted==="Invalid Date"? "":endDateFormatted}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      const taskData = taskResponse.data?.data.currentDatas[0];

      setDataContent(taskData?.content);
      setDataHeadline(taskData?.headline);
      settotal(taskResponse.data?.data)
     

    } catch (err) {
      if (!errorShown) { // Show error only if it hasn't been shown yet
        handleError(err);
        setErrorShown(true); // Mark that the error has been shown
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchDownload = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      // Fetch task data first based on pager.currentPage
      const taskResponse = await axios.get(`${SERVER_URL}/content-calendar/view-one-content-calendar?page=${pager.currentPage}&limit=${pager.pageSize}&brand=${newUser.brand}&startDate=${startDateFormatted1 ==="Invalid Date" ? "" :startDateFormatted1}&endDate=${endDateFormatted1==="Invalid Date"? "":endDateFormatted1}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      const taskData = taskResponse.data?.data.currentDatas[0];

   
      setDownload(taskData?.headline);
   
     

    } catch (err) {
      if (!errorShown) { // Show error only if it hasn't been shown yet
        handleError(err);
        setErrorShown(true); // Mark that the error has been shown
      }
    } finally {
      setLoading(false);
    }
  };

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
console.log(download)
  React.useEffect(() => {
  
  
    fetchData();
  }, [pager.currentPage,monthsearch,searchQuery]); // Dependency on pager.currentPage

  React.useEffect(() => {
  
   if(newUser.brand && newUser.start_date){
    fetchDownload()
   }
    
  }, [newUser.brand,newUser.start_date]);
  
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


console.log(searchQuery)
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

const handleCreateUserSubmit = async () => {
  setCreate(true);
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `${SERVER_URL}/content-calendar/download-headline-content-calendar`, 
      {
        postIds: selectedPosts
      },
      {
        headers: {
          Authorization: token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        responseType: 'blob' // Ensures we get a binary response (PDF)
      }
    );

  //  console.log(response.data)
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    // Create a download link and trigger the download
    const a = document.createElement('a');
    a.href = url;
       const startDate = new Date(Number(newUser.start_date));
const monthName = startDate.toLocaleString('en-US', { month: 'long' }); // "May"
a.download = `${newUser.brand}-${monthName}-headline.pdf`;

    document.body.appendChild(a);
    a.click();
    a.remove();

    // Revoke the URL to free up memory
    window.URL.revokeObjectURL(url);
setDownload([])
    setSelectedPosts([]); // Clear selected posts
    setCreate(false); // Set loading state back to false

    toast.success('Successfully Downloaded!', {
      position: 'top-right',
      duration: 5000,
    });

    setOpenCreateDialog(false);
    setNewUser(""); // Clear any new user form state if applicable

  } catch (err) {
    setCreate(false); // Set loading state back to false

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
     <h2 className="text-xl text-gray-700">Total: {loading ? "0":total?.total?.headline}</h2>
     {
          role ==="admin" && (
            <div className='flex gap-3 items-center'>
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
  <Box display="flex" gap={2} mt={2}>
      {/* Start Date */}
      <Box flex={1}>
       
        <Monthpicker
          value={monthsearch}
          onChange={(e) => setMonthSearch(e.target.value)}
          name="month"
        />
      </Box>
    
    
    </Box>
        
          </div>


          <Button
            variant="contained"
            sx={{
              height: '55px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: "#000000",
              textTransform: 'none',
              marginTop:1
            }}
            startIcon={<CheckCircle />}
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
     <h2 className="text-xl text-gray-700">Total: {loading ? "0":total?.total?.headline}</h2>
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
        <StyledTableCell align="left">Month</StyledTableCell>
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
            <StyledTableCell align="left">post - {item?.postNumber}</StyledTableCell>
          <StyledTableCell align="left">{item?.brand?.name}</StyledTableCell>
          <StyledTableCell align="left">
  {item?.month ? new Date(item?.month).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  }) : ''}
</StyledTableCell>
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

         <Tooltip title={item?.headline ? item?.headline:"No headline" } >
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
         </Tooltip>
          </StyledTableCell>
        </StyledTableRow>
      ))
    )
  )}
</TableBody>

  </Table>
</TableContainer>





   <div className="flex gap-5 justify-end items-center mt-4">
        <p>Headline Page {pager.currentPage} of {total?.totalPages?.headline}</p>
      
        <div className="flex gap-2">
          <button disabled={pager.currentPage === 1} onClick={() => handlePageChange(-1)} className="p-2 bg-gray-200 rounded-l hover:bg-gray-300">
            <HiChevronLeft />
          </button>
          <button disabled={pager.currentPage === total?.totalPages?.headline } onClick={() => handlePageChange(1)} className="p-2 bg-gray-200 rounded-r hover:bg-gray-300">
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
      <Dialog open={openCreateDialog} onClose={() =>{
         setOpenCreateDialog(false)
         setSelectedPosts([])
      }} fullWidth maxWidth="sm">
        {/* <DialogTitle>Download</DialogTitle> */}
        <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} fullWidth maxWidth="sm">
               <DialogTitle>Download Pdf</DialogTitle>
               <DialogContent style={{ width: '100%' }}>
           
      
               
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
                     <MenuItem key={user._id} value={user.name}>
                       {user.name}
                     </MenuItem>
                   ))}
                     </Select>
             </FormControl>
       
             <Box display="flex" gap={2} mt={2}>
             {/* Start Date */}
             <Box flex={1}>
               <InputLabel shrink>Month</InputLabel>
               <Monthpicker
                 value={newUser.start_date}
                 onChange={(e) => setNewUser({ ...newUser, start_date: e.target.value })}
                 name="startDate"
               />
             </Box>
         
           </Box>
       
 {newUser.start_date && (
  <div className="my-5">
    {download?.[0]?.tasks?.filter((post) => post.headline)?.length === 0 ? (
      <div>There is no post</div>
    ) : download.length===0 ?(
        <div>There is no post</div>
    ):(
      download?.[0]?.tasks
        ?.filter((post) => post.headline)
        ?.sort((a, b) => a.postNumber - b.postNumber)
        ?.map((post) => (
          <div key={post._id || ""}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedPosts.includes(post._id)}
                    onChange={() => handleChange(post._id)}
                  />
                }
                label={`Post: ${post.postNumber}`}
              />
            </FormGroup>
          </div>
        ))
    )}
  </div>
)}

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
