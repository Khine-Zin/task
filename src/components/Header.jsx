import React, { useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { HiMenu, HiUserCircle } from "react-icons/hi";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"; // Import motion for animation
import userStore from "../store/userStore";
import { useMediaQuery } from "@mui/material";

const Header = ({toggleHidden}) => {
  const role=localStorage.getItem("userRole")
 const userName=localStorage.getItem("userName")
  const [showLogout, setShowLogout] = useState(false);
  const { setUser } = userStore();
  const isTabletOrSmaller = useMediaQuery('(max-width: 420px)');
  const navigate = useNavigate();
  const toggleLogoutNav = () => {
    setShowLogout(prevState => !prevState);
  };

  const handleLogout = () => {
    navigate("/")
    localStorage.removeItem('userRole');
    setUser(null)
  
  };
  
  return (
    <header className="w-full z-50 transition-all duration-300 fixed top-0 right-0 shadow-sm z-10">
      <div className="relative w-full bg-white py-5 px-2 lg:p-5 flex justify-between items-center ">
    
       
        {/* Logo Section */}
        <div className="main-logo gap-3 flex items-center shrink-0 text-primaryColor">
          {/* Uncomment if logo image is available */}
          <motion.button 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
            onClick={toggleHidden} 
            className={`text-gray-800 focus:outline-none hover:text-primaryColor transition-all delay-200 duration-300  `}>
         <HiMenu size={24}/>
          </motion.button>
          <span className={`text-lg lg:text-3xl font-bold transition-all duration-300 ${role!=="admin" ?"":"hidden"} lg:block`}>Task Management</span>
        </div>

        {/* Notifications and User Profile Section */}
        <div className="flex lg:gap-3 gap-2 lg:mr-10 justify-center items-center">
        
         {
          role==="admin" && (
            <div className=" lg:p-2 lg:bg-slate-100 rounded-full text-slate-500">
            <IoIosNotifications  className="text-primaryColor size-4 lg:size-6"/>
          </div>
          )
         }

          {/* User Profile and Logout Dropdown */}
          <div className="text-primaryColor flex items-center gap-2 relative cursor-pointer" onClick={toggleLogoutNav}>
            <HiUserCircle  className="size-6 lg:size-10"/>
            <span className="text-lg lg:text-2xl font-semibold">{userName}</span>
            
            {showLogout  && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute top-full lg:left-0 right-0 mt-2 bg-white shadow-md rounded-md lg:w-40 border border-gray-200"
              >
                <ul className="text-sm text-gray-700">
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 pr-10 py-2 text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
