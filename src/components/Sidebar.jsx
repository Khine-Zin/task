import React from "react";
import { HiOutlineViewGrid, HiUserAdd,HiOutlineBriefcase, HiPencilAlt, HiClock, HiOutlineClock, HiDocumentDownload, HiOutlineDocumentText  } from 'react-icons/hi';
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HiDocumentCheck, HiDocumentText, HiMiniComputerDesktop, HiOutlineDocumentCheck } from "react-icons/hi2";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { FaListCheck } from "react-icons/fa6";
import { IoMegaphoneOutline } from "react-icons/io5";
import { useMediaQuery } from '@mui/material';
import { MdOutlineWorkHistory } from "react-icons/md";

const SideBar = ({ isOpen, setIsOpen,toggleHidden }) => {
  const Location = useLocation();
  const isTabletOrSmaller = useMediaQuery('(max-width: 420px)');

  const handleToggle = () => {
   
     setIsOpen(!isOpen)
   
   
  };

  const handleClick=()=>{
      if(isTabletOrSmaller){
        toggleHidden(false),
      setIsOpen(false)
      }
  }

  return (
    <div
      onMouseEnter={handleToggle}  // Trigger handleToggle on hover
      onMouseLeave={handleToggle}
      className={`absolute  z-50 bg-[#000000]  transition-all delay-200 duration-300 flex  ${isOpen ? 'w-62' : 'lg:w-20 '} lg:overflow-scroll flex-shrink-0  text-gray-800 h-screen p-3 lg:p-5 hide-scrollbar`}
    >
      <div className="flex flex-col h-full">
        <div className={`mt-16 flex flex-col gap-1 transition-opacity duration-300`}>
          <motion.div whileHover={{ x: 5 }} onClick={handleClick}>
            <Link to="/">
              <motion.div
                className={`flex items-center p-2 gap-3 my-2 text-lg rounded-lg transition-colors mb-2  ${Location.pathname==="/"? "border border-white" :""}`}
              >
                <HiMiniComputerDesktop size={24} className="text-white"/>
                <div className={`flex justify-between items-center w-full ${isOpen ? "" : "hidden"}`}>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        className='whitespace-nowrap text-white'
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                      >
                      Dashboard
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </Link>
          </motion.div>
          <motion.div whileHover={{ x: 5 }}  onClick={handleClick}>
            <Link to="/user">
              <motion.div
                className={`flex items-center p-2 gap-3 my-2 text-lg rounded-lg transition-colors mb-2  ${Location.pathname==="/user"? "border border-white" :""}`}
              >
                <HiUserAdd size={24} className="text-white"/>
                <div className={`flex justify-between items-center w-full ${isOpen ? "" : "hidden"}`}>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        className='whitespace-nowrap text-white'
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                      >
                     User Management
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </Link>
          </motion.div>
          <motion.div whileHover={{ x: 5 }}  onClick={handleClick}>
            <Link to="/category">
              <motion.div
                className={`flex items-center p-2 gap-3 my-2 text-lg rounded-lg transition-colors mb-2  ${Location.pathname==="/category"? "border border-white" :""}`}
              >
                <HiOutlineViewGrid size={24} className="text-white"/>
                <div className={`flex justify-between items-center w-full ${isOpen ? "" : "hidden"}`}>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        className='whitespace-nowrap text-white'
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                      >
                     Category
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </Link>
          </motion.div>
          <motion.div whileHover={{ x: 5 }}  onClick={handleClick}>
            <Link to="/brand">
              <motion.div
                className={`flex items-center p-2 gap-3 my-2 text-lg rounded-lg transition-colors mb-2  ${Location.pathname==="/brand"? "border border-white" :""}`}
              >
                <HiOutlineBriefcase size={24} className="text-white"/>
                <div className={`flex justify-between items-center w-full ${isOpen ? "" : "hidden"}`}>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        className='whitespace-nowrap text-white'
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                      >
                      Brand
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </Link>
          </motion.div>
          <motion.div whileHover={{ x: 5 }}  onClick={handleClick}>
            <Link to="/task">
              <motion.div
                className={`flex items-center p-2 gap-3 my-2 text-lg rounded-lg transition-colors mb-2  ${Location.pathname==="/task" ||Location.pathname==="/detail" || Location.pathname==="/task/detail"? "border border-white" :""}`}
              >
                <RiCalendarScheduleLine size={24} className="text-white"/>
                <div className={`flex justify-between items-center w-full ${isOpen ? "" : "hidden"}`}>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        className='whitespace-nowrap text-white'
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                      >
                     Task
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </Link>
          </motion.div>
          <motion.div whileHover={{ x: 5 }}  onClick={handleClick}>
            <Link to="/plan">
              <motion.div
                className={`flex items-center p-2 gap-3 my-2 text-lg rounded-lg transition-colors mb-2  ${Location.pathname==="/plan/detail"||Location.pathname==="/plan"? "border border-white" :""}`}
              >
                <FaListCheck size={24} className="text-white"/>
                <div className={`flex justify-between items-center w-full ${isOpen ? "" : "hidden"}`}>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        className='whitespace-nowrap text-white'
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                      >
                     Plan
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </Link>
          </motion.div>
          <motion.div whileHover={{ x: 5 }}  onClick={handleClick}>
            <Link to="/media">
              <motion.div
                className={`flex items-center p-2 gap-3 my-2 text-lg rounded-lg transition-colors mb-2  ${Location.pathname==="/media/detail"||Location.pathname==="/media"? "border border-white" :""}`}
              >
                <IoMegaphoneOutline size={24} className="text-white"/>
                <div className={`flex justify-between items-center w-full ${isOpen ? "" : "hidden"}`}>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        className='whitespace-nowrap text-white'
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                      >
                    Media Buyer
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </Link>
          </motion.div>
          <motion.div whileHover={{ x: 5 }}  onClick={handleClick}>
            <Link to="/calendar">
              <motion.div
                className={`flex items-center p-2 gap-3 my-2 text-lg rounded-lg transition-colors mb-2  ${Location.pathname==="/calendar/headline"||Location.pathname==="/calendar/design"||Location.pathname==="/calendar"||Location.pathname==="/calendar/content"? "border border-white" :""}`}
              >
                <HiOutlineClock size={24} className="text-white"/>
                <div className={`flex justify-between items-center w-full ${isOpen ? "" : "hidden"}`}>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        className='whitespace-nowrap text-white'
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                      >
                   Content Calendar
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </Link>
          </motion.div>
          <motion.div whileHover={{ x: 5 }}  onClick={handleClick}>
            <Link to="/report">
              <motion.div
                className={`flex items-center p-2 gap-3 my-2 text-lg rounded-lg transition-colors mb-2  ${Location.pathname==="/report"||Location.pathname==="/report/detail"? "border border-white" :""}`}
              >
                <HiOutlineDocumentText size={24} className="text-white"/>
                <div className={`flex justify-between items-center w-full ${isOpen ? "" : "hidden"}`}>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        className='whitespace-nowrap text-white'
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                      >
                  Report
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </Link>
          </motion.div>
          <motion.div whileHover={{ x: 5 }}  onClick={handleClick}>
            <Link to="/history">
              <motion.div
                className={`flex items-center p-2 gap-3 my-2 text-lg rounded-lg transition-colors mb-2  ${Location.pathname==="/history"||Location.pathname==="/history/detail"? "border border-white" :""}`}
              >
                <MdOutlineWorkHistory size={24} className="text-white"/>
                <div className={`flex justify-between items-center w-full ${isOpen ? "" : "hidden"}`}>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        className='whitespace-nowrap text-white'
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                      >
                     History
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </Link>
          </motion.div>
          <div className='h-[100px]'></div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
