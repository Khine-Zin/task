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

import toast, { Toaster } from 'react-hot-toast';  // Import toast and Toaster

import { FormControl, InputLabel, MenuItem, Select, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { SERVER_URL } from '../../api/url';
import userStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { FolderOutlined } from '@mui/icons-material';

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



const Category = () => {


  const [searchQuery, setSearchQuery] = React.useState("");
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
  const isTabletOrSmaller = useMediaQuery('(max-width: 960px)');
  const [data, setData] = React.useState([]);
  const [pager, setPager] = React.useState({ currentPage: 1, pageSize: 9 });
  const debounceTimer = React.useRef(null);

  const fetchData= async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${SERVER_URL}/category/view-category?page=${pager.currentPage}&limit=${pager.pageSize}`, {
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

//   const search = async () => {
//     setLoading(true);
//     const token = localStorage.getItem("token");
  
//     try {
//       const response = await axios.get(`${SERVER_URL}/auth/search-users?page=${pager.currentPage}&limit=${pager.pageSize}&search=${searchQuery}`, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: token,
//         },
//       });
  

//     } catch (err) {
//       console.log(err)
//       let errorMessage = 'An error occurred. Please try again later.';
// if(err.reponse){
//   setData(err.reponse?.data?.data)
// }else{
//   toast.error(errorMessage, {
//     position: 'top-right',
//     duration: 5000,
// });
// }
     
//     } finally {
//       setLoading(false);
//     }
//   };
  
  
  

  React.useEffect(() => {
    fetchData();
  }, [pager.currentPage]);

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
    setEditUser(user);
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
          `${SERVER_URL}/category/delete-category/${selectedUser._id}`, {
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
  };

  const handleCreateUserSubmit = async() => {
   setCreate(true)
    const token = localStorage.getItem("token");


    try {
      const response = await axios.post(
          `${SERVER_URL}/category/create-category`, 
          {
            "name":newUser.name, 
           
            }, 
          {
              headers: {
                "Authorization":token,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
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
    setNewUser("")
    setOpenCreateDialog(false);
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

  const handleEditUserSubmit = async() => {
    setCreate(true)
     const token = localStorage.getItem("token");
 
 
     try {
       const response = await axios.put(
           `${SERVER_URL}/category/update-category/${editUser._id}`, 
           {
             "name":editUser.name, 
            
             }, 
           {
               headers: {
                 "Authorization":token,
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
               },
              
           }
       );
   if(response){
    setCreate(false)
    toast.success('Successful Updated!', {
     position: 'top-right',
     duration: 5000,
 });
 fetchData()
 setEditUser("")
 setOpenEditDialog(false)
   }
   } catch (err) {
       let errorMessage = 'An error occurred. Please try again later.';
       setCreate(false)
      console.log(err.reponse.reponse)
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

  return (
    <div className="mt-24 lg:mx-4 mx-2">
      <div className='hidden lg:block'>
        <div className='flex justify-between gap-3 items-center mb-5 mt-[100px]'>
        <h2 className="text-xl text-gray-700">Total: {loading ? "0":data.total        }</h2>
          <div className='flex gap-3 items-center'>
            {/* <div className="relative">
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
            </div> */}
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
              startIcon={<FolderOutlined />}
              onClick={handleCreateAccountClick}
            >
              Create Category
            </Button>
          </div>
        </div>
      </div>
      <div className='flex justify-between gap-3 items-center mb-5 mt-[100px] lg:hidden'>
     <h2 className="text-xl text-gray-700">Category</h2>
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
        <Table sx={{ minWidth: 400 }} aria-label="customized table">
          <TableHead>
            <TableRow>
            <StyledTableCell align="left">No</StyledTableCell>
              <StyledTableCell align="left">Category Name</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {data?.currentDatas?.length===0 ? (
             <StyledTableRow>
             <StyledTableCell colSpan={4} align="center">
               There is no Category
             </StyledTableCell>
           </StyledTableRow> 
            ):
            data?.currentDatas?.map((row,index) => (
              <StyledTableRow key={row._id}>
              <StyledTableCell align="left">{index+1}</StyledTableCell>
           <StyledTableCell align="left">{row.name}</StyledTableCell>
          
           <StyledTableCell align="left">
             <IconButton onClick={() => handleEdit(row)}  aria-label="update">
               <EditIcon />
             </IconButton>
             <IconButton onClick={() => handleDelete(row)} sx={{ color: 'red' }} aria-label="delete">
               <DeleteIcon />
             </IconButton>
           </StyledTableCell>
         </StyledTableRow>
              ))}
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
          Are you sure you want to delete the {selectedUser?.name}?
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
        <DialogTitle>Create New Category</DialogTitle>
        <DialogContent style={{ width: '100%' }}>
       
            <TextField
              label="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              fullWidth
              margin='normal'
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
        <DialogTitle>Edit User Account</DialogTitle>
        <DialogContent style={{ width: '100%' }}>
       
            <TextField
              label="Name"
              value={editUser.name}
              onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              fullWidth
              margin='normal'
            />
          
        
        </DialogContent>
        <DialogActions sx={{ mb: 2, mr: 2 }}>
          <Button onClick={() => {
            setNewUser("")
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

export default Category;
