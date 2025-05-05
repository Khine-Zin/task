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



const History = () => {


  const [searchQuery, setSearchQuery] = React.useState("");
 const [id,setId]=React.useState("")
 const setUser = userStore((state) => state.setUser);
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [newUser, setNewUser] = React.useState({ name: '', email: '', role: '', password: '' });


  const [loading,setLoading]=React.useState(false)
  const [Create,setCreate]=React.useState(false)
    const navigate = useNavigate();
const [startDate,setStartDate]=React.useState("")
const [endDate,setEndDate]=React.useState("")
  const [data, setData] = React.useState([]);
  
  const [pager, setPager] = React.useState({ currentPage: 1, pageSize: 9 });
  const debounceTimer = React.useRef(null);
    const [brand,setBrand]=React.useState([])
  const [bannerImage, setBannerImage] = React.useState("");
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);

  };

  const formatMonth = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);

  };

  const fetchData= async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${SERVER_URL}/history/view-history?page=${pager.currentPage}&limit=${pager.pageSize}&status=confirm&brandId=${searchQuery}`, {
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
  
  
   const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  React.useEffect(() => {
   fetchBrand()
    }, []); 

  React.useEffect(() => {
 fetchData()
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
    {brand.length === 0 ? (
      <MenuItem disabled>No option</MenuItem>
    ) : (
      brand.map((user) => (
        <MenuItem key={user._id} value={user._id}>
          {user.name}
        </MenuItem>
      ))
    )}
  </Select>
</FormControl>
  <Box display="flex" gap={2} mt={2}>
      {/* Start Date */}
      <Box flex={1}>
       
        <Datepicker
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          name="startDate"
        />
      </Box>
    
      {/* End Date */}
      <Box flex={1}>
      
        <Monthpicker
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          name="endDate"
        />
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
      <h2 className="text-xl text-gray-700">Plan</h2>
       
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
            <StyledTableCell align="left">Post</StyledTableCell>
            <StyledTableCell align="left">Brand Name</StyledTableCell>
            <StyledTableCell align="left">Month</StyledTableCell>
            <StyledTableCell align="left">Post Deadline</StyledTableCell>
             
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.currentDatas?.[0]?.content?.length===0? (
               <StyledTableRow>
               <StyledTableCell colSpan={5} align="center">
                 There is no data found
               </StyledTableCell>
             </StyledTableRow> 
            ):data?.currentDatas?.map((dataItem,index) => (
               dataItem?.content?.map((row, rowIndex) =>
                      row?.tasks?.map((taskItem, taskIndex) => {
                        const task = taskItem?.task;
                        return (
                          <StyledTableRow key={row._id}>
                              <StyledTableCell align="left">post -{taskItem.post}</StyledTableCell>
                          <StyledTableCell align="left">{task?.brand?.name}</StyledTableCell>
                          <StyledTableCell align="left">{formatMonth(task?.month)}</StyledTableCell>
                   
                       <StyledTableCell align="left">{formatDate(taskItem?.design_date)}</StyledTableCell>
                       <StyledTableCell align="left">
                          <Tooltip title={task?.headline ? task?.headline:"No headline" } >
                         <IconButton   onClick={(e) => {
                      
                      navigate("/history/detail",{ state: taskItem });
                    }}
                      aria-label="delete">
                           <Info />
                         </IconButton>
                         </Tooltip>
                       </StyledTableCell>
                     </StyledTableRow>
                        );
                      })
                    )
              
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
  

  

     
    </div>
  );
};

export default History;
