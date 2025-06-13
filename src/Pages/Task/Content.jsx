import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';  
import toast, { Toaster } from 'react-hot-toast';  // Import toast and Toaster
import dayjs from 'dayjs';

import { Box, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { SERVER_URL } from '../../api/url';
import userStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { CheckCircle } from '@mui/icons-material';
import { useState } from 'react';
import Datepicker from '../../components/DatePicker';
import Monthpicker from '../../components/Monthpicker';
import Tooltip from '@mui/material/Tooltip';


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



const Content= () => {


   const [searchBrand, setSearchBrand] = React.useState("");
   const [searchUser, setSearchUser] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
 const setUser = userStore((state) => state.setUser);
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [newUser, setNewUser] = React.useState({ name: '', email: '', role: '', password: '' });
  const [editUser,setEditUser]=React.useState([])
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [loading,setLoading]=React.useState(false)
  const [Create,setCreate]=React.useState(false)
    const navigate = useNavigate();
      const [category, setCategory] = useState([]);
  const isTabletOrSmaller = useMediaQuery('(max-width: 960px)');
  const [datacontent, setDataContent] = React.useState([]);
  const [dataHeadline, setDataHeadline] = React.useState([]);
  const [brand,setBrand]=React.useState([])
  const [userinfo,setUserinfo]=React.useState([])
  const [pager, setPager] = React.useState({ currentPage: 1, pageSize: 10});
  const [Content,setContent]=React.useState([])
  const [brandview,setBrandView]=React.useState("")
  const role = localStorage.getItem("userRole");
  const [type, setType] = React.useState("content");
  // const [month,setMonth]=useState("")
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);

  };


  const date = new Date(newUser?.month); // e.g., May 6, 2025

  const year = date.getFullYear();
  const month = date.getMonth(); // May = 4
  
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0); // last day of the month
  
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  
  // Remove the comma in the formatted date string
  const startDateFormatted = startDate.toLocaleString('en-US', options).replace(',', '');
  const endDateFormatted = endDate.toLocaleString('en-US', options).replace(',', '');
  

  
  // const fetchCategory = async () => {
  //   setLoading(true);
  //   const token = localStorage.getItem("token");

  //   try {
  //     const response = await axios.get(
  //       `${SERVER_URL}/category/view-category?page=1&limit=20`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: token,
  //         },
  //       }
  //     );
  //     setCategory(response.data.data?.currentDatas);
    
  //   } catch (err) {
  //     let errorMessage = "An error occurred. Please try again later.";

  //     if (err.response) {
  //       switch (err.response.status) {
  //         case 401:
  //         case 400:
  //           errorMessage =
  //             err.response.data?.message || "Your Token is blacklist.";
  //           localStorage.clear();
  //           setUser(null);
  //           navigate("/");
  //           break;
  //         case 500:
  //           errorMessage =
  //             err.response.data?.message || "Server error. Please try again.";
  //           break;
  //         case 503:
  //           errorMessage =
  //             "Service is temporarily unavailable. Please try again later.";
  //           break;
  //         case 502:
  //           errorMessage = "Bad Gateway: Server is down. Please try later.";
  //           break;
  //         default:
  //           errorMessage = err.response.data?.message || "An error occurred.";
  //       }
  //     } else if (err.request) {
  //       errorMessage = "Network error. Please check your internet connection.";
  //     } else {
  //       errorMessage = `Error: ${err.message}`;
  //     }

  //     toast.error(errorMessage, { position: "top-right", duration: 5000 });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   fetchCategory();
  // }, []);

  const [errorShown, setErrorShown] = React.useState(false);

  const [total,settotal]=useState([])
  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      // Fetch task data first based on pager.currentPage
      const taskResponse = await axios.get(`${SERVER_URL}/task/view-task?page=${pager.currentPage}&limit=${pager.pageSize}&brand=${searchBrand==="All" ? "":searchBrand}&category=${searchUser ==="All" ?"":searchUser}`, {
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
  const fetchUser = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
   

      const userResponse = await axios.get(`${SERVER_URL}/auth/view-users`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      setUserinfo(userResponse.data?.data?.currentDatas);

    } catch (err) {
      if (!errorShown) { // Show error only if it hasn't been shown yet
        handleError(err);
        setErrorShown(true); // Mark that the error has been shown
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchContent = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
  
      const taskResponse = await axios.get(`${SERVER_URL}/task/view-one-task?page=1&limit=150&brand=${newUser.brand}&category=false&search=${newUser.year}&startDate=${newUser.month}&social=${newUser.soical_media}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      const taskData = taskResponse.data?.data?.currentDatas[0];

      setContent(taskData?.headline);
     
     

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
  }, [pager.currentPage,searchUser,searchBrand]);
const filteredTasks = Content?.[0]?.tasks?.filter(
  (task) => task.year === newUser.year
);

const filteredPost = filteredTasks?.filter(
  (task) => task.month === newUser.month
);


const filtered = brand.filter(item => item.name === newUser.brand);

const filteredMonth = filtered?.[0]?.months.filter(item => item.year === newUser.year);

    React.useEffect(() => {
     if(newUser.brand && newUser.year && newUser.month ){
      fetchContent()
     }
  
  
 
  }, [newUser.brand,newUser.month,newUser.year,newUser?.soical_media]);

  
    React.useEffect(() => {
      const timeoutId = setTimeout(() => {
        fetchBrand();
      }, 1000); // Set the delay in milliseconds (e.g., 1000ms = 1 second)
    
      return () => clearTimeout(timeoutId); // Cleanup the timeout on unmount
    }, []); // Empty dependency array ensures it runs only once
    
    React.useEffect(() => {
      fetchUser();
    }, []); 

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


  const handleEdit = (user,typetask) => {
    setEditUser(user);
    setType("content")
    setOpenEditDialog(true);
  };


 

  const handleDelete = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };



  const confirmDelete =async () => {
 
    setCreate(true)
    const token = localStorage.getItem("token");


    try {
      const response = await axios.delete(
          `${SERVER_URL}/task/delete-task/${selectedUser}`, {
              headers: {
                "Authorization":token,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
             
          }
      );
  if(response){
   setCreate(false)
   toast.success('Successful Deleted!', {
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

  const handleCreateAccountClick = () => {
    setOpenCreateDialog(true);
    setNewUser("")
    setType("content")
  };

// const filteredBrand = Content.flatMap(item =>
//   item.tasks?.filter(task => {
//     const brandMatch = task.brand?._id === newUser.brand;

//     const taskDate = new Date(task.month);
//     const userMonth = new Date(newUser.month);

//     const sameMonth =
//       taskDate.getMonth() === userMonth.getMonth() &&
//       taskDate.getFullYear() === userMonth.getFullYear();

//     return brandMatch && sameMonth;
//   }) || []
// );

// console.log("brand",filteredBrand)
  const handleCreateUserSubmit = async () => {
    setCreate(true);
    const token = localStorage.getItem("token");
  
    try {
      // Check the type and send the respective request
      const response = await axios.post(
          `${SERVER_URL}/task/create-task`, // Replace with the correct URL for content
          {
           task:newUser.task,
           content_writer:newUser.user,
           note:newUser.note
          },
          {
            headers: {
              Authorization: token,
              Accept: 'application/json',
              'Content-Type': 'application/json',
                "type":"content"
            },
          }
        );
      setCreate(false);
  
      if (response?.data?.statusCode === 201) {
        fetchData();
        toast.success('Successfully Created!', {
          position: 'top-right',
          duration: 5000,
        });
        setNewUser({});
        setOpenCreateDialog(false);
   
      } else if (response?.data?.statusCode === 203) {
        toast.error(response.data?.message || 'Error occurred', {
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
  

  const foundUser =userinfo.find(user => user.name === editUser?.user?.name);
  const foundCategory =category.find(user => user.name === editUser?.category?.name);
  const foundbrand =brand.find(user => user.name === editUser?.brand?.name);
  const handleEditUserSubmit = async() => {
    setCreate(true)
     const token = localStorage.getItem("token");
   
     try {
      // Check the type and send the respective request
     
      const response = await axios.put(
          `${SERVER_URL}/task/update-task/${editUser._id}`, // Replace with the correct URL for content
          {
           content_writer:editUser?.content_writer,
          note:editUser.note
          },
          {
            headers: {
              Authorization: token,
              Accept: 'application/json',
              'Content-Type': 'application/json',
                "type":"content"
            },
          }
        );
  
      setCreate(false);
      fetchData();
      toast.success('Successfully Updated!', {
        position: 'top-right',
        duration: 5000,
      });
      setOpenEditDialog(false)
    
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
console.log(Content)
  //  const filtered = Content?.[0]?.tasks?.filter(item => item?.brand?.name === newUser.brand);

// const filteredMonth = filtered?.[0]?.months.filter(item => item.year === newUser.year);

// console.log("edit",editUser)
  //  const handleHeadline = (row,name) => {
  //   setRowType(name)
  //   setExpandedRow(expandedRow === `${row?._id?.brand}-${row?._id?.month}-${row?._id?.year}-${name}` ? null : `${row?._id?.brand}-${row?._id?.month}-${row?._id?.year}-${name}`);
  // };

// console.log(datacontent)
  return (
    <div className="mt-24 lg:mx-4 mx-2">
       <div className='hidden lg:block'>
         <div className='flex justify-between gap-3 items-center mb-5 mt-[100px]'>
     <h2 className="text-xl text-gray-700">Total Content: {loading ? "0":total?.total?.content       }</h2>
        {
          role !=="content-writer" && (
            <div className='flex gap-3 items-center'>
     <div className="relative flex gap-5">
          <FormControl sx={{ width: 200 }} margin="normal">
  <InputLabel id="role-label">Select Brand</InputLabel>
<Select
  id="role"
  value={searchBrand}
  onChange={(e) => setSearchBrand(e.target.value)}
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
  <Box display="flex" gap={2} >
      {/* Start Date */}
      <Box flex={1}>
       
      <FormControl fullWidth margin="normal" sx={{ width: '200px' }}>

    <InputLabel id="role-label">Select Content Writer</InputLabel>
<Select
  id="role"
  value={searchUser}
  onChange={(e) => setSearchUser(e.target.value)}
  label="Select Content Writer"
>
  <MenuItem value="All">All</MenuItem>
  {userinfo.length === 0 ? (
    <MenuItem disabled>No option</MenuItem>
  ) : (
    userinfo
    .filter(user => user.role !== "admin" && user.role !== "content-head").map(user => (
        <MenuItem key={user._id} value={user.name}>
          {user.name}
        </MenuItem>
      ))
  )}
</Select>


  </FormControl>
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
            onClick={handleCreateAccountClick} 
          >
            Create Task
          </Button>
        </div>
          )
        }
      </div>
     </div>
    {
      role==="admin" && (
         <div className='flex justify-between gap-3 items-center mb-5 mt-[100px] lg:hidden'>
     <h2 className="text-xl text-gray-700">Total Content: {loading ? "0":total?.total?.content }</h2>
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
           
            onClick={handleCreateAccountClick} 
          >
            Create
          </Button>
            )
          }
        </div>
      </div>
      )
    }



      <TableContainer component={Paper}>
      <Table sx={{ minWidth: role === "admin" ? 600 : 200 }} aria-label="customized table">
        <TableHead>
          <TableRow>
           
            <StyledTableCell align="left">Post No</StyledTableCell>
           <StyledTableCell align="left">Content Writer</StyledTableCell>
            <StyledTableCell align="left">Brand Name</StyledTableCell>
            <StyledTableCell align="left">Deadline</StyledTableCell>
            <StyledTableCell align="left">Month</StyledTableCell>
            <StyledTableCell align="left">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  {datacontent?.length === 0 || dataHeadline === undefined ? (
    <StyledTableRow>
      <StyledTableCell colSpan={6} align="center">
        There is no content task
      </StyledTableCell>
    </StyledTableRow>
  ) : (
    datacontent.map((row, index) =>
      row.tasks.map((item, subIndex) => (
        <TableRow key={`${index}-${subIndex}`}>
          <TableCell align="left"> {item?.task?.soical_media === "tiktok-trend"
    ? `tiktok-trend-${item?.task?.postNumber}`
    : item?.task?.soical_media === "tiktok-slide"
    ? `tiktok-slide-${item?.task?.postNumber}`
    : item?.task?.soical_media === "tiktok-script"
    ? `tiktok-script-${item?.task?.postNumber}`
    : `post-${item?.task?.postNumber}`}</TableCell>
          <TableCell align="left">{item?.content_writer}</TableCell>
          <TableCell align="left">{row?._id?.brand}</TableCell>
          <TableCell align="left">{formatDate(item?.task?.deadline)}</TableCell>
          
          <TableCell align="left">
          {item?.task?.year} - {["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"][item?.task?.month - 1]} Month 
         </TableCell>
          <TableCell align="left">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(item, "content");
              }}
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(item._id);
              }}
              sx={{ color: "red" }}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
            <Tooltip title={item?.task?.headline ? item?.task?.headline:"No headline" } >
           <IconButton
              onClick={(e) => {
                e.stopPropagation();
                navigate("/detail", { state: item });
              }}
              aria-label="detail"
            >
              <InfoIcon />
            </IconButton>
           </Tooltip>
          </TableCell>
        </TableRow>
      ))
    )
  )}
</TableBody>

      </Table>
    </TableContainer>



   <div className="flex gap-5 justify-end items-center mt-4">
       
        <p>Content Page {pager.currentPage} of {total?.totalPages?.content}</p>
        <div className="flex gap-2">
          <button disabled={pager.currentPage === 1} onClick={() => handlePageChange(-1)} className="p-2 bg-gray-200 rounded-l hover:bg-gray-300">
            <HiChevronLeft />
          </button>
          <button disabled={pager.currentPage ===  total?.totalPages?.content} onClick={() => handlePageChange(1)} className="p-2 bg-gray-200 rounded-r hover:bg-gray-300">
            <HiChevronRight />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this task?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} sx={{color:"#666464"}}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} sx={{ color: 'red' }}>
          {Create ? "loading...":"Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create User Form Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Create New Task</DialogTitle>
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

    <FormControl fullWidth margin="normal">
   <InputLabel id="year-label">Select Year</InputLabel>
   <Select
     labelId="year-label"
     id="year"
     value={newUser.year}
     label="Select Year"
     onChange={(e) => setNewUser({ ...newUser, year: e.target.value })}
   >
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

   <FormControl fullWidth margin="normal">
               <InputLabel id="role-label">Select Media</InputLabel>
               <Select
                 labelId="role-label"
                 id="role"
                 value={newUser.soical_media}
                 onChange={(e) => setNewUser({ ...newUser, soical_media: e.target.value })}
                 label="Select Media"
               >
                 <MenuItem value="facebook">Facebook</MenuItem>
                
                  <MenuItem value="tiktok-trend">Tiktok Trend</MenuItem>
                 <MenuItem value="tiktok-script">Tiktok Script</MenuItem>
                 <MenuItem value="instagram">Instagram</MenuItem>
               </Select>
             </FormControl>
 
    <FormControl fullWidth margin="normal">
   <InputLabel id="month-label">Select Month</InputLabel>
   <Select
     labelId="month-label"
     id="month"
     value={newUser.month}
     label="Select Month"
     onChange={(e) => setNewUser({ ...newUser, month: e.target.value })}
   >
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

{newUser.year && newUser.month && newUser?.soical_media && !loading && type === "content" && (
  <div className="my-5">
    {Content==undefined ||Content?.length === 0 ? (
      <div>There is no post</div>
    ) : (
      [...(Content?.[0]?.tasks || [])] // spread to avoid mutating original array
        .sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          if (dateA.getTime() === dateB.getTime()) {
            return a.postNumber- b.postNumber;
          }
          return dateA - dateB;
        })
        .map((post) => (
          <div key={post._id || ""}>
            <RadioGroup
              row
              value={newUser.task || ""}
              onChange={(e) =>
                setNewUser({ ...newUser, task: e.target.value })
              }
            >
              <FormControlLabel
                value={post._id}
                control={<Radio />}
                label= {post?.soical_media === "tiktok-trend"
    ? `tiktok-trend-${post?.postNumber}`
    : post?.soical_media === "tiktok-slide"
    ? `tiktok-slide-${post?.postNumber}`
    : post?.soical_media === "tiktok-script"
    ? `tiktok-script-${post?.postNumber}`
    : `post-${post?.postNumber}`}
              />
            </RadioGroup>
          </div>
        ))
    )}
  </div>
)}

 <FormControl fullWidth margin="normal">
    <InputLabel id="role-label">Select Content Writer</InputLabel>
    <Select
            labelId="role-label"
            id="role"
            value={newUser.user}
            onChange={(e) => setNewUser({ ...newUser, user: e.target.value })}
            label="Select Content Writer"
          >
           
              {userinfo.length ===0 ?(
                  <MenuItem disabled>No option </MenuItem>
              ): userinfo?.map((user) => (
         
          user?.role !=="admin" && user?.role !=="content-head" && (
            <MenuItem key={user._id} value={user.name}>
            {user.name}
          </MenuItem>
          )
         
        ))}
          </Select>
  </FormControl>
 <TextField
              label="Note"
              multiline
              rows={4} // Set the number of visible rows in the textarea
              value={newUser.note}
              onChange={(e) => setNewUser({ ...newUser, note: e.target.value })}
              fullWidth
              margin="normal"
            />


     
        
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
          {Create ? "loading...":"Create"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} fullWidth maxWidth="sm">
      <DialogTitle>Edit Task for post {editUser.post}</DialogTitle>

        <DialogContent style={{ width: '100%' }}>
       

 <FormControl fullWidth margin="normal">
      <InputLabel id="role-label">Select Content Writer</InputLabel>
      <Select
labelId="role-label"
id="role"
value={editUser?.content_writer || ''} // Set value dynamically from state
onChange={(e) => setEditUser({ ...editUser, content_writer: e.target.value})} // Update state on change
label="Select Content Writer"
>
{userinfo.length === 0 ? (
  <MenuItem disabled>No option</MenuItem>
) : (
  userinfo.map((user) =>
    user?.role !== 'admin' && user?.role !=="content-head" && (
      <MenuItem key={user._id} value={user.name}>
        {user.name}
      </MenuItem>
    )
  )
)}
</Select>

    </FormControl>

        <TextField
              label="Note"
              multiline
              rows={4} // Set the number of visible rows in the textarea
              value={editUser.note}
              onChange={(e) => setEditUser({ ...editUser, note: e.target.value })}
              fullWidth
              margin="normal"
            />

        
        </DialogContent>
        <DialogActions sx={{ mb: 2, mr: 2 }}>
          <Button onClick={() => {
            setEditUser("")
            setOpenEditDialog(false)
            }} sx={{ color: "#666464" }}>
            Cancel
          </Button>
          <Button
            onClick={handleEditUserSubmit}
            sx={{ backgroundColor: "#262323", color: "#ffffff" }}
          >
          {Create ? "loading...":"Edit"}
          </Button>
        </DialogActions>
      </Dialog>
     
    </div>
  );
};

export default Content;
