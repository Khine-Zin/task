import React from "react";
import { HiUsers, HiOutlineCalendar ,HiOutlineBriefcase,HiChartBar} from "react-icons/hi";
import { PiNotePencilDuotone,PiListNumbers } from "react-icons/pi";
import Ckeditor from "../../components/Ckeditor";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa6";
import SmallBreadcrumbs from "../../components/BreadCrumbs";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import FileUpload from "../../components/FileUpload";
import toast, { Toaster } from 'react-hot-toast'; 
import userStore from '../../store/userStore';
import axios from "axios";
import { SERVER_URL } from "../../api/url";
import Datepicker from "../../components/DatePicker";

const HistoryDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location || {};
     const setUser = userStore((state) => state.setUser);
    console.log(state)
     const [bannerImage, setBannerImage] = React.useState(state?.design);
    const [headline, setHeadline] = useState(state?.task?.headline);
      const [content, setContent] = useState(state?.content);
       const [category, setCategory] = useState([]);
      const [data,setData]=useState({
        budget:state?.budget,
        share:state?.share,
        organic:state?.organic,
        reaction:state?.reactions,
        ads:state.ads,
        total:state.total_reach,
        category:state?.task?.category?._id,
        description:state?.task?.description,
        design_brief:state?.design_brief || state?.note,
        design_date:state?.design_date

      })
      const [create,setCreate]=useState(false)
      const [loading,setLoading]=useState(false)

      console.log(data)
    
      const handleSubmit = async () => {
        setCreate(true);
        const token = localStorage.getItem("token");
    
        try {
          const formData = new FormData();
      
       
      formData.append("budget", data?.budget ? data?.budget :"");
         formData.append("share", data?.share ? data.share :"");
        formData.append("organic", data?.organic ? data?.organic :"");
        
            formData.append("reactions", data?.reaction ? data?.reaction :"");
         formData.append("total_reach", data?.total ? data?.total :"");
         formData.append("ads", data?.ads ?data.ads :"");
         
          formData.append("category", data?.category);
          formData.append("headline", headline);
          formData.append("description", data?.description);
          formData.append("design_brief", data?.design_brief);
        if(data?.design_date !==state?.design_date){
              formData.append("design_date", data?.design_date);
        }
          formData.append("content", content); // if this is a file or text
          if(state?.task?.social_media!=="tiktok-script"){
            if(bannerImage){
              formData.append("image", bannerImage);
            }
           }
          const response = await axios.put(
            `${SERVER_URL}/history/edit-history/${state._id}`,
            formData,
            {
              headers: {
                Authorization: token,
                Accept: "application/json",
                "Content-Type": "multipart/form-data", // must use this for FormData
              },
            }
          );
      
          setCreate(false);
      
          if (response.data?.statusCode === 200) {
            toast.success("Successfully Updated!", {
              position: "top-right",
              duration: 5000,
            });
            navigate("/history");
          } else if (response.data?.statusCode === 203) {
            toast.error(`${response.data?.message}`, {
              position: "top-right",
              duration: 5000,
            });
          }
        } catch (err) {
          setCreate(false);
          let errorMessage = "An error occurred. Please try again later.";
      
          if (err.response) {
            switch (err.response.status) {
              case 400:
              case 401:
                errorMessage = err.response.data?.message || "Unauthorized";
                localStorage.clear();
                setUser(null);
                navigate("/");
                break;
              case 500:
                errorMessage = err.response.data?.message || "Server error.";
                break;
              case 503:
                errorMessage = "Service is temporarily unavailable.";
                break;
              case 502:
                errorMessage = "Bad Gateway.";
                break;
              default:
                errorMessage = err.response.data?.message || "An error occurred.";
            }
          } else if (err.request) {
            errorMessage = "Network error.";
          } else {
            errorMessage = `Error: ${err.message}`;
          }
      
          toast.error(errorMessage, {
            position: "top-right",
            duration: 5000,
          });
        }
      };
      
      const fetchCategory = async () => {
          setLoading(true);
          const token = localStorage.getItem("token");
      
          try {
            const response = await axios.get(
              `${SERVER_URL}/category/view-category?page=1&limit=20`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token,
                },
              }
            );
            setCategory(response.data.data?.currentDatas);
          
          } catch (err) {
            let errorMessage = "An error occurred. Please try again later.";
      
            if (err.response) {
              switch (err.response.status) {
                case 401:
                case 400:
                  errorMessage =
                    err.response.data?.message || "Your Token is blacklist.";
                  localStorage.clear();
                  setUser(null);
                  navigate("/");
                  break;
                case 500:
                  errorMessage =
                    err.response.data?.message || "Server error. Please try again.";
                  break;
                case 503:
                  errorMessage =
                    "Service is temporarily unavailable. Please try again later.";
                  break;
                case 502:
                  errorMessage = "Bad Gateway: Server is down. Please try later.";
                  break;
                default:
                  errorMessage = err.response.data?.message || "An error occurred.";
              }
            } else if (err.request) {
              errorMessage = "Network error. Please check your internet connection.";
            } else {
              errorMessage = `Error: ${err.message}`;
            }
      
            toast.error(errorMessage, { position: "top-right", duration: 5000 });
          } finally {
            setLoading(false);
          }
        };
          React.useEffect(() => {
            fetchCategory();
          }, []);
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    };
  return (
    <div className="mt-24 lg:mx-4 mx-2 hide-scrollbar flex-row justify-center items-center">
      <div className="flex justify-end m-8">
       <SmallBreadcrumbs title="History" ActiveTitle="Details" link="/history" />
       </div>
       <div className="text-2xl font-bold">Task Details</div>
      <table className="mt-8 font-medium text-bodyColor">
            <tbody>
              {[
                // { icon: <HiUsers />, label: "Assignee", value: state?.task?.user?.name },
                {
                  icon: <HiOutlineBriefcase />,
                  label: "Brand Name",
                  value: state?.task?.brand?.name,
                },
                {
                  icon: <IoShareSocialOutline />,
                  label: "Social Media",
                  value: (
                    <div className="flex items-center gap-2">
                      {state.task?.social_media === "facebook" ? (
                        <FaFacebook />
                      ) : state?.task?.social_media === "instagram" ? (
                          <FaInstagram />
                       
                      ) :state?.task?.social_media === "free" ?(
                          <FaFacebook />
                      ): (
                        <FaTiktok />
                      )}
                      <span>{state?.task?.social_media}</span>
                    </div>
                  ),
                },
                { icon: <PiListNumbers />, label: "Post No", value: state?.task?.postNumber },
                {
                  icon: <HiOutlineCalendar />,
                  label: "Deadline",
                  value: formatDate(state?.task?.deadline),
                },
                { icon: <PiNotePencilDuotone />, label: "Note", value: state?.note },
               
              ].map((row, index) => (
                <tr key={index} className="border-none ">
                  <td className="flex items-center gap-2 lg:w-[200px] w-[130px] p-3">
                    {row.icon}
                    <span>{row.label}</span>
                  </td>
                  <td className="">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        
       
        <div className="mt-10 lg:w-[70%] w-[95%]">
                  <FormControl fullWidth margin="normal">
                <InputLabel id="role-label">Select Category</InputLabel>
                <Select
          labelId="role-label"
          id="role"
          value={data.category } // Set value dynamically from state
          onChange={(e) => setData({ ...data, category:e.target.value})} // Update state on change
          label="Select Category"
          >
          {category.length === 0 ? (
            <MenuItem disabled>No option</MenuItem>
          ) : (
            category.map((user) =>
              user?.role !== 'admin' && (
                <MenuItem key={user._id} value={user._id}>
                  {user.name}
                </MenuItem>
              )
            )
          )}
          </Select>
          
              </FormControl>
           <TextField
                              label="Headline"
                              multiline
                              rows={3} // Set the number of visible rows in the textarea
                              value={headline}
                              onChange={(e) => setHeadline(e.target.value)}
                              fullWidth
                              margin="normal"
                            />
                              <TextField
                              label="Description"
                              multiline
                              rows={3} // Set the number of visible rows in the textarea
                              value={data.description}
                              onChange={(e) => setData({ ...data, description: e.target.value })}
                              fullWidth
                              margin="normal"
                            />
                           {state?.task?.social_media !== "tiktok-script" &&
 state?.task?.social_media !== "tiktok-trend" && (
  <>
    <TextField
      label="Design Brief"
      multiline
      rows={3}
      value={data.design_brief}
      onChange={(e) => setData({ ...data, design_brief: e.target.value })}
      fullWidth
      margin="normal"
    />
  </>
)}


                             <div className="mt-5">
                               <Box flex={1}>
                                <InputLabel shrink>Design Date</InputLabel>
                                <Datepicker
                                  value={data.design_date}
                                  onChange={(e) => setData({ ...data, design_date: e.target.value })}
                                  name="startDate"
                                />
                              </Box>
                            </div>
                           
        
         {
          state?.task?.social_media!=="tiktok-slide" && (
            <>
             <div  className=" font-bold text-secondaryColor mb-3 mt-8">
          {state?.task?.social_media ==="facebook" ? "Content" :"Script"}
          
          </div>
           <Ckeditor value={content} onChange={setContent} /></>
            
          )
         }
       {
        state?.task?.social_media !=="tiktok-script" && (
             <Box mt={2}>
      <FileUpload setBannerImage={setBannerImage} image={bannerImage} />
    </Box>
        )
       }
         <div className="mt-5 flex gap-3 w-full ">
                  <div className="w-full">
                    <TextField
                      label="Budget"
                      value={data.budget || ""}
                      onChange={(e) => setData({ ...data, budget: e.target.value })}
                      fullWidth
                      margin="normal"
                    />
      
                    <TextField
                      label="Share"
                      value={data.share || ""}
                      onChange={(e) => setData({ ...data, share: e.target.value })}
                      fullWidth
                      margin="normal"
                    />
      
                    <TextField
                      label="Organic Reach"
                      value={data.organic || ""}
                      onChange={(e) => setData({ ...data, organic: e.target.value })}
                      fullWidth
                      margin="normal"
                    />
                  </div>
      
                  <div className="w-full">
                    <TextField
                      label="Reactions"
                      value={data.reaction || ""}
                      onChange={(e) =>
                        setData({ ...data, reaction: e.target.value })
                      }
                      fullWidth
                      margin="normal"
                    />
      
                    <TextField
                      label="ads"
                      value={data.ads || ""}
                      onChange={(e) =>
                        setData({ ...data, ads: e.target.value })
                      }
                      fullWidth
                      margin="normal"
                    />
      
                    <TextField
                      label="Total Reach"
                      value={data.total || ""}
                      onChange={(e) => setData({ ...data, total: e.target.value })}
                      fullWidth
                      margin="normal"
                    />
      
                    <div className="flex justify-end mt-5">
                      <button
                        className="bg-primaryColor hover:secondaryColor text-white font-bold py-2 px-6 rounded mt-5"
                        onClick={handleSubmit}
                      >
                       {create ? "Loading" :" Submit"}
                      </button>
                    </div>
                  </div>
                </div>
             
       
       
        </div>
        <div className="h-[100px]"></div>
    </div>
  );
};

export default HistoryDetail;
