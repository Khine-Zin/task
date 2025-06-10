import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { motion } from "framer-motion";
import SideBar from "../components/SideBar";
import { useMediaQuery } from "@mui/material";


const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const role=localStorage.getItem("userRole")
  const [hidden,sethidden]=useState(false)
  const isTabletOrSmaller = useMediaQuery('(max-width: 420px)');
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
const toggleHidden=()=>{
  sethidden(!hidden)
setIsOpen(!isOpen)
}
console.log(!isTabletOrSmaller)
console.log(isTabletOrSmaller,hidden)
  return (
    <motion.main
      className="flex flex-row h-screen bg-neutral-100 w-full overflow-scroll"
      transition={{ duration: isOpen ? 0.2 : 0, delay: isOpen ? 0.3 : 0 }}
    >
      <div>
      {
        role !=="content-writer" &&  !isTabletOrSmaller && (
          <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} setIsOpen={setIsOpen} />
        )
      }
        {
        role !=="content-writer" &&  isTabletOrSmaller && hidden && (
          <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} setIsOpen={setIsOpen} toggleHidden={toggleHidden}/>
        )
      }
      </div>
      <div className={`${isOpen ? 'w-[calc(100%-256px)] ml-[256px]' : `w-[calc(100%-96px)] ${role !== "content-writer" &&  !isTabletOrSmaller ? "ml-[80px]" : "ml-0"}`} w-full h-screen relative transition-all delay-200 duration-300`}>
        <Header toggleHidden={toggleHidden}/>
        <Outlet />
      
      
      </div>
    </motion.main>
  );
};

export default Layout;
