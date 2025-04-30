import React, { useEffect, useState } from "react";
import {
  HiUsers,
  HiOutlineCalendar,
  HiOutlineBriefcase,
  HiChartBar,
} from "react-icons/hi";
import { PiNotePencilDuotone, PiListNumbers } from "react-icons/pi";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa6";
import SmallBreadcrumbs from "../../components/BreadCrumbs";
import Ckeditor from "../../components/Ckeditor";
import { useLocation, useNavigate } from "react-router-dom";
import userStore from "../../store/userStore";
import toast from "react-hot-toast";
import { SERVER_URL } from "../../api/url";
import axios from "axios";

import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

// Component Start
const Detail = () => {
  const setUser = userStore((state) => state.setUser);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location || {};
  const [content, setContent] = useState(state?.content);


  const [create,setCreate]=useState(false)

   const [taskData, setTaskData] = useState({
   
    
     description: state?.design_brief || ""
   });
   

  // Format Date Function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };




  const handleSubmit = async() => {
    setCreate(true)
     const token = localStorage.getItem("token");
 
 
     try {
       const response = await axios.put(
           `${SERVER_URL}/task/edit-task/${state?._id}`, 
           {
            content:content,
            design_brief:taskData.description
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
     setCreate(false)
      if(response.data?.statusCode===200){
       navigate("/task")
       toast.success('Successful Added Content!', {
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
console.log(state)
  return (
    <div className="mt-24 lg:mx-4 mx-2 hide-scrollbar flex-row justify-center items-center">
      {/* Breadcrumb */}
      <div className="flex justify-end m-8">
        <SmallBreadcrumbs title="Task" ActiveTitle="Details" link="/task" />
      </div>

      {/* Title */}
      <div className="text-2xl font-bold">Task Details</div>

      {/* Task Info Table */}
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
                  {state?.task?.soical_media === "facebook" ? (
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

    

      {/* Headline */}
      <div className="mt-10 lg:w-[70%] w-[95%]">

      <div className=" font-bold text-secondaryColor mt-8">Headline</div>
            <p className=" text-bodyColor mt-5 mb-8">{state?.task?.headline}</p>

          <div className="mb-8">
          <div className=" font-bold text-secondaryColor my-8">Content</div>
          <Ckeditor value={content} onChange={setContent} />
          </div>
  
    
                    <TextField
                     label="Design Brief"
                     multiline
                     rows={3} // Set the number of visible rows in the textarea
                     value={taskData.description}
                     onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                     fullWidth
                     margin="normal"
                   />
        <div className="flex justify-end">
          <button onClick={handleSubmit} className="bg-primaryColor hover:secondaryColor text-white font-bold py-2 px-6 rounded mt-5">
           {create ? "Loading" :"Submit"}
          </button>
        </div>
      </div>

      <div className="h-[100px]"></div>
    </div>
  );
};

export default Detail;
