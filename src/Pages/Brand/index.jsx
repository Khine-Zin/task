import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import toast, { Toaster } from 'react-hot-toast';  // Import toast and Toaster
import AddIcon from '@mui/icons-material/Add';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { SERVER_URL } from '../../api/url';
import userStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { Storefront } from '@mui/icons-material';
import FileUpload from '../../components/FileUpload';
import Datepicker from '../../components/DatePicker';
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



const Brand = () => {


  const [searchQuery, setSearchQuery] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);
   const [openSeeDialog, setOpenSeeDialog] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
 const setUser = userStore((state) => state.setUser);
 const [see,setsee]=useState([])
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [newUser, setNewUser] = React.useState({ name: '', email: '', role: '', password: '' });
  const [editUser,setEditUser]=React.useState([])
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [openMonthDialog, setOpenMonthDialog] = React.useState(false);
      const [OpenMonthEditDialog, setOpenMonthEditDialog] = React.useState(false);
  const [loading,setLoading]=React.useState(false)
  const [Create,setCreate]=React.useState(false)
    const navigate = useNavigate();
  const isTabletOrSmaller = useMediaQuery('(max-width: 960px)');
  const [data, setData] = React.useState([]);
  const [pager, setPager] = React.useState({ currentPage: 1, pageSize: 9 });
  const debounceTimer = React.useRef(null);
  const [bannerImage, setBannerImage] = React.useState("");
  const [brand,setBrand]=useState("")
  const [month, setMonth]=useState("")
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };



  const fetchData= async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${SERVER_URL}/brand/view-brand?page=${pager.currentPage}&limit=${pager.pageSize}`, {
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

  const search = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
  
    try {
      const response = await axios.get(`${SERVER_URL}/brand/search-brand?page=${pager.currentPage}&limit=${pager.pageSize}&search=${searchQuery}`, {
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
    if(searchQuery.length >0){
      debounceTimer.current = setTimeout(() => {
        search();
      }, 500);
    }else{
      fetchData();
    }
  }, [pager.currentPage,searchQuery]);

  const handlePageChange = (direction) => {
    setPager(prev => {
      const newPage = prev.currentPage + direction;
      return {
        ...prev,
        currentPage: newPage,
      };
    });
  };

  const handleEdit = (user) => {
    console.log(user)
    setEditUser(user);
    setOpenEditDialog(true);
    setBannerImage(user.logo)
    
  };

const handleMonth=(id)=>{
  setOpenMonthDialog(true)
   
  setBrand(id)
}

const handleEditMonth=(user,id)=>{
  setOpenMonthEditDialog(true)
   setEditUser({
    ...editUser,
    startMonthDate: user.startDate,
    endMonthDate:user.endDate,
  });

  setMonth(user._id)
  setBrand(id)
}

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  console.log(newUser.startDate)

  const handleDelete = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const confirmDelete =async () => {
 
    setCreate(true)
    const token = localStorage.getItem("token");


    try {
      const response = await axios.delete(
          `${SERVER_URL}/brand/delete-brand/${selectedUser._id}`, {
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
    setOpenSeeDialog(false)
  };
    const handleMonthSee = (row) => {
    setOpenSeeDialog(true);
    setsee(row)
  };

  const handleCreateAccountClick = () => {
    setOpenCreateDialog(true);
  };

  const handleCreateUserSubmit = async() => {
   setCreate(true)
    const token = localStorage.getItem("token");

if(newUser?.color?.length !==7){
  toast.error("Invalid color code", {
    position: 'top-right',
    duration: 5000,
    
});

setCreate(false)
return false
}
if(newUser.startDate >= newUser.endDate){
    toast.error("Start Date must be less than End Date", {
          position: 'top-right',
          duration: 5000,
      });
      setCreate(false)
return false
}
    try {
      const response = await axios.post(
          `${SERVER_URL}/brand/create-brand`, 
          {
            "name":newUser.name, 
            "business_name":newUser.bussinessName,
            "color":newUser.color,
             "text_color":newUser.text_color,
             "months":[
              {
                month:1,
                startDate:newUser.startDate,
                 endDate:newUser.endDate,
                 "year":`${new Date(newUser.startDate).getFullYear()}`
              }
             ],
            //  "start_date":newUser.startDate,
            //  "end_date":newUser.endDate,
             "image":bannerImage,
            
            }, 
          {
              headers: {
                "Authorization":token,
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

  

   const handleCreateMonthSubmit = async() => {
   setCreate(true)
    const token = localStorage.getItem("token");
    if(newUser.startMonthDate >= newUser.endMonthDate){
    toast.error("Start Date must be less than End Date", {
          position: 'top-right',
          duration: 5000,
      });
      setCreate(false)
return false
}


    try {
      const response = await axios.post(
          `${SERVER_URL}/brand/create-month-brand/${brand}`, 
          {
              "startDate":newUser.startMonthDate,
                 "endDate":newUser.endMonthDate,
                  "year":`${new Date(newUser.startMonthDate).getFullYear()}`
            }, 
          {
              headers: {
                "Authorization":token,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
             
          }
      );

        toast.success('Successful Created!', {
        position: 'top-right',
        duration: 5000,
    });
    setCreate(false)
    fetchData()
        setOpenMonthDialog(false);
    setNewUser("");
 
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
    const handleEditMonthSubmit = async() => {
   setCreate(true)
    const token = localStorage.getItem("token");
if(editUser.startMonthDate >= editUser.endMonthDate){
    toast.error("Start Date must be less than End Date", {
          position: 'top-right',
          duration: 5000,
      });
      setCreate(false)
return false
}

    try {
      const response = await axios.put(
          `${SERVER_URL}/brand/update-month-brand/${brand}/${month}`, 
          {
              "startDate":editUser.startMonthDate,
                 "endDate":editUser.endMonthDate,
                   "year":`${new Date(editUser.startMonthDate).getFullYear()}`
            }, 
          {
              headers: {
                "Authorization":token,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
             
          }
      );

        toast.success('Successful Updated!', {
        position: 'top-right',
        duration: 5000,
    });
    setCreate(false)
    fetchData()
        setOpenMonthEditDialog(false);
    setEditUser("");
 
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
console.log(see)
  const handleEditUserSubmit = async () => {
    setCreate(true);
    const token = localStorage.getItem("token");
  
    const formData = new FormData();
    formData.append("name", editUser.name);
    formData.append("business_name", editUser.business_name);
    formData.append("color", editUser.color);
     formData.append("text_color", editUser.text_color);
    // formData.append("start_date", editUser.start_date);
    // formData.append("end_date", editUser.end_date);
   if(bannerImage){
    formData.append("image", bannerImage);
   }
  
    if(formData?.color?.length >7){
      toast.error("Invalid color code", {
        position: 'top-right',
        duration: 5000,
    });
    setCreate(false)
    return false
    }
 
    try {
      const response = await axios.put(`${SERVER_URL}/brand/update-brand/${editUser._id}`, formData, {
        headers: {
          Authorization: token,
          Accept: "multipart/form-data",
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response) {
        setCreate(false);
        toast.success("Successfully Updated!", {
          position: "top-right",
          duration: 5000,
        });
        fetchData();
        setEditUser("")
        setBannerImage("")
        setOpenEditDialog(false);
      }
    } catch (err) {
      let errorMessage = "An error occurred. Please try again later.";
      setCreate(false);
  
      if (err.response) {
        switch (err.response.status) {
          case 401:
          case 400:
            errorMessage = err.response.data?.message || "Unauthorized";
            localStorage.clear();
            setUser(null);
            navigate("/"); // Redirect to login
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
    }
  };
  

  return (
    <div className="mt-24 lg:mx-4 mx-2">
      <div className='hidden lg:block'>
      <div className='flex justify-between gap-3 items-center mb-5 mt-[100px]'>
      <h2 className="text-xl text-gray-700">Total: {loading ? "0":data.total        }</h2>
        <div className='flex gap-3 items-center'>
          <div className="relative">
            <form className="flex items-center max-w-sm">
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
            </form>
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
            startIcon={<Storefront />}
            onClick={handleCreateAccountClick} 
          >
            Create Brand
          </Button>
        </div>
      </div>
      </div>
      <div className='flex justify-between gap-3 items-center mb-5 mt-[100px] lg:hidden'>
      <h2 className="text-xl text-gray-700">Brand</h2>
        <div className='flex gap-3 items-center'>
         
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
        </div>
      </div>
<TableContainer component={Paper}>
  <Table sx={{ minWidth: 500 }} aria-label="customized table">
    <TableHead>
      <TableRow>
        <StyledTableCell align="left">Brand Name</StyledTableCell>
        <StyledTableCell align="left">Business Name</StyledTableCell>
        <StyledTableCell align="center">Number of Month</StyledTableCell>
        <StyledTableCell align="center">Start Date</StyledTableCell>
        <StyledTableCell align="center">End Date</StyledTableCell>
        <StyledTableCell align="center">Action</StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data?.currentDatas?.length === 0 ? (
        <StyledTableRow>
          <StyledTableCell colSpan={6} align="center">
            There is no Brand found
          </StyledTableCell>
        </StyledTableRow>
      ) : (
        data?.currentDatas?.map((row) => {
          // Find the last month (assuming months are sorted in ascending order)
          const lastMonth = row.months[row.months?.length - 1];

          return (
            <StyledTableRow key={row._id}>
              <StyledTableCell align="left">{row.name}</StyledTableCell>
              <StyledTableCell align="left">{row.business_name}</StyledTableCell>
              <StyledTableCell align="center"> <Button
                  onClick={() => handleMonthSee(row)} // This is for adding a new month
                  variant="outlined"
                  sx={{
                    textTransform: 'none',
                    backgroundColor: 'green',
                    color: 'white',
                    padding: '2px 4px',
                    fontSize: '0.75rem',
                  }}
                >
                  {row.months?.length} Month
                </Button></StyledTableCell>

              {/* Start Date and End Date for the last month */}
              <StyledTableCell align="center">
                {lastMonth ? new Date(lastMonth.startDate).toLocaleDateString() : '-'}
              </StyledTableCell>
              <StyledTableCell align="center">
                {lastMonth ? new Date(lastMonth.endDate).toLocaleDateString() : '-'}
              </StyledTableCell>

              {/* Action Buttons */}
              <StyledTableCell align="center" sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                <Button
                  onClick={() => handleMonth(row._id)} // This is for adding a new month
                  variant="outlined"
                  sx={{
                    textTransform: 'none',
                    backgroundColor: 'green',
                    color: 'white',
                    padding: '2px 4px',
                    fontSize: '0.75rem',
                  }}
                >
                  Add Month
                </Button>
                
                {/* Edit Button for the last month */}
                <Button
                 onClick={() => handleEdit(row)}
                  sx={{
                    textTransform: 'none',
                    backgroundColor: 'orange',
                    color: 'white',
                    padding: '2px 4px',
                    fontSize: '0.75rem',
                  }}
                >
                  Edit 
                </Button>
        <Button
                  onClick={() => handleEditMonth(lastMonth,row._id)} // Pass last month's ID
                  sx={{
                    textTransform: 'none',
                    backgroundColor: 'gray',
                    color: 'white',
                    padding: '2px 4px',
                    fontSize: '0.75rem',
                  }}
                >
                  Edit Month
                </Button>
                {/* Other action buttons */}
                <Button
                  onClick={() => handleDelete(row)}
                  variant="outlined"
                  sx={{
                    textTransform: 'none',
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '2px 4px',
                    fontSize: '0.75rem',
                  }}
                >
                  Delete
                </Button>
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
      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the {selectedUser?.business_name }?
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
          <Dialog open={openSeeDialog} onClose={cancelDelete}>
        <DialogTitle>{`${see?.name} (${see?.business_name})`}</DialogTitle>
          <DialogContent>
  

    {/* Render months list */}
    {see?.months?.length > 0 && (
      <Box mt={2}>
        {see?.months?.map((item, index) => (
          <Box key={item._id} mb={1}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              ({item.year})
            </Typography>
            <Typography variant="body2">
             {["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"][item?.month - 1]} Month     {`(${new Date(item.startDate).toLocaleDateString()} - ${new Date(item.endDate).toLocaleDateString()})`}
            </Typography>
           
          </Box>
        ))}
      </Box>
    )}
  </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} sx={{color:"#666464"}}>
           Close
          </Button>
        
        </DialogActions>
      </Dialog>

      {/* Create User Form Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} fullWidth maxWidth="sm">
  <DialogTitle>Create New Brand</DialogTitle>
  <DialogContent>
    <TextField
      label="Name"
      value={newUser.name}
      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Business Name"
      value={newUser.bussinessName}
      onChange={(e) => setNewUser({ ...newUser, bussinessName: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Brand Color Code"
      value={newUser.color}
      onChange={(e) => setNewUser({ ...newUser, color: e.target.value })}
      fullWidth
      margin="normal"
    />
       <TextField
      label="Text Color Code"
      value={newUser.text_color}
      onChange={(e) => setNewUser({ ...newUser, text_color: e.target.value })}
      fullWidth
      margin="normal"
    />
<Box display="flex" gap={2} mt={2}>
  {/* Start Date */}
  <Box flex={1}>
    <InputLabel shrink>Start Date</InputLabel>
    <Datepicker
      value={newUser.startDate}
      onChange={(e) => setNewUser({ ...newUser, startDate: e.target.value })}
      name="startDate"
    />
  </Box>

  {/* End Date */}
  <Box flex={1}>
    <InputLabel shrink>End Date</InputLabel>
    <Datepicker
      value={newUser.endDate}
      onChange={(e) => setNewUser({ ...newUser, endDate: e.target.value })}
      name="endDate"
    />
  </Box>
</Box>

    <Box mt={2}>
      <FileUpload setBannerImage={setBannerImage} image={bannerImage} />
    </Box>
  </DialogContent>

  <DialogActions sx={{ mb: 2, mr: 2 }}>
    <Button
      onClick={() => {
        setBannerImage("");
        setNewUser("");
        setOpenCreateDialog(false);
      }}
      sx={{ color: "#666464" }}
    >
      Cancel
    </Button>
    <Button onClick={handleCreateUserSubmit} sx={{ backgroundColor: "#262323", color: "#ffffff" }}>
      {Create ? "loading..." : "Create"}
    </Button>
  </DialogActions>
</Dialog>

     <Dialog open={openMonthDialog} onClose={() => setOpenMonthDialog(false)} fullWidth maxWidth="sm">
  <DialogTitle>Add Month</DialogTitle>
  <DialogContent>
 
<Box display="flex" gap={2} mt={2}>
  {/* Start Date */}
  <Box flex={1}>
    <InputLabel shrink>Start Date</InputLabel>
    <Datepicker
      value={newUser.startMonthDate}
      onChange={(e) => setNewUser({ ...newUser, startMonthDate: e.target.value })}
      name="startDate"
    />
  </Box>

  {/* End Date */}
  <Box flex={1}>
    <InputLabel shrink>End Date</InputLabel>
    <Datepicker
      value={newUser.endMonthDate}
      onChange={(e) => setNewUser({ ...newUser, endMonthDate: e.target.value })}
      name="endDate"
    />
  </Box>
</Box>

    
  </DialogContent>

  <DialogActions sx={{ mb: 2, mr: 2 }}>
    <Button
      onClick={() => {
       
        setNewUser("");
        setOpenMonthDialog(false);
      }}
      sx={{ color: "#666464" }}
    >
      Cancel
    </Button>
    <Button onClick={handleCreateMonthSubmit} sx={{ backgroundColor: "#262323", color: "#ffffff" }}>
      {Create ? "loading..." : "Add"}
    </Button>
  </DialogActions>
</Dialog>
   <Dialog open={OpenMonthEditDialog} onClose={() => setOpenMonthEditDialog(false)} fullWidth maxWidth="sm">
  <DialogTitle>Edit Month</DialogTitle>
  <DialogContent>
 
<Box display="flex" gap={2} mt={2}>
  {/* Start Date */}
  <Box flex={1}>
    <InputLabel shrink>Start Date</InputLabel>
    <Datepicker
      value={editUser.startMonthDate}
      onChange={(e) => setEditUser({ ...editUser, startMonthDate: e.target.value })}
      name="startDate"
    />
  </Box>

  {/* End Date */}
  <Box flex={1}>
    <InputLabel shrink>End Date</InputLabel>
    <Datepicker
      value={editUser.endMonthDate}
      onChange={(e) => setEditUser({ ...editUser, endMonthDate: e.target.value })}
      name="endDate"
    />
  </Box>
</Box>

    
  </DialogContent>

  <DialogActions sx={{ mb: 2, mr: 2 }}>
    <Button
      onClick={() => {
       
        setEditUser("");
        setOpenMonthEditDialog(false);
      }}
      sx={{ color: "#666464" }}
    >
      Cancel
    </Button>
    <Button onClick={handleEditMonthSubmit} sx={{ backgroundColor: "#262323", color: "#ffffff" }}>
      {Create ? "loading..." : "Edit"}
    </Button>
  </DialogActions>
</Dialog>


      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Brand</DialogTitle>
        <DialogContent style={{ width: "100%" }}>
    <TextField
      label="Name"
      value={editUser.name}
      onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Business Name"
      value={editUser.business_name}
      onChange={(e) => setEditUser({ ...editUser, business_name: e.target.value })}
      fullWidth
      margin="normal"
    />
      <TextField
      label="Brand Color Code"
      value={editUser.color}
      onChange={(e) => setEditUser({ ...editUser, color: e.target.value })}
      fullWidth
      margin="normal"
    />
      <TextField
      label="Text Color Code"
      value={editUser.text_color}
      onChange={(e) => setEditUser({ ...editUser, text_color: e.target.value })}
      fullWidth
      margin="normal"
    />

    <FileUpload setBannerImage={setBannerImage} image={bannerImage} />
  </DialogContent>
        <DialogActions sx={{ mb: 2, mr: 2 }}>
          <Button onClick={() => {
            setBannerImage("")
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

export default Brand;
