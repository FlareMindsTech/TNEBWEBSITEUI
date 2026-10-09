import React, { useState, useContext, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaClipboardList, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import SearchInput from './SearchInput';
import logo from '../assets/tnebea_logo_cropped2.png';
import { SidebarContext } from '../context/SidebarContext';
import { isAuthenticated } from '../api';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Header = () => {
  const { isSidebarOpen } = useContext(SidebarContext);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close user menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [userMenuOpen]);

  const userDropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.15 } }
  };

  return (
    <>
      {/* Main Header */}
      <motion.header
        className="main-header"
        style={{ position: 'relative', zIndex: 1200 }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: isSidebarOpen ? 0 : 1,
          height: isSidebarOpen ? 0 : 'auto',
          overflow: isSidebarOpen ? 'hidden' : 'visible',
          marginBottom: isSidebarOpen ? 0 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="container-fluid px-3 px-lg-4" style={{ position: 'relative', zIndex: 1 }}>
          <div className="header-grid-layout">
            
            {/* Left: Emblem Logo */}
            <div className="header-grid-left">
              <Link to="/">
                <motion.img
                  src={logo}
                  alt="TNEBEA Logo"
                  className="header-logo-emblem"
                  animate={{
                    filter: [
                      "drop-shadow(0 0 4px rgba(7, 41, 88, 0.2))",
                      "drop-shadow(0 0 8px rgba(74, 144, 226, 0.4))",
                      "drop-shadow(0 0 4px rgba(7, 41, 88, 0.2))"
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </Link>
            </div>

            {/* Center: Exact 5-Tier Brand Stack */}
            <motion.div
              className="header-grid-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Tier 1: SINCE 1946 Badge */}
              <div className="header-since-badge">
                <span className="gold-taper-line gold-taper-left"></span>
                <span className="gold-bead"></span>
                <span className="since-badge-text">SINCE 1946</span>
                <span className="gold-bead"></span>
                <span className="gold-taper-line gold-taper-right"></span>
              </div>

              {/* Tier 2: Main Title */}
              <h1 className="header-brand-title">TAMILNADU ELECTRICITY BOARD</h1>

              {/* Tier 3: Association Subtitle with Gold Lines & Beads */}
              <div className="header-brand-subtitle-wrapper">
                <span className="gold-taper-line gold-taper-left"></span>
                <span className="gold-bead"></span>
                <span className="header-brand-subtitle">ENGINEERS’ ASSOCIATION</span>
                <span className="gold-bead"></span>
                <span className="gold-taper-line gold-taper-right"></span>
              </div>

              {/* Tier 4: Lightning Spark Divider */}
              <div className="header-spark-divider">
                <span className="spark-line spark-line-left"></span>
                <span className="spark-icon">⚡</span>
                <span className="spark-line spark-line-right"></span>
              </div>

              {/* Tier 5: Tagline */}
              <p className="header-tagline mb-0">
                The association was formed &amp; registered in 1946.
              </p>
            </motion.div>

            {/* Right: Search & Profile Icon (Desktop Only - on Mobile it moves to Navbar) */}
            <motion.div
              className="header-grid-right d-none d-lg-flex"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="header-right-actions d-flex align-items-center gap-3">
                <div className="header-search-wrapper">
                  <SearchInput />
                </div>

                {/* User Profile Icon */}
                <div className="user-menu-container" ref={userMenuRef}>
                  <motion.div 
                    className="user-profile-icon"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ boxShadow: userMenuOpen ? "0 0 20px rgba(27, 91, 175, 0.5)" : "0 4px 12px rgba(0, 0, 0, 0.1)" }}
                  >
                    <FaUser />
                    <motion.div className="pulse-dot" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
                  </motion.div>
                  
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div 
                        variants={userDropdownVariants} 
                        initial="hidden" 
                        animate="visible" 
                        exit="exit" 
                        className="user-profile-floating-dropdown" 
                        onMouseLeave={() => setUserMenuOpen(false)}
                      >
                        <div className="user-dropdown-cards-wrapper">
                          {/* Grievance */}
                          <Link 
                            className="user-dropdown-card" 
                            to="#" 
                            onClick={(e) => { 
                              e.preventDefault(); 
                              window.open('https://docs.google.com/forms/d/e/1FAIpQLSfv3I080h3YlwL_8Fmxzf55dnmRhxNPdbfItQmjxoSYHYjoyA/viewform?usp=publish-editor', '_blank'); 
                              setUserMenuOpen(false);
                            }} 
                          >
                            <div className="user-card-icon-circle">
                              <FaClipboardList />
                            </div>
                            <div className="user-card-divider"></div>
                            <div className="user-card-text">
                              <span className="user-card-title">Grievance</span>
                              <span className="user-card-subtitle">Feedback &amp; Complaints</span>
                            </div>
                            <div className="user-card-arrow-wedge">
                              <FaChevronRight />
                            </div>
                          </Link>

                          {/* Login / Logout */}
                          {isAuthenticated() ? (
                            <Link 
                              className="user-dropdown-card" 
                              to="/" 
                              onClick={() => { 
                                localStorage.removeItem('authToken'); 
                                localStorage.removeItem('userData'); 
                                window.location.reload(); 
                              }} 
                            >
                              <div className="user-card-icon-circle">
                                <FaUser />
                              </div>
                              <div className="user-card-divider"></div>
                              <div className="user-card-text">
                                <span className="user-card-title">Logout</span>
                                <span className="user-card-subtitle">Sign Out of Account</span>
                              </div>
                              <div className="user-card-arrow-wedge">
                                <FaChevronRight />
                              </div>
                            </Link>
                          ) : (
                            <Link 
                              className="user-dropdown-card" 
                              to="/login" 
                              onClick={() => setUserMenuOpen(false)} 
                            >
                              <div className="user-card-icon-circle">
                                <FaUser />
                              </div>
                              <div className="user-card-divider"></div>
                              <div className="user-card-text">
                                <span className="user-card-title">Login</span>
                                <span className="user-card-subtitle">Member Portal Access</span>
                              </div>
                              <div className="user-card-arrow-wedge">
                                <FaChevronRight />
                              </div>
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
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