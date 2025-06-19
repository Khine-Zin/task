import React, { useEffect, useState } from "react";
import {
  HiUsers,
  HiOutlineCalendar,
  HiOutlineBriefcase,
  HiChartBar,
  HiCurrencyDollar,
} from "react-icons/hi";
import { PiNotePencilDuotone, PiListNumbers } from "react-icons/pi";
import { IoMegaphoneOutline, IoShareSocialOutline } from "react-icons/io5";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa6";
import SmallBreadcrumbs from "../../components/BreadCrumbs";
import { LuNotebookPen } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import userStore from "../../store/userStore";
import Gallery from "../../components/Gallery";
import { MdAddReaction, MdOutlineAddReaction } from "react-icons/md";
import { PiShareNetwork } from "react-icons/pi";
import { MdBookmarks } from "react-icons/md";
// Component Start
const CompleteDetail = () => {

  const location = useLocation();

  const { state } = location || {};





  // Format Date Function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

console.log(state)
  return (
    <div className="mt-24 lg:mx-4 mx-2 hide-scrollbar flex-row justify-center items-center">
      {/* Breadcrumb */}
      <div className="flex justify-end m-8">
        <SmallBreadcrumbs title="Complete" ActiveTitle="Details" link="/report" />
      </div>

      {/* Title */}
      <div className="text-2xl font-bold"> Details</div>

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
                  {state.task?.social_media=== "facebook" ? (
                    <FaFacebook />
                  ) : state?.task?.social_media === "tiktok" ? (
                    <FaTiktok />
                  ) : state?.task?.social_media === "free" ? (
                    <FaFacebook />
                  ) :(
                    <FaInstagram />
                  )}
                  <span>{state?.task?.social_media}</span>
                </div>
              ),
            },
            { icon: <PiListNumbers />, label: "Post No", value: state.task?.postNumber },
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
            <p className="text-sm text-bodyColor mt-5 mb-8">{state?.task?.headline || state.headline}</p>

         
           {
            state?.content && (
             <>
              <div className=" font-bold text-secondaryColor mt-8">Content</div>
              <p className="text-sm text-bodyColor mt-5 mb-8" dangerouslySetInnerHTML={{ __html:state?.content || "<p>No content available</p>" }}/></>
            )
           }

<div className="flex gap-2 my-5">
            <Gallery image={state?.design}/>
          </div> 
    
      </div>

      <div className="h-[100px]"></div>
    </div>
  );
};

export default CompleteDetail;
