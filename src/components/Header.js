import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import SearchInput from './SearchInput';
import logo from '../assets/tnebea_logo_cropped2.png';
import { SidebarContext } from '../context/SidebarContext';
import "bootstrap/dist/css/bootstrap.min.css";
const Header = () => {
  const { isSidebarOpen } = useContext(SidebarContext);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsive search
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update current time and date
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const day = days[now.getDay()];
      const date = now.getDate();
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      
      // Format date
      setCurrentDate(`${day}, ${date} ${month} ${year}`);
      
      // Convert to 12-hour format for time
      let hours = now.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      
      setCurrentTime(`${hours}:${minutes}:${seconds} ${ampm}`);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);



  return (
    <>
      {/* Main Header */}
      <motion.header 
        className="main-header" 
        style={{ position: 'relative' }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isSidebarOpen ? 0 : 1,
          height: isSidebarOpen ? 0 : 'auto',
          overflow: isSidebarOpen ? 'hidden' : 'visible',
          marginBottom: isSidebarOpen ? 0 : 'auto'
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="container-fluid" style={{ position: 'relative', zIndex: 1 }}>
          <div className="row align-items-stretch py-2">
            {/* Logo and Title */}
            <div className="col-12 col-md-8 col-lg-9 mb-2 mb-md-0">
              <div className="header-left d-flex align-items-center h-100">
                  <Link to="/">
                    <motion.img
                      src={logo}
                      alt="TNEBEA Logo"
                      className="header-logo"
                      animate={{
                        filter: [
                          "drop-shadow(0 0 8px rgba(27, 91, 175, 0.3))",
                          "drop-shadow(0 0 12px rgba(72, 169, 230, 0.5))",
                          "drop-shadow(0 0 8px rgba(27, 91, 175, 0.3))"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </Link>
                <motion.div 
                  className="header-text header-text-centered" 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.h1 
                    className="mb-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    Tamilnadu Electricity Board | Engineers Association
                  </motion.h1>
                  <motion.p 
                    className="text-secondary sub-heading mb-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    The association was formed &amp; registered in 1946.
                  </motion.p>
                </motion.div>
              </div>
            </div>

            {/* Date Time and Search */}
            <motion.div 
              className="col-12 col-md-4 col-lg-3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="header-right">
                {/* Date and Time Display */}
                <motion.div 
                  className="datetime-display"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >

                  
                  {/* Date */}
                  <div className="datetime-row fw-bold">
                    <FaCalendarAlt className="datetime-icon fw-bold" />
                    <span className="datetime-text fw-bold">
                      {currentDate}
                    </span>
                  </div>
                  
                  {/* Time */}
                  <div className="datetime-row fw-bold">
                    <FaClock className="datetime-icon fw-bold" />
                    <span className="datetime-time fw-bold">
                      {currentTime}
                    </span>
                  </div>
                </motion.div>

                {/* Search Input */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <SearchInput />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Navigation */}
      <Navbar />
    </>
  );
};

export default Header;