import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import toast, { Toaster } from 'react-hot-toast';  // Import toast and Toaster

import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { SERVER_URL } from '../../api/url';
import userStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { Info, Storefront, UploadFile } from '@mui/icons-material';
import FileUpload from '../../components/FileUpload';
import Datepicker from '../../components/DatePicker';
import Monthpicker from '../../components/Monthpicker';
import { useState } from 'react';


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



const Complete= () => {


  const [searchQuery, setSearchQuery] = React.useState("");
 const [item,setItem]=React.useState("")
 const setUser = userStore((state) => state.setUser);

const [yearsearch,setYearSearch]=React.useState("")
const [post,setPost]=React.useState("")
  const [loading,setLoading]=React.useState(false)
  const [Create,setCreate]=React.useState(false)
    const navigate = useNavigate();
const [monthsearch,setMonthSearch]=React.useState("")
  const [data, setData] = React.useState([]);
  const [postData,setPostData]=React.useState([])
  const [pager, setPager] = React.useState({ currentPage: 1, pageSize: 9 });
 const [openDialog,setOpenDialog]=React.useState(false)
    const [brand,setBrand]=React.useState([])

  const [updatePost,setUpdatePost]=React.useState([])
  const [social,setSocial]=useState("")
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);

  };
   const filtered = brand.filter(item => item.name === searchQuery);

const filteredMonth = filtered?.[0]?.months.filter(item => item.year === yearsearch);
 const [checked, setChecked] = useState("false");



  const fetchData= async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${SERVER_URL}/complete/view-complete?page=${pager.currentPage}&limit=${pager.pageSize}&brand=${searchQuery==="All" ? "" :searchQuery}&search=${yearsearch==="All"? "":yearsearch}&category=${monthsearch ==="All" ? "":monthsearch}&status=${checked}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      setData(response.data.data);
    if(searchQuery){
       const contentGroups = response?.data?.data?.currentDatas?.[0]?.content || [];
const allTasks = contentGroups.flatMap(group => group.tasks);
setPostData(allTasks)
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
   fetchBrand()
    }, []); 

 const handleChange = (row) => {
  setOpenDialog(true);
 
  setItem(row);
 };



  React.useEffect(() => {
 fetchData()
  }, [pager.currentPage,searchQuery,monthsearch,yearsearch,checked]);

  const handlePageChange = (direction) => {
    setPager(prev => {
      const newPage = prev.currentPage + direction;
      return {
        ...prev,
        currentPage: newPage,
      };
    });
  };

 const confirm =async () => {
 
    setCreate(true)
    const token = localStorage.getItem("token");
// if(selectedUser==="confirm"){
// console.log(item)
// return false
// }

    try {
      const response = await axios.put(
          `${SERVER_URL}/complete/update-complete/${item._id}`,{
            "action":item.isComplete==="false" ? "true":"false",
            
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

const filteredTasks = data?.currentDatas?.flatMap((dataItem) =>
  dataItem?.content?.flatMap((row) =>
    row?.tasks?.filter((taskItem) =>
      post ? taskItem?.task?.postNumber === Number(post) : true
    ) || []
  )
) || [];

  const handleStatusToggle = () => {
    setChecked(prev => prev === "true" ? "false" : "true");
  };

  return (
    <div className="mt-24 lg:mx-4 mx-2">
      <div className='hidden lg:block'>
      <div className='flex justify-between gap-3 items-center mb-5 mt-[100px]'>
     <div className='flex'>
       <h2 className="text-xl text-gray-700">Total: {loading ? "0":data.total        }</h2>
       <div className="flex items-center ml-4 mt-2">
            <input
              type="checkbox"
              checked={checked === "true"}
              onChange={handleStatusToggle}
              className="mr-2"
            />
            <label className="text-gray-700 text-sm">Confirm</label>
          </div>
     </div>
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

  <Box display="flex" gap={2} >
   
    
   
     <Box flex={1}>
  <FormControl sx={{ width: 200 }} margin="normal">
    <InputLabel id="post-label">Select Post</InputLabel>
    <Select
      labelId="post-label"
      id="post"
      value={post}
      onChange={(e) => setPost(e.target.value)}
      label="Select Post"
    >
      {postData.length === 0 ? (
        <MenuItem disabled>No option</MenuItem>
      ) : (
      postData.map((task) => {
  const postNumber = task?.task?.postNumber;
  if (postNumber == null) return null; // Skip items without postNumber
  return (
    <MenuItem key={task._id} value={postNumber}>
      {`Post ${postNumber}`}
    </MenuItem>
  );
})

      )}
    </Select>
  </FormControl>
</Box>

    </Box>
            {/* <form className="flex items-center max-w-sm">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                required
              />
            </form> */}
          </div>
      </div>
      </div>
      <div className='flex justify-between gap-3 items-center mb-5 mt-[100px] lg:hidden'>
      <h2 className="text-xl text-gray-700">Complete</h2>
       
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
            <StyledTableCell align="left">Post</StyledTableCell>
            <StyledTableCell align="left">Brand Name</StyledTableCell>
            <StyledTableCell align="left">Month</StyledTableCell>
            <StyledTableCell align="left">Post Deadline</StyledTableCell>
             
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
         
{filteredTasks.length === 0 ? (
  <StyledTableRow>
    <StyledTableCell colSpan={5} align="center">
      There is no data found
    </StyledTableCell>
  </StyledTableRow>
) : (
  [...filteredTasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((taskItem) => {
      const task = taskItem.task;
      return (
        <StyledTableRow key={taskItem._id}>
          <StyledTableCell align="left">{task?.social_media === "tiktok-trend"
    ? `tiktok-trend-${task?.postNumber}`
    : task?.social_media === "tiktok-slide"
    ? `tiktok-slide-${task?.postNumber}`
    : task?.social_media === "tiktok-script"
    ? `tiktok-script-${task?.postNumber}`
     : task?.social_media === "free"
    ? `free post-${task?.postNumber}`
    : `post-${task?.postNumber}`}</StyledTableCell>
          <StyledTableCell align="left">{task?.brand?.name}</StyledTableCell>
          
         <TableCell align="left">
                             {task?.year} - {["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"][task?.month - 1]} Month 
                            </TableCell>
                            <StyledTableCell align="left">{formatDate(taskItem?.design_date)}</StyledTableCell>
          <StyledTableCell  align="center"
            sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Button
                          onClick={() => handleChange(task)}
                          sx={{
                            textTransform: 'none',
                            backgroundColor:task?.isComplete==="true" ?'green' :"gray",
                            color: 'white',
                            padding: '2px 4px',
                            fontSize: '0.75rem',
                          }}
                        >
                         {
                          task?.isComplete ==="true" ? "Complete" :"Pending"
                         }
                        </Button>
              <Tooltip title={task?.headline ? task?.headline:"No headline" } >
                     <Button
                          onClick={() => navigate("/complete/detail", { state: taskItem })}
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
      );
    })
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
  
  <Dialog open={openDialog} onClose={() => { setOpenDialog(false)}
    } >
                 <DialogTitle>Confirm</DialogTitle>
                 <DialogContent style={{ width: '100%' }}>
              Are you sure you want to complete this task?
                 </DialogContent>
                
                  <DialogActions>
                    <Button onClick={()=>setOpenDialog(false)} sx={{ color: "#666464" }}>
                      Cancel
                    </Button>
                    <Button onClick={()=>confirm()} sx={{ color: 'red' }}>
                      {Create ? "loading..." :"Complete"}
                    </Button>
                  </DialogActions>
               </Dialog>

     
    </div>
  );
};

export default Complete;
