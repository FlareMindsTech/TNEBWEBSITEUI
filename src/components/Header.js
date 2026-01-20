import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import WireSparkBackground from './WireSparkBackground';
import logo from '../assets/tnebea_logo_cropped2.png';
import { SidebarContext } from '../context/SidebarContext';

const Header = () => {
  const { isSidebarOpen } = useContext(SidebarContext);
  const [currentTime, setCurrentTime] = useState('');
  const [headerSearch, setHeaderSearch] = useState('');

  // Update current time
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const day = days[now.getDay()];
      const date = now.getDate();
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');

      setCurrentTime(`${day}, ${date}-${month}-${year}, ${hours}:${minutes}:${seconds}`);
    };

    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleHeaderSearchSubmit = (e) => {
    e.preventDefault();
    if (!headerSearch.trim()) return;
  };

  const handleHeaderSearchClear = () => setHeaderSearch('');

  return (
    <>
      {/* Top Carousel with Sentences */}
      <motion.div 
        className="sentence-carousel"
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isSidebarOpen ? 0 : 1, 
          y: isSidebarOpen ? -20 : 0,
          display: isSidebarOpen ? 'none' : 'block'
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="sentence-track">
          {[
            "Welcome to Tamilnadu Electricity Board Engineers Association",
            "Serving Engineers Since 1946",
            "Powering Tamil Nadu's Progress",
            "Engineering Excellence in Electricity"
          ].concat([
            "Welcome to Tamilnadu Electricity Board Engineers Association",
            "Serving Engineers Since 1946",
            "Powering Tamil Nadu's Progress",
            "Engineering Excellence in Electricity"
          ]).map((sentence, index) => (
            <motion.div 
              key={index} 
              className="sentence-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 8px rgba(255,255,255,0.8)",
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="circular-icon"
                animate={{ 
                  rotate: [0, 360],
                  boxShadow: [
                    "0 0 10px rgba(72, 169, 230, 0.5)",
                    "0 0 20px rgba(27, 91, 175, 0.8)",
                    "0 0 10px rgba(72, 169, 230, 0.5)"
                  ]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <img src={logo} alt="TNEBEA Icon" />
              </motion.div>
              <motion.span 
                className="sentence-text"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                {sentence}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </motion.div>

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
        <WireSparkBackground />
        <div className="container-fluid" style={{ position: 'relative', zIndex: 1 }}>
          <div className="row align-items-center py-2">
            {/* Logo and Title */}
            <div className="col-md-8 col-lg-9">
              <div className="d-flex align-items-center">
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
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
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
                          "drop-shadow(0 0 15px rgba(72, 169, 230, 0.6))",
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

            {/* Search and Time */}
            <motion.div 
              className="col-md-4 col-lg-3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="header-right">
                <motion.form 
                  className="search-form mb-2"
                  onSubmit={handleHeaderSearchSubmit}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  <motion.div 
                    className="input-group"
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      background: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '25px',
                      padding: '8px 16px',
                      border: '2px solid rgba(27, 91, 175, 0.2)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.3s ease'
                    }}
                    whileHover={{
                      boxShadow: '0 6px 20px rgba(27, 91, 175, 0.15)',
                      borderColor: 'rgba(27, 91, 175, 0.4)',
                      y: -2
                    }}
                    whileFocus={{
                      boxShadow: '0 8px 25px rgba(27, 91, 175, 0.25)',
                      borderColor: '#1b5baf'
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <FaSearch style={{ color: '#1b5baf', fontSize: '14px', marginRight: '10px' }} />
                    </motion.div>
                    <motion.input
                      type="text"
                      className="form-control"
                      placeholder="Search resources..."
                      value={headerSearch}
                      onChange={(e) => setHeaderSearch(e.target.value)}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        outline: 'none',
                        fontSize: '14px',
                        flex: 1,
                        padding: 0,
                        boxShadow: 'none',
                        color: '#333'
                      }}
                      whileFocus={{
                        scale: 1.01,
                        transition: { duration: 0.2 }
                      }}
                    />
                    {headerSearch && (
                      <motion.button
                        type="button"
                        onClick={handleHeaderSearchClear}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          color: '#999',
                          marginLeft: '8px'
                        }}
                      >
                        <FaTimes style={{ fontSize: '12px' }} />
                      </motion.button>
                    )}
                  </motion.div>
                </motion.form>
                <motion.div 
                  className="current-time time-fancy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <motion.span
                    className="clock-emoji"
                    animate={{ scale: [1, 1.2, 0.9, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ display: 'inline-block', marginRight: 8 }}
                  >
                    ⏳
                  </motion.span>
                  <motion.span
                    className="time-text"
                    key={currentTime}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ fontWeight: 700, fontSize: '1.05rem', color: '#1b5baf', letterSpacing: '0.5px', background: 'none', border: 'none', padding: 0 }}
                  >
                    {currentTime}
                  </motion.span>
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
