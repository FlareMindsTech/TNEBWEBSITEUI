import React, { useState, useEffect, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import logo from '../assets/tnebea_logo_cropped2.png';
import { SidebarContext } from '../context/SidebarContext';

const Header = () => {
  const { isSidebarOpen } = useContext(SidebarContext);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [headerSearch, setHeaderSearch] = useState('');
  const [searchExpanded, setSearchExpanded] = useState(false);
  const searchRef = useRef(null);
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

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleHeaderSearchSubmit = (e) => {
    e.preventDefault();
    if (!headerSearch.trim()) return;
    // Handle search logic here
    console.log('Searching for:', headerSearch);
  };

  const handleHeaderSearchClear = () => {
    setHeaderSearch('');
    setSearchExpanded(false);
  };

  const handleSearchIconClick = () => {
    setSearchExpanded(true);
  };

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
              <div className="d-flex align-items-center h-100" style={{ marginLeft: '30px' }}>
                <motion.div 
                  className="logo-container mr-3"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: [0, -3, 3, 0],
                    transition: { duration: 0.3 }
                  }}
                >
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
                </motion.div>
                <motion.div 
                  className="header-text" 
                  style={{ color: '#1b5baf' }}
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
              <div className="header-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', height: '100%', paddingRight: '20px' }}>
                {/* Date and Time Display */}
                <motion.div 
                  className="datetime-display"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    background: 'transparent',
                    borderRadius: '10px',
                    padding: '0',
                    border: 'none',
                    boxShadow: 'none',
                    minWidth: '160px',
                    maxWidth: '180px',
                    flex: 1,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >

                  
                  {/* Date */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <FaCalendarAlt style={{ color: '#d70f18', fontSize: '11px', flexShrink: 0 }} />
                    <span style={{ 
                      fontWeight: 500, 
                      color: '#1b5baf', 
                      fontSize: '10px',
                      letterSpacing: '0.2px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {currentDate}
                    </span>
                  </div>
                  
                  {/* Time */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaClock style={{ color: '#d70f18', fontSize: '11px', flexShrink: 0 }} />
                    <span style={{ 
                      fontWeight: 700, 
                      color: '#1b5baf', 
                      fontSize: '12px',
                      letterSpacing: '0.5px',
                      fontFamily: 'monospace'
                    }}>
                      {currentTime}
                    </span>
                  </div>
                </motion.div>

                {/* Expandable Search */}
                <motion.div
                  ref={searchRef}
                  className="search-container"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'flex-end'
                  }}
                >
                  <AnimatePresence>
                    {!searchExpanded ? (
                      <motion.button
                        key="search-icon"
                        onClick={handleSearchIconClick}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          borderRadius: '6px',
                          width: '22px',
                          height: '22px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: 'none',
                          color: '#d70f18'
                        }}
                      >
                        <FaSearch style={{ fontSize: '14px' }} />
                      </motion.button>
                    ) : (
                      <motion.form
                        key="search-form"
                        onSubmit={handleHeaderSearchSubmit}
                        initial={{ 
                          width: '220px',
                          opacity: 0,
                          y: -4
                        }}
                        animate={{ 
                          width: '220px',
                          opacity: 1,
                          y: 0
                        }}
                        exit={{ 
                          width: '220px',
                          opacity: 0,
                          y: -4
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          background: 'transparent',
                          borderRadius: '6px',
                          padding: '0',
                          border: 'none',
                          boxShadow: 'none',
                          gap: '6px',
                          position: 'relative'
                        }}
                      >
                        <FaSearch style={{ 
                          color: '#d70f18', 
                          fontSize: '12px',
                          flexShrink: 0 
                        }} />
                        
                        {/* Search input */}
                        <input
                          type="text"
                          autoFocus
                          placeholder="Search..."
                          value={headerSearch}
                          onChange={(e) => setHeaderSearch(e.target.value)}
                          style={{
                            border: 'none',
                            background: 'transparent',
                            outline: 'none',
                            fontSize: '12px',
                            flex: 1,
                            padding: '0',
                            color: '#1a1a1a',
                            minWidth: 0,
                            fontFamily: 'inherit',
                            fontWeight: 500
                          }}
                        />
                        
                        {/* Clear button */}
                        {headerSearch && (
                          <motion.button
                            type="button"
                            onClick={handleHeaderSearchClear}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '0',
                              display: 'flex',
                              alignItems: 'center',
                              color: '#d70f18',
                              flexShrink: 0
                            }}
                          >
                            <FaTimes style={{ fontSize: '11px' }} />
                          </motion.button>
                        )}
                      </motion.form>
                    )}
                  </AnimatePresence>
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