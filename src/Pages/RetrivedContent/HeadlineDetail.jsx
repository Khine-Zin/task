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

import { useLocation, useNavigate } from "react-router-dom";
import userStore from "../../store/userStore";

// Component Start
const RetrievedHeadlineDetail = () => {
  const setUser = userStore((state) => state.setUser);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location || {};
  const [content, setContent] = useState("");



console.log(state)
  // Format Date Function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };


  return (
    <div className="mt-24 lg:mx-4 mx-2 hide-scrollbar flex-row justify-center items-center">
      {/* Breadcrumb */}
      <div className="flex justify-end m-8">
        <SmallBreadcrumbs title="Retrived" ActiveTitle="Details" link="/retrived" />
      </div>

      {/* Title */}
      <div className="text-2xl font-bold"> Details</div>

      {/* Task Info Table */}
      <table className="mt-8 font-medium text-bodyColor">
        <tbody>
          {[
            { icon: <HiUsers />, label: "Assignee", value: state?.user?.name || state?.task?.user?.name },
            {
              icon: <HiOutlineBriefcase />,
              label: "Brand Name",
              value: state?.brand?.name || state?.task?.brand?.name,
            },
            {
              icon: <IoShareSocialOutline />,
              label: "Social Media",
              value: (
                <div className="flex items-center gap-2">
                  {state?.soical_media === "facebook" ? (
                    <FaFacebook />
                  ) : state?.soical_media === "instagram" ? (
                     <FaInstagram />
                  ) :state?.soical_media === "free" ?(
                     <FaFacebook />
                  ): (
                    <FaTiktok />
                   
                  )}
                  <span>{state?.soical_media}</span>
                </div>
              ),
            },
            { icon: <PiListNumbers />, label: "Post No", value: state?.postNumber },
            {
              icon: <HiOutlineCalendar />,
              label: "Deadline",
              value: formatDate(state?.deadline),
            },
            { icon: <PiNotePencilDuotone />, label: "Note", value: state?.note },
            { icon: <HiChartBar />, label: "Category", value: state?.category?.name },
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

     </div>

     <div className="mt-10 lg:w-[70%] w-[95%]">

<div className=" font-bold text-secondaryColor mt-8">Description</div>
      <p className="text-sm text-bodyColor mt-5 mb-8">{ state.description}</p>

</div>
      

      <div className="h-[100px]"></div>
    </div>
  );
};

export default RetrievedHeadlineDetail;
