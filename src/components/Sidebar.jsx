import React, { useState } from "react";
import { HiOutlineViewGrid, HiUserAdd,HiOutlineBriefcase, HiPencilAlt, HiClock, HiOutlineClock, HiDocumentDownload, HiOutlineDocumentText, HiChevronRight  } from 'react-icons/hi';
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HiDocumentCheck, HiDocumentText, HiMiniComputerDesktop, HiOutlineDocumentCheck } from "react-icons/hi2";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { FaListCheck } from "react-icons/fa6";
import { IoMegaphoneOutline } from "react-icons/io5";
import { useMediaQuery } from '@mui/material';
import { MdOutlineWorkHistory } from "react-icons/md";

const SideBar = ({ isOpen, setIsOpen,toggleHidden }) => {
   const role=localStorage.getItem("userRole")
  const Location = useLocation();
  const isTabletOrSmaller = useMediaQuery('(max-width: 420px)');
  const [openIndex, setOpenIndex] = useState(null); // Track which sub-item is open

  const handleToggle = (index) => {
 
    setOpenIndex(openIndex === index ? null : index); // Toggle the open index
  setIsOpen(true)


};

  const handleClick=()=>{
      if(isTabletOrSmaller){
        toggleHidden(false),
      setIsOpen(false)
      }else{
        setIsOpen(false)
      }
  }

  return (
    <div
     
      className={`absolute  z-50 bg-[#000000] ${role !=="admin" && "mt-4"}  transition-all delay-200 duration-300 flex  ${isOpen ? 'w-62' : 'lg:w-20 '} lg:overflow-scroll flex-shrink-0  text-gray-800 h-screen p-3 lg:p-5 hide-scrollbar`}
    >
      <div className="flex flex-col h-full">
        <div className={`mt-16 flex flex-col gap-1 transition-opacity duration-300`}>
         {
          role==="admin" && (
            <>
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
          </motion.div></>
          )
         }
          {/* <motion.div whileHover={{ x: 5 }}  onClick={handleClick}>
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
          </motion.div> */}
          <motion.div  whileHover={{ x: 5 }} >
           
           <motion.div onClick={()=>handleToggle(1)}  className={`cursor-pointer flex items-center p-2 gap-3 my-2 text-lg rounded-lg transition-colors mb-2  ${Location.pathname==="/task" ||Location.pathname==="/detail" || Location.pathname==="/task/detail" || Location.pathname==="/content"? "border border-white" :""}`}>
           <RiCalendarScheduleLine size={24} className="text-white"/>
             <div className={`flex justify-between items-center w-full ${isOpen ? "" : "hidden"}`} >
               <AnimatePresence>
                 {isOpen && (
                   <motion.span 
                     className='whitespace-nowrap text-white'
                     initial={{ opacity: 0, width: 0 }} 
                     animate={{ opacity: 1, width: "auto" }}
                     exit={{ opacity: 0, width: 0 }}
                     transition={{ duration: 0.2, delay: 0.2 }}>
                    Task
                   </motion.span>
                 )}
               </AnimatePresence>
             
                 <motion.div className={`ml-auto transition-transform duration-300 ${openIndex===1? 'rotate-90' : ''} ${!isOpen && "hidden"}`}>
                   <HiChevronRight size={20} className="text-white"/>
                 </motion.div>
           
             </div>
           </motion.div>
        

         <AnimatePresence>
           {isOpen && openIndex===1 &&  (
             <motion.div
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: "auto" }}
               exit={{ opacity: 0, height: 0 }}
               transition={{ duration: 0.2 }}
             >
            <Link to="/task">
                   <motion.div whileHover={{ x: 5 }}
                       onClick={()=>{setIsOpen(false)}} className={`flex text-gray-100 items-center pl-8 p-2 gap-3 my-2 rounded-lg transition-colors ${Location.pathname==="/task"? "text-white font-bold" :"hover:bg-gray-200 hover:text-black"}`}>
                     <AnimatePresence>
                       {isOpen && (
                         <motion.span  
                           className='whitespace-nowrap'
                           initial={{ opacity: 0, width: 0 }} 
                           animate={{ opacity: 1, width: "auto" }}
                           exit={{ opacity: 0, width: 0 }}
                           transition={{ duration: 0.2, delay: 0.2 }}>
                          Headline
                         </motion.span>
                       )}
                     </AnimatePresence>
                   </motion.div>
             </Link>
            
            <Link to="/content">
                   <motion.div whileHover={{ x: 5 }}
                    onClick={()=>{setIsOpen(false)}} className={`flex text-gray-100 items-center pl-8 p-2 gap-3 my-2 rounded-lg transition-colors ${Location.pathname==="/content"? "text-white font-bold" :"hover:bg-gray-200 hover:text-black"}`}>
                     <AnimatePresence>
                       {isOpen && (
                         <motion.span  
                           className='whitespace-nowrap'
                           initial={{ opacity: 0, width: 0 }} 
                           animate={{ opacity: 1, width: "auto" }}
                           exit={{ opacity: 0, width: 0 }}
                           transition={{ duration: 0.2, delay: 0.2 }}>
                      Content
                         </motion.span>
                       )}
                     </AnimatePresence>
                   </motion.div>
             </Link>
            
          
        
             </motion.div>
           )}
         </AnimatePresence>
        </motion.div>
     
        {
          role=== "admin" && (
            <>
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
            </>
          )
        }
          {/* <motion.div whileHover={{ x: 5 }}  onClick={handleClick}>
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
          </motion.div> */}
          <motion.div  whileHover={{ x: 5 }} >
           
           <motion.div onClick={()=>handleToggle(2)}  className={`cursor-pointer flex items-center p-2 gap-3 my-2 text-lg rounded-lg transition-colors mb-2  ${Location.pathname==="/calendar/headline"||Location.pathname==="/calendarContent" || Location.pathname==="/calendarPlan" || Location.pathname==="/calendarContent/detail"||Location.pathname==="/calendar"||Location.pathname==="/calendar/content"? "border border-white" :""}`}>
           <HiOutlineClock size={24} className="text-white"/>
             <div className={`flex justify-between items-center w-full ${isOpen ? "" : "hidden"}`} >
               <AnimatePresence>
                 {isOpen && (
                   <motion.span 
                     className='whitespace-nowrap text-white'
                     initial={{ opacity: 0, width: 0 }} 
                     animate={{ opacity: 1, width: "auto" }}
                     exit={{ opacity: 0, width: 0 }}
                     transition={{ duration: 0.2, delay: 0.2 }}>
                  Content Calendar
                   </motion.span>
                 )}
               </AnimatePresence>
             
                 <motion.div className={`ml-auto transition-transform duration-300 ${openIndex===2? 'rotate-90' : ''} ${!isOpen && "hidden"}`}>
                   <HiChevronRight size={20} className="text-white"/>
                 </motion.div>
           
             </div>
           </motion.div>
        

         <AnimatePresence>
           {isOpen && openIndex===2 &&  (
             <motion.div
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: "auto" }}
               exit={{ opacity: 0, height: 0 }}
               transition={{ duration: 0.2 }}
             >
            <Link to="/calendar">
                   <motion.div whileHover={{ x: 5 }}
                       onClick={()=>{setIsOpen(false)}} className={`flex text-gray-100 items-center pl-8 p-2 gap-3 my-2 rounded-lg transition-colors ${Location.pathname==="/calendar"? "text-white font-bold" :"hover:bg-gray-200 hover:text-black"}`}>
                     <AnimatePresence>
                       {isOpen && (
                         <motion.span  
                           className='whitespace-nowrap'
                           initial={{ opacity: 0, width: 0 }} 
                           animate={{ opacity: 1, width: "auto" }}
                           exit={{ opacity: 0, width: 0 }}
                           transition={{ duration: 0.2, delay: 0.2 }}>
                          Headline
                         </motion.span>
                       )}
                     </AnimatePresence>
                   </motion.div>
             </Link>
            
            {/* <Link to="/calendarContent">
                   <motion.div whileHover={{ x: 5 }}
                    onClick={()=>{setIsOpen(false)}} className={`flex text-gray-100 items-center pl-8 p-2 gap-3 my-2 rounded-lg transition-colors ${Location.pathname==="/content"? "text-white font-bold" :"hover:bg-gray-200 hover:text-black"}`}>
                     <AnimatePresence>
                       {isOpen && (
                         <motion.span  
                           className='whitespace-nowrap'
                           initial={{ opacity: 0, width: 0 }} 
                           animate={{ opacity: 1, width: "auto" }}
                           exit={{ opacity: 0, width: 0 }}
                           transition={{ duration: 0.2, delay: 0.2 }}>
                      Content
                         </motion.span>
                       )}
                     </AnimatePresence>
                   </motion.div>
             </Link> */}
            
             <Link to="/calendarPlan">
                   <motion.div whileHover={{ x: 5 }}
                    onClick={()=>{setIsOpen(false)}} className={`flex text-gray-100 items-center pl-8 p-2 gap-3 my-2 rounded-lg transition-colors ${Location.pathname==="/calendarPlan"? "text-white font-bold" :"hover:bg-gray-200 hover:text-black"}`}>
                     <AnimatePresence>
                       {isOpen && (
                         <motion.span  
                           className='whitespace-nowrap'
                           initial={{ opacity: 0, width: 0 }} 
                           animate={{ opacity: 1, width: "auto" }}
                           exit={{ opacity: 0, width: 0 }}
                           transition={{ duration: 0.2, delay: 0.2 }}>
                     Content Calendar
                         </motion.span>
                       )}
                     </AnimatePresence>
                   </motion.div>
             </Link>
        
             </motion.div>
           )}
         </AnimatePresence>
        </motion.div>
         {
          role==="admin" && (
            <>
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
            </>
          )
         }
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
