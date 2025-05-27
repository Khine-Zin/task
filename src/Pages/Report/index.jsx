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
import { CheckCircle, Download } from '@mui/icons-material';
import toast, { Toaster } from 'react-hot-toast';  // Import toast and Toaster

import { Box, FormControl, InputLabel, MenuItem, Select, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { SERVER_URL } from '../../api/url';
import userStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { Info, Storefront, UploadFile } from '@mui/icons-material';
import FileUpload from '../../components/FileUpload';
import Tooltip from '@mui/material/Tooltip';
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



const Report = () => {



 const [id,setId]=React.useState("")
 const setUser = userStore((state) => state.setUser);
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [newUser, setNewUser] = React.useState({});

  const role = localStorage.getItem("userRole");
  const [loading,setLoading]=React.useState(false)
  const [Create,setCreate]=React.useState(false)
    const navigate = useNavigate();
const [monthsearch,setMonthSearch]=React.useState("")
 const [searchQuery, setSearchQuery] = React.useState("");
  const [data, setData] = React.useState([]);
  const [pager, setPager] = React.useState({ currentPage: 1, pageSize: 9 });
  const debounceTimer = React.useRef(null);
  const [reachImage, setReachImage] = React.useState("");
  const [visitorImage, setVisitorImage] = React.useState("");
  const [followerImage, setFollowerImage] = React.useState("");
  const [locationImage, setLocationImage] = React.useState("");
  const [messageImage, setMessageImage] = React.useState("");
    const [brand,setBrand]=React.useState([])
const [yearsearch,setYearSearch]=React.useState("")
    const formatMonth = (dateString) => {
      const options = {  month: 'short', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-GB', options);
  
    };
      const filteredDownload = brand.filter(item => item._id === newUser?.brand);

const filteredMonthDownload = filteredDownload?.[0]?.months.filter(item => item.year === newUser.year);
    const formatDate = (dateString) => {
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-GB', options);
  
    };
    const filtered = brand.filter(item => item.name === searchQuery);

const filteredMonth = filtered?.[0]?.months.filter(item => item.year === yearsearch);
   console.log(filteredDownload)

// console.log("Start Date:", startDateFormatted);
// console.log("End Date:", endDateFormatted);
  const fetchData= async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${SERVER_URL}/report/view-report?page=${pager.currentPage}&limit=${pager.pageSize}&status=done&brand=${searchQuery==="All" ? "" :searchQuery}&search=${yearsearch==="All"? "":yearsearch}&category=${monthsearch ==="All" ? "":monthsearch}`, {
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
     
      const brandResponse = await axios.get(`${SERVER_URL}/brand/view-brand`, {
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
    fetchBrand();
  }, []);


  React.useEffect(() => {
    fetchData();
  }, [pager.currentPage,searchQuery,monthsearch,yearsearch]);

  const handlePageChange = (direction) => {
    setPager(prev => {
      const newPage = prev.currentPage + direction;
      return {
        ...prev,
        currentPage: newPage,
      };
    });
  };

console.log("new",newUser)

  const handleCreateAccountClick = (row) => {

    setOpenCreateDialog(true);
  };

const handleCreateUserSubmit = async () => {
  setCreate(true);
  const token = localStorage.getItem("token");

  try {
    const formData = new FormData();
    formData.append("month", newUser.month);
    formData.append("year", newUser.year);
    formData.append("brand", newUser?.brand);
    formData.append("page_total_reach", newUser?.pageReach);
    formData.append("page_visitor", newUser?.pageVisitor);
    formData.append("page_new_follower", newUser?.pageFollower);
    formData.append("reachImage", reachImage);
    formData.append("visitorImage", visitorImage);
    formData.append("followerImage", followerImage);
    formData.append("locationImage", locationImage);
    formData.append("messageImage", messageImage);

    const response = await axios.post(
      `${SERVER_URL}/report/download-report`,
      formData,
      {
        headers: {
          "Authorization": token,
          'Accept': 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',  // Ensures response data is in Blob format
      }
    );

 const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    const brandInfo = brand.find(b => b._id === newUser.brand);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${brandInfo.name}-report.pdf`; // File name for the downloaded PDF
    document.body.appendChild(a);
    a.click();
    a.remove();

    // Revoke the URL to free up memory
    window.URL.revokeObjectURL(url);

    setCreate(false);

    toast.success('Successful Download!', {
      position: 'top-right',
      duration: 5000,
    });
    setOpenCreateDialog(false);
    setNewUser("");
    setVisitorImage("")
    setFollowerImage("")
    setReachImage("")
    setLocationImage("")
    setMessageImage("")

  } catch (err) {
    let errorMessage = 'An error occurred. Please try again later.';
    setCreate(false);
console.log(err)
    if (err.response) {
      switch (err.response.status) {
        case 401:
        case 400:
          errorMessage = err.response?.message || 'Unauthorized';
          localStorage.clear();
          setUser(null);
          navigate("/"); // Redirect to login
          break;
        case 500:
          errorMessage = err.response?.message || 'Server error. Please try again later.';
          break;
        case 503:
          errorMessage = 'Service is temporarily unavailable. Please try again later.';
          break;
        case 502:
          errorMessage = 'Bad Gateway: The server is down. Please try again later.';
          break;
        default:
          errorMessage = err.response?.message || 'No Content found';
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
                       onChange={(e) => 
                       {if(searchQuery=="All"){
                        setMonthSearch("All")
                        setYearSearch("All")
                       }
                         setSearchQuery(e.target.value)
                       }
                       
                      }
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
          <Button
            variant="contained"
            sx={{
                height: '55px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: "#000000",
              textTransform: 'none'
            }}
            startIcon={<Download />}
            onClick={()=>handleCreateAccountClick()} 
          >
           Download
          </Button>
        </div>
          )
        }
      </div>
      </div>
      <div className='flex justify-between gap-3 items-center mb-5 mt-[100px] lg:hidden'>
      <h2 className="text-xl text-gray-700">Report</h2>
       
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
{data?.currentDatas?.[0]?.content?.length === 0 ? (
  <StyledTableRow>
    <StyledTableCell colSpan={5} align="center">
      There is no report found
    </StyledTableCell>
  </StyledTableRow>
) : (
  // Flatten and sort all taskItems before rendering
  data?.currentDatas
    ?.flatMap((dataItem) =>
      dataItem?.content?.flatMap((row) =>
        row?.tasks?.map((taskItem) => ({ ...taskItem }))
      )
    )
    ?.filter(Boolean) // remove any undefined/null items
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    ?.map((taskItem, index) => {
      const task = taskItem?.task;
      return (
        <StyledTableRow key={index}>
          <StyledTableCell align="left">post - {task?.postNumber}</StyledTableCell>
          <StyledTableCell align="left">{task?.brand?.name}</StyledTableCell>
           <TableCell align="left">
                              {task?.year} - {["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"][task?.month - 1]} Month 
                             </TableCell>
          <StyledTableCell align="left">{formatDate(taskItem?.design_date)}</StyledTableCell>
          <StyledTableCell align="left">
            <Tooltip title={task?.headline || "No headline"}>
              <IconButton
                onClick={() => navigate("/report/detail", { state: taskItem })}
                aria-label="info"
              >
                <Info />
              </IconButton>
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
  

      {/* Create User Form Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} fullWidth maxWidth="sm">
  <DialogTitle>Download</DialogTitle>
  <DialogContent style={{ width: "500" }}>
  
  <Box display="flex" gap={2} mt={2}>
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
      {/* Start Date */}
      
    
   
    </Box>
    <FormControl fullWidth margin="normal">
                <InputLabel id="year-label">Select Year</InputLabel>
                <Select
                  labelId="year-label"
                  id="year"
                  value={newUser.year}
                  label="Select Year"
                  onChange={(e) => setNewUser({ ...newUser, year: e.target.value })}
                >
                  {filteredDownload?.length === 0 || !filteredDownload?.[0]?.months ? (
                    <MenuItem disabled>No option</MenuItem>
                  ) : (
                    [...new Set(filteredDownload?.[0]?.months?.map((m) => m.year))].map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))
                  )}
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
                  {filteredMonthDownload?.length === 0 ? (
                    <MenuItem disabled>No option</MenuItem>
                  ) : (
                    filteredMonthDownload?.map((user) => (
                      <MenuItem key={user._id} value={user.month}>
                        {["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth", "Eleventh", "Twelfth"][user.month - 1]} Month
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
      
                    <TextField
                      label="Total Page Reach"
                      value={newUser.pageReach || ""}
                      onChange={(e) => setNewUser({ ...newUser, pageReach: e.target.value })}
                      fullWidth
                      margin="normal"
                    />
                      <TextField
                      label="Total Page Visitors"
                      value={newUser.pageVisitor || ""}
                      onChange={(e) => setNewUser({ ...newUser, pageVisitor: e.target.value })}
                      fullWidth
                      margin="normal"
                    />
                      <TextField
                      label="Total Page New likes and followers"
                      value={newUser.pageFollower || ""}
                      onChange={(e) => setNewUser({ ...newUser, pageFollower: e.target.value })}
                      fullWidth
                      margin="normal"
                    />
   <div className='mt-8'>
   <label className='mb-5'> Page Reach Graph Image</label>
   <FileUpload setBannerImage={setReachImage} image={reachImage} />
   </div>
     <div className='mt-8'>
     <label className='mb-5'>Page Page Visitor Graph Image</label>
     <FileUpload setBannerImage={setVisitorImage} image={visitorImage} />
     </div>
      <div className='mt-8'>
      <label className='mb-5'>Page Page New likes and followers Graph Image</label>
      <FileUpload setBannerImage={setFollowerImage} image={followerImage} />
      </div>
      <div className='mt-8'>
      <label className='mb-5'>Message Detail Image</label>
      <FileUpload setBannerImage={setMessageImage} image={messageImage} />
      </div>
      <div className='mt-8'>
      <label className='mb-5'>Location Image</label>
      <FileUpload setBannerImage={setLocationImage} image={locationImage} />
      </div>
  </DialogContent>
  <DialogActions sx={{ mb: 2, mr: 2 }}>
    <Button onClick={() => {
      
      setNewUser("")
      setOpenCreateDialog(false)
    }} sx={{ color: "#666464" }}>
      Cancel
    </Button>
    <Button onClick={handleCreateUserSubmit} sx={{ backgroundColor: "#262323", color: "#ffffff" }}>
      {Create ? "loading..." : "Download"}
    </Button>
  </DialogActions>
</Dialog>


     
    </div>
  );
};

export default Report;
