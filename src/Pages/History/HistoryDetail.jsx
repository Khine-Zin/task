import React from "react";
import { HiUsers, HiOutlineCalendar ,HiOutlineBriefcase,HiChartBar} from "react-icons/hi";
import { PiNotePencilDuotone,PiListNumbers } from "react-icons/pi";
import Ckeditor from "../../components/Ckeditor";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaInstagram, FaTiktok } from "react-icons/fa6";
import SmallBreadcrumbs from "../../components/BreadCrumbs";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box, TextField } from "@mui/material";
import FileUpload from "../../components/FileUpload";


const HistoryDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location || {};
     const [bannerImage, setBannerImage] = React.useState(state?.design);
    const [headline, setHeadline] = useState(state?.task?.headline);
      const [content, setContent] = useState(state?.content);
      const [data,setData]=useState({
        budget:state.budget,
        paid:state.paid_reach

      })
      const [create,setCreate]=useState(false)
      const handleSubmit = async () => {
        setCreate(true);
        const token = localStorage.getItem("token");
      
        try {
        
        
      
          const response = await axios.post(
            `${SERVER_URL}/media-buyer/create-media-buyer/${state._id}`,
            {
              "budget": data?.budget,
              "paid_reach": 5000,
              "organic_reach": 3000,
              "reactions": 4000,
              "comments": 5000,
              "shares": 1000,
              "page_visitor": 10000,
              "page_new_follower": 1000000,
              "page_total_reach": 150000
          },
            {
              headers: {
                Authorization: token,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
      
          setCreate(false);
      
          if (response.data?.statusCode === 201) {
       
            toast.success("Successful Created!", {
              position: "top-right",
              duration: 5000,
            });
         
         
       navigate("/media")
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
                errorMessage =
                  err.response.data?.message || "Server error. Please try again later.";
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
                { icon: <HiUsers />, label: "Assignee", value: state?.task?.user?.name },
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
                      {state.task?.soical_media === "facebook" ? (
                        <FaFacebook />
                      ) : state?.task?.soical_media === "tiktok" ? (
                        <FaTiktok />
                      ) : (
                        <FaInstagram />
                      )}
                      <span>{state?.task?.soical_media}</span>
                    </div>
                  ),
                },
                { icon: <PiListNumbers />, label: "Post No", value: state.post },
                {
                  icon: <HiOutlineCalendar />,
                  label: "Deadline",
                  value: formatDate(state?.task?.deadline),
                },
                { icon: <PiNotePencilDuotone />, label: "Note", value: state?.note },
                { icon: <HiChartBar />, label: "Category", value: state?.task?.category?.name },
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
           <TextField
                              label="Headline"
                              multiline
                              rows={3} // Set the number of visible rows in the textarea
                              value={headline}
                              onChange={(e) => setHeadline(e.target.value)}
                              fullWidth
                              margin="normal"
                            />
         <div  className=" font-bold text-secondaryColor mb-3 mt-8">
           Content
          </div>
          <Ckeditor value={content} onChange={setContent} />
          <Box mt={2}>
      <FileUpload setBannerImage={setBannerImage} image={bannerImage} />
    </Box>
       <div className="mt-5 flex gap-3 w-full hidden lg:block">
                 <div className="w-full">
                   <TextField
                     label="Budget"
                     value={data.budget || ""}
                     onChange={(e) => setData({ ...data, budget: e.target.value })}
                     fullWidth
                     margin="normal"
                   />
     
                   <TextField
                     label="Paid Reach"
                     value={data.paid || ""}
                     onChange={(e) => setData({ ...data, paid: e.target.value })}
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
                     label="Comments"
                     value={data.comment || ""}
                     onChange={(e) =>
                       setData({ ...data, comment: e.target.value })
                     }
                     fullWidth
                     margin="normal"
                   />
     
                   <TextField
                     label="Shares"
                     value={data.share || ""}
                     onChange={(e) => setData({ ...data, share: e.target.value })}
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
