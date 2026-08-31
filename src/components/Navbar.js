import React, { useState, useRef, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUser, FaTimes, FaCaretDown, FaBars,
  FaHome, FaUsers, FaInfoCircle, FaCog,
  FaMobile, FaBook, FaLink, FaFileAlt,
  FaPhone, FaGavel, FaFilePdf, FaUserTie,
  FaTrophy, FaClipboardList, FaQuestionCircle,
  FaChartBar, FaBookOpen, FaBell,
  FaLandmark, FaImages, FaRegNewspaper,
  FaHandPaper, FaUserPlus, FaCaretRight, FaChevronRight, FaHotel,
  FaDesktop, FaEdit, FaEnvelope, FaBuilding
} from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SearchInput from './SearchInput';
import "./Navbar.css";
// import Logo from "../assets/tnebea_logo_cropped2.png";
import { SidebarContext } from '../context/SidebarContext';
import { isAuthenticated, getUserData } from "../api";

const Navbar = () => {
  const { isSidebarOpen, openSidebar, closeSidebar } = useContext(SidebarContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const closeTimeoutRef = useRef(null);
  const sidebarRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close user menu on outside click
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

  // Close dropdowns on route changes
  useEffect(() => {
    setUserMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  // Handle click outside sidebar to close it in mobile view
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if sidebar is open and click was outside the sidebar
      if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        // Check if the click was on the navbar-toggler button (which should open sidebar, not close)
        const togglerButton = document.querySelector('.navbar-toggler');
        if (togglerButton && !togglerButton.contains(event.target)) {
          closeSidebar();
          setOpenDropdown(null);
        }
      }
    };

    // Add event listener when sidebar is open
    if (isSidebarOpen) {
      // Small delay to prevent immediate closing when just opened
      const timer = setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timer);
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [isSidebarOpen, closeSidebar]);

  // Handle quick links on mobile - navigate in same tab
  const handleMobileQuickLinkClick = (link) => {
    // Remove hash prefix if present
    const path = link.replace('/#', '');
    navigate(path);
    closeSidebar();
  };

  const handleDropdownOpen = (dropdownName) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setOpenDropdown(dropdownName);
  };

  const handleDropdownClose = () => {
    closeTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 200);
  };

  const closeAllMenus = () => {
    closeSidebar();
    setOpenDropdown(null);
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.15 }
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
        staggerChildren: 0.05,
        when: "beforeChildren"
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -10, opacity: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  const userDropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.15 } }
  };

  return (
    <motion.nav
      className="main-navbar navbar navbar-expand-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container-fluid px-3 px-lg-4 d-flex align-items-center justify-content-between">
        {/* Mobile Toggle Button */}
        <motion.button
          className="navbar-toggler"
          type="button"
          onClick={() => openSidebar()}
          whileTap={{ scale: 0.9 }}
        >
          {isSidebarOpen ? (
            <FaTimes className="navbar-toggler-icon" />
          ) : (
            <FaBars className="navbar-toggler-icon" />
          )}
        </motion.button>

        {/* Mobile Actions: Search and Profile Icon (Visible only on mobile/tablet screens < 992px) */}
        <div className="mobile-navbar-actions d-flex d-lg-none align-items-center gap-2" ref={userMenuRef}>
          <div className="mobile-nav-search-wrapper">
            <SearchInput placeholder="Search..." />
          </div>

          <div className="user-menu-container position-relative">
            <motion.div 
              className="user-profile-icon"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: userMenuOpen ? "0 0 20px rgba(223, 176, 100, 0.6)" : "0 2px 8px rgba(0, 0, 0, 0.25)" }}
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

        <AnimatePresence>
          {isSidebarOpen && (
            <React.Fragment>
              <motion.div
                className="mobile-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeAllMenus}
              />
              <motion.div
                className="mobile-sidebar"
                ref={sidebarRef}
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="sidebar-header">
                  <h6 className="mb-0">Menu</h6>
                  <motion.button
                    className="sidebar-close"
                    onClick={closeAllMenus}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTimes />
                  </motion.button>
                </div>

                <div className="sidebar-nav-container">
                  <nav className="sidebar-nav">
                    <ul className="navbar-nav flex-column">
                      <motion.li className="nav-item" variants={navItemVariants}>
                        <Link className="nav-link" to="/" onClick={closeAllMenus}>
                          <FaHome className="sidebar-icon" /> Home
                        </Link>
                      </motion.li>

                      <motion.li className="nav-item" variants={navItemVariants}>
                        <div
                          className="nav-link sidebar-toggle"
                          onClick={() => setOpenDropdown(openDropdown === 'about' ? null : 'about')}
                        >
                          <span><FaUsers className="sidebar-icon" /> About TNEBEA</span>
                          <motion.span
                            animate={{ rotate: openDropdown === 'about' ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <FaCaretDown />
                          </motion.span>
                        </div>
                        <AnimatePresence>
                          {(openDropdown === 'about' || openDropdown === 'about_tnebea') && (
                            <motion.div
                              className="sidebar-submenu"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Link className="sidebar-item" to="/about-tnebea" onClick={closeAllMenus}>
                                <FaInfoCircle className="sidebar-icon" /> About TNEBEA (80th Year)
                              </Link>
                              <Link className="sidebar-item" to="/cec" onClick={closeAllMenus}>
                                <FaUserTie className="sidebar-icon" /> CEC & EBF
                              </Link>
                              <Link className="sidebar-item" to="/regional" onClick={closeAllMenus}>
                                <FaUsers className="sidebar-icon" /> Regional Secretary
                              </Link>
                              <Link className="sidebar-item" to="/public-secretary" onClick={closeAllMenus}>
                                <FaUsers className="sidebar-icon" /> Branch Secretary
                              </Link>
                              <Link className="sidebar-item" to="/role-of-honour" onClick={closeAllMenus}>
                                <FaTrophy className="sidebar-icon" /> Roll Of Honour
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.li>

                      <motion.li className="nav-item" variants={navItemVariants}>
                        <div
                          className="nav-link sidebar-toggle"
                          onClick={() => setOpenDropdown(openDropdown === 'tnebInfo' ? null : 'tnebInfo')}
                        >
                          <span><FaInfoCircle className="sidebar-icon" /> General Info</span>
                          <motion.span
                            animate={{ rotate: openDropdown === 'tnebInfo' ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <FaCaretDown />
                          </motion.span>
                        </div>
                        <AnimatePresence>
                          {openDropdown === 'tnebInfo' && (
                            <motion.div
                              className="sidebar-submenu"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Link className="sidebar-item" to="/act-regulations" onClick={closeAllMenus}>
                                <FaGavel className="sidebar-icon" /> Act & Regulations
                              </Link>
                              <Link className="sidebar-item" to="/contributory-pension-scheme" onClick={closeAllMenus}>
                                <FaUserTie className="sidebar-icon" /> Pension Scheme (CPS)
                              </Link>
                              <Link className="sidebar-item" to="/distribution-related-instructions" onClick={closeAllMenus}>
                                <FaClipboardList className="sidebar-icon" /> Distribution Instructions
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.li>

                      <motion.li className="nav-item" variants={navItemVariants}>
                        <div
                          className="nav-link sidebar-toggle"
                          onClick={() => setOpenDropdown(openDropdown === 'tech' ? null : 'tech')}
                        >
                          <span><FaCog className="sidebar-icon" /> Technical</span>
                          <motion.span
                            animate={{ rotate: openDropdown === 'tech' ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <FaCaretDown />
                          </motion.span>
                        </div>
                        <AnimatePresence>
                          {openDropdown === 'tech' && (
                            <motion.div
                              className="sidebar-submenu"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Link className="sidebar-item" to="/technical-qa" onClick={closeAllMenus}>
                                <FaQuestionCircle className="sidebar-icon" /> Technical Q&A
                              </Link>
                              <Link className="sidebar-item" to="/technical-parameters" onClick={closeAllMenus}>
                                <FaChartBar className="sidebar-icon" /> Technical Parameters
                              </Link>
                              <Link className="sidebar-item" to="/technical-books-and-manuals" onClick={closeAllMenus}>
                                <FaBookOpen className="sidebar-icon" /> Books & Manuals
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.li>

                      <motion.li className="nav-item" variants={navItemVariants}>
                        <Link className="nav-link" to="/Minnagam" onClick={closeAllMenus}>
                          <FaBuilding className="sidebar-icon" /> Minnagam
                        </Link>
                      </motion.li>

                      <motion.li className="nav-item" variants={navItemVariants}>
                        <Link className="nav-link" to="/Minthiran" onClick={closeAllMenus}>
                          <FaBook className="sidebar-icon" /> e-Minthiran
                        </Link>
                      </motion.li>

                      <motion.li className="nav-item" variants={navItemVariants}>
                        <Link className="nav-link" to="/hand-book" onClick={closeAllMenus}>
                          <FaHandPaper className="sidebar-icon" /> Hand Book
                        </Link>
                      </motion.li>

                      {/* <motion.li className="nav-item" variants={navItemVariants}>
                        <Link className="nav-link" to="/news" onClick={closeAllMenus}>
                          📰 News
                        </Link>
                      </motion.li> */}

                      <motion.li className="nav-item" variants={navItemVariants}>
                        <div
                          className="nav-link sidebar-toggle"
                          onClick={() => setOpenDropdown(openDropdown === 'quickLinks' ? null : 'quickLinks')}
                        >
                          <span><FaLink className="sidebar-icon" /> Quick Links</span>
                          <motion.span
                            animate={{ rotate: openDropdown === 'quickLinks' ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <FaCaretDown />
                          </motion.span>
                        </div>
                        <AnimatePresence>
                          {openDropdown === 'quickLinks' && (
                            <motion.div
                              className="sidebar-submenu"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0' }}
                            >
                              <Link className="sidebar-item" to="/important-notices" onClick={closeAllMenus}>
                                <FaBell className="sidebar-icon" /> Important Notices
                              </Link>
                              {/* <a className="sidebar-item" href="https://www.tantransco.gov.in/" onClick={closeAllMenus}>
                                🔌 TANTRANSCO
                              </a> */}
                              <Link className="sidebar-item" to="/board-proceedings" onClick={closeAllMenus}>
                                <FaLandmark className="sidebar-icon" /> Board Proceedings
                              </Link>
                              <Link className="sidebar-item" to="/photo-gallery" onClick={closeAllMenus}>
                                <FaImages className="sidebar-icon" /> Photogallery
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.li>

                      <motion.li className="nav-item" variants={navItemVariants}>
                        <div
                          className="nav-link sidebar-toggle"
                          onClick={() => setOpenDropdown(openDropdown === 'enroll' ? null : 'enroll')}
                        >
                          <span><FaUserPlus className="sidebar-icon" /> Enroll</span>
                          <motion.span
                            animate={{ rotate: openDropdown === 'enroll' ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <FaCaretDown />
                          </motion.span>
                        </div>
                        <AnimatePresence>
                          {openDropdown === 'enroll' && (
                            <motion.div
                              className="sidebar-submenu"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <span className="sidebar-item disabled text-muted" style={{ paddingLeft: '45px', cursor: 'default' }}>
                                This page is under development
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.li>

                      <motion.li className="nav-item" variants={navItemVariants}>
                        <Link className="nav-link" to="/tnebea-forms" onClick={closeAllMenus}>
                          <FaFileAlt className="sidebar-icon" /> TNEBEA Forms
                        </Link>
                      </motion.li>

                      <motion.li className="nav-item" variants={navItemVariants}>
                        <Link className="nav-link" to="/contactus" onClick={closeAllMenus}>
                          <FaPhone className="sidebar-icon" /> Contact
                        </Link>
                      </motion.li>

                      {isAuthenticated() && (
                        <motion.li className="nav-item" variants={navItemVariants}>
                          <Link className="nav-link" to="/dashboard/minnagam" onClick={closeAllMenus}>
                            <FaChartBar className="sidebar-icon" /> Dashboard
                          </Link>
                        </motion.li>
                      )}
                    </ul>
                  </nav>
                </div>

                <div className="sidebar-footer">

                  <motion.div className="sidebar-auth-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button className="btn btn-light w-100" onClick={() => { window.open('https://docs.google.com/forms/d/e/1FAIpQLSfv3I080h3YlwL_8Fmxzf55dnmRhxNPdbfItQmjxoSYHYjoyA/viewform?usp=publish-editor', '_blank'); closeAllMenus(); }}>
                      <FaClipboardList className="me-2" />
                      Grievance Form
                    </button>
                  </motion.div>

                  {isAuthenticated() ? (
                    <motion.div className="sidebar-auth-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <button className="btn btn-light w-100" onClick={() => { localStorage.removeItem('authToken'); localStorage.removeItem('userData'); window.location.reload(); closeAllMenus(); }}>
                        <FaUser className="me-2" />
                        Logout
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div className="sidebar-auth-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <button className="btn btn-light w-100" onClick={() => { navigate('/login'); closeAllMenus(); }}>
                        <FaUser className="me-2" />
                        Login
                      </button>
                    </motion.div>
                  )}
                  {/* <motion.div className="sidebar-auth-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button className="btn btn-light w-100" onClick={() => { setAuthTab(''); setShowAuth(true); closeAllMenus(); }}>
                      <FaFileAlt className="me-2" />
                      Grievances
                    </button>
                  </motion.div> */}
                </div>
              </motion.div>
            </React.Fragment>
          )}
        </AnimatePresence>

        <motion.div
          className="collapse navbar-collapse d-none d-lg-flex"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ paddingRight: "1.0rem" }}
        >
          <ul className="navbar-nav align-items-center flex-grow-1">
            <motion.li className="nav-item" variants={navItemVariants}>
              <Link className={`nav-link nav-hover-effect ${location.pathname === '/' ? 'active-nav-link' : ''}`} to="/" onClick={closeAllMenus}>
                <FaHome className="nav-icon" /> Home
              </Link>
            </motion.li>

            {/* 1. About Dropdown */}
            <motion.li
              className="nav-item dropdown"
              variants={navItemVariants}
              onMouseEnter={() => handleDropdownOpen('about')}
              onMouseLeave={handleDropdownClose}
            >
              <span className={`nav-link d-flex align-items-center gap-1 cursor-pointer text-light ${openDropdown === 'about' ? 'active-dropdown-tab' : ''}`}>
                <FaUsers className="nav-icon" />
                About
                <motion.span animate={{ rotate: openDropdown === 'about' ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <FaCaretDown className="nav-caret" />
                </motion.span>
              </span>
              <AnimatePresence>
                {openDropdown === 'about' && (
                  <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="dropdown-menu modern-luxury-dropdown show">
                    <div className="dropdown-items-container">
                      <motion.div variants={itemVariants} className="dropdown-timeline-row">
                        <div className="dropdown-timeline-node">
                          <span className="dropdown-timeline-dot"></span>
                        </div>
                        <Link className="dropdown-luxury-item" to="/about-tnebea" onClick={closeAllMenus}>
                          <div className="dropdown-item-icon-box">
                            <FaInfoCircle />
                          </div>
                          <div className="dropdown-item-text-box">
                            <span className="dropdown-item-main-title">About TNEBEA</span>
                            <span className="dropdown-item-sub-title">80-Year Legacy &amp; Achievements</span>
                          </div>
                          <FaChevronRight className="dropdown-item-chevron" />
                        </Link>
                      </motion.div>

                      <motion.div variants={itemVariants} className="dropdown-timeline-row">
                        <div className="dropdown-timeline-node">
                          <span className="dropdown-timeline-dot"></span>
                        </div>
                        <Link className="dropdown-luxury-item" to="/cec" onClick={closeAllMenus}>
                          <div className="dropdown-item-icon-box">
                            <FaUserTie />
                          </div>
                          <div className="dropdown-item-text-box">
                            <span className="dropdown-item-main-title">CEC &amp; EBF</span>
                            <span className="dropdown-item-sub-title">Central &amp; Executive Bodies</span>
                          </div>
                          <FaChevronRight className="dropdown-item-chevron" />
                        </Link>
                      </motion.div>

                      <motion.div variants={itemVariants} className="dropdown-timeline-row">
                        <div className="dropdown-timeline-node">
                          <span className="dropdown-timeline-dot"></span>
                        </div>
                        <Link className="dropdown-luxury-item" to="/regional" onClick={closeAllMenus}>
                          <div className="dropdown-item-icon-box">
                            <FaUsers />
                          </div>
                          <div className="dropdown-item-text-box">
                            <span className="dropdown-item-main-title">Regional Secretary</span>
                            <span className="dropdown-item-sub-title">Regional Offices &amp; Officials</span>
                          </div>
                          <FaChevronRight className="dropdown-item-chevron" />
                        </Link>
                      </motion.div>

                      <motion.div variants={itemVariants} className="dropdown-timeline-row">
                        <div className="dropdown-timeline-node">
                          <span className="dropdown-timeline-dot"></span>
                        </div>
                        <Link className="dropdown-luxury-item" to="/public-secretary" onClick={closeAllMenus}>
                          <div className="dropdown-item-icon-box">
                            <FaUsers />
                          </div>
                          <div className="dropdown-item-text-box">
                            <span className="dropdown-item-main-title">Branch Secretary</span>
                            <span className="dropdown-item-sub-title">Branch Wise Details</span>
                          </div>
                          <FaChevronRight className="dropdown-item-chevron" />
                        </Link>
                      </motion.div>

                      <motion.div variants={itemVariants} className="dropdown-timeline-row">
                        <div className="dropdown-timeline-node">
                          <span className="dropdown-timeline-dot"></span>
                        </div>
                        <Link className="dropdown-luxury-item" to="/role-of-honour" onClick={closeAllMenus}>
                          <div className="dropdown-item-icon-box">
                            <FaTrophy />
                          </div>
                          <div className="dropdown-item-text-box">
                            <span className="dropdown-item-main-title">Roll Of Honour</span>
                            <span className="dropdown-item-sub-title">Our Proud Achievers</span>
                          </div>
                          <FaChevronRight className="dropdown-item-chevron" />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>

            {/* 2. General Info Dropdown */}
            <motion.li
              className="nav-item dropdown"
              variants={navItemVariants}
              onMouseEnter={() => handleDropdownOpen('tnebInfo')}
              onMouseLeave={handleDropdownClose}
            >
              <span className={`nav-link d-flex align-items-center gap-1 cursor-pointer text-light ${openDropdown === 'tnebInfo' ? 'active-dropdown-tab' : ''}`}>
                <FaInfoCircle className="nav-icon" />
                General Info
                <motion.span animate={{ rotate: openDropdown === 'tnebInfo' ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <FaCaretDown className="nav-caret" />
                </motion.span>
              </span>
              <AnimatePresence>
                {openDropdown === 'tnebInfo' && (
                  <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="dropdown-menu modern-luxury-dropdown show">
                    <div className="dropdown-items-container">
                      <motion.div variants={itemVariants} className="dropdown-timeline-row">
                        <div className="dropdown-timeline-node">
                          <span className="dropdown-timeline-dot"></span>
                        </div>
                        <Link className="dropdown-luxury-item" to="/act-regulations" onClick={closeAllMenus}>
                          <div className="dropdown-item-icon-box">
                            <FaGavel />
                          </div>
                          <div className="dropdown-item-text-box">
                            <span className="dropdown-item-main-title">Act &amp; Regulations</span>
                            <span className="dropdown-item-sub-title">Rules, Acts &amp; Legal Terms</span>
                          </div>
                          <FaChevronRight className="dropdown-item-chevron" />
                        </Link>
                      </motion.div>


                      <motion.div variants={itemVariants} className="dropdown-timeline-row">
                        <div className="dropdown-timeline-node">
                          <span className="dropdown-timeline-dot"></span>
                        </div>
                        <Link className="dropdown-luxury-item" to="/contributory-pension-scheme" onClick={closeAllMenus}>
                          <div className="dropdown-item-icon-box">
                            <FaUserTie />
                          </div>
                          <div className="dropdown-item-text-box">
                            <span className="dropdown-item-main-title">Pension Scheme (CPS)</span>
                            <span className="dropdown-item-sub-title">Contributory Pension Details</span>
                          </div>
                          <FaChevronRight className="dropdown-item-chevron" />
                        </Link>
                      </motion.div>

                      <motion.div variants={itemVariants} className="dropdown-timeline-row">
                        <div className="dropdown-timeline-node">
                          <span className="dropdown-timeline-dot"></span>
                        </div>
                        <Link className="dropdown-luxury-item" to="/distribution-related-instructions" onClick={closeAllMenus}>
                          <div className="dropdown-item-icon-box">
                            <FaClipboardList />
                          </div>
                          <div className="dropdown-item-text-box">
                            <span className="dropdown-item-main-title">Distribution Instructions</span>
                            <span className="dropdown-item-sub-title">Field &amp; Safety Guidelines</span>
                          </div>
                          <FaChevronRight className="dropdown-item-chevron" />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>

            {/* 3. Technical Dropdown */}
            <motion.li
              className="nav-item dropdown"
              variants={navItemVariants}
              onMouseEnter={() => handleDropdownOpen('tech')}
              onMouseLeave={handleDropdownClose}
            >
              <span className={`nav-link d-flex align-items-center gap-1 cursor-pointer text-light ${openDropdown === 'tech' ? 'active-dropdown-tab' : ''}`}>
                <FaCog className="nav-icon" />
                Technical
                <motion.span animate={{ rotate: openDropdown === 'tech' ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <FaCaretDown className="nav-caret" />
                </motion.span>
              </span>
              <AnimatePresence>
                {openDropdown === 'tech' && (
                  <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="dropdown-menu modern-luxury-dropdown show">
                    <div className="dropdown-items-container">
                      <motion.div variants={itemVariants} className="dropdown-timeline-row">
                        <div className="dropdown-timeline-node">
                          <span className="dropdown-timeline-dot"></span>
                        </div>
                        <Link className="dropdown-luxury-item" to="/technical-qa" onClick={closeAllMenus}>
                          <div className="dropdown-item-icon-box">
                            <FaQuestionCircle />
                          </div>
                          <div className="dropdown-item-text-box">
                            <span className="dropdown-item-main-title">Technical Q&amp;A</span>
                            <span className="dropdown-item-sub-title">Engineering Questions &amp; Answers</span>
                          </div>
                          <FaChevronRight className="dropdown-item-chevron" />
                        </Link>
                      </motion.div>

                      <motion.div variants={itemVariants} className="dropdown-timeline-row">
                        <div className="dropdown-timeline-node">
                          <span className="dropdown-timeline-dot"></span>
                        </div>
                        <Link className="dropdown-luxury-item" to="/technical-parameters" onClick={closeAllMenus}>
                          <div className="dropdown-item-icon-box">
                            <FaChartBar />
                          </div>
                          <div className="dropdown-item-text-box">
                            <span className="dropdown-item-main-title">Technical Parameters</span>
                            <span className="dropdown-item-sub-title">Power &amp; Grid Standards</span>
                          </div>
                          <FaChevronRight className="dropdown-item-chevron" />
                        </Link>
                      </motion.div>

                      <motion.div variants={itemVariants} className="dropdown-timeline-row">
                        <div className="dropdown-timeline-node">
                          <span className="dropdown-timeline-dot"></span>
                        </div>
                        <Link className="dropdown-luxury-item" to="/technical-books-and-manuals" onClick={closeAllMenus}>
                          <div className="dropdown-item-icon-box">
                            <FaBookOpen />
                          </div>
                          <div className="dropdown-item-text-box">
                            <span className="dropdown-item-main-title">Books &amp; Manuals</span>
                            <span className="dropdown-item-sub-title">Engineering Library &amp; Guides</span>
                          </div>
                          <FaChevronRight className="dropdown-item-chevron" />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>

            <motion.li className="nav-item" variants={navItemVariants}>
              <Link className={`nav-link nav-hover-effect ${location.pathname === '/minnagam' ? 'active-nav-link' : ''}`} to="/minnagam" onClick={closeAllMenus}>
                <FaBuilding className="nav-icon" /> Minnagam
              </Link>
            </motion.li>

            <motion.li className="nav-item" variants={navItemVariants}>
              <Link className={`nav-link nav-hover-effect ${location.pathname === '/minthiran' ? 'active-nav-link' : ''}`} to="/minthiran" onClick={closeAllMenus}>
                <FaBook className="nav-icon" /> e-Minthiran
              </Link>
            </motion.li>

            <motion.li className="nav-item" variants={navItemVariants}>
              <Link className={`nav-link nav-hover-effect ${location.pathname === '/hand-book' ? 'active-nav-link' : ''}`} to="/hand-book" onClick={closeAllMenus}>
                <FaBook className="nav-icon" /> Hand Book
              </Link>
            </motion.li>

            {/* 4. Quick Links Dropdown */}
            <motion.li
              className="nav-item dropdown"
              variants={navItemVariants}
              onMouseEnter={() => handleDropdownOpen('quickLinks')}
              onMouseLeave={handleDropdownClose}
            >
              <span className={`nav-link d-flex align-items-center gap-1 cursor-pointer text-light ${openDropdown === 'quickLinks' ? 'active-dropdown-tab' : ''}`}>
                <FaLink className="nav-icon" />
                Quick Links
                <motion.span animate={{ rotate: openDropdown === 'quickLinks' ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <FaCaretDown className="nav-caret" />
                </motion.span>
              </span>
              <AnimatePresence>
                {openDropdown === 'quickLinks' && (
                  <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="dropdown-menu modern-luxury-dropdown show">
                    <div className="dropdown-items-container">
                      <motion.div variants={itemVariants} className="dropdown-timeline-row">
                        <div className="dropdown-timeline-node">
                          <span className="dropdown-timeline-dot"></span>
                        </div>
                        <Link className="dropdown-luxury-item" to="/important-notices" onClick={closeAllMenus}>
                          <div className="dropdown-item-icon-box">
                            <FaBell />
                          </div>
                          <div className="dropdown-item-text-box">
                            <span className="dropdown-item-main-title">Important Notices</span>
                            <span className="dropdown-item-sub-title">Official Circulars &amp; Orders</span>
                          </div>
                          <FaChevronRight className="dropdown-item-chevron" />
                        </Link>
                      </motion.div>

                      <motion.div variants={itemVariants} className="dropdown-timeline-row">
                        <div className="dropdown-timeline-node">
                          <span className="dropdown-timeline-dot"></span>
                        </div>
                        <Link className="dropdown-luxury-item" to="/board-proceedings" onClick={closeAllMenus}>
                          <div className="dropdown-item-icon-box">
                            <FaLandmark />
                          </div>
                          <div className="dropdown-item-text-box">
                            <span className="dropdown-item-main-title">Board Proceedings</span>
                            <span className="dropdown-item-sub-title">Gazettes &amp; Official Records</span>
                          </div>
                          <FaChevronRight className="dropdown-item-chevron" />
                        </Link>
                      </motion.div>

                      <motion.div variants={itemVariants} className="dropdown-timeline-row">
                        <div className="dropdown-timeline-node">
                          <span className="dropdown-timeline-dot"></span>
                        </div>
                        <Link className="dropdown-luxury-item" to="/photo-gallery" onClick={closeAllMenus}>
                          <div className="dropdown-item-icon-box">
                            <FaImages />
                          </div>
                          <div className="dropdown-item-text-box">
                            <span className="dropdown-item-main-title">Photo Gallery</span>
                            <span className="dropdown-item-sub-title">Event Photos &amp; Memorabilia</span>
                          </div>
                          <FaChevronRight className="dropdown-item-chevron" />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>

            {/* 5. Enroll Dropdown */}
            <motion.li
              className="nav-item dropdown"
              variants={navItemVariants}
              onMouseEnter={() => handleDropdownOpen('enroll')}
              onMouseLeave={handleDropdownClose}
            >
              <span className={`nav-link d-flex align-items-center gap-1 cursor-pointer text-light ${openDropdown === 'enroll' ? 'active-dropdown-tab' : ''}`}>
                <FaEdit className="nav-icon" />
                Enroll
                <motion.span animate={{ rotate: openDropdown === 'enroll' ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <FaCaretDown className="nav-caret" />
                </motion.span>
              </span>
              <AnimatePresence>
                {openDropdown === 'enroll' && (
                  <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="dropdown-menu modern-luxury-dropdown show" style={{ minWidth: '310px' }}>
                    <div className="dropdown-items-container">
                      <motion.div variants={itemVariants} className="dropdown-timeline-row">
                        <div className="dropdown-timeline-node">
                          <span className="dropdown-timeline-dot"></span>
                        </div>
                        <Link className="dropdown-luxury-item" to="/enroll" onClick={closeAllMenus}>
                          <div className="dropdown-item-icon-box">
                            <FaUserPlus />
                          </div>
                          <div className="dropdown-item-text-box">
                            <span className="dropdown-item-main-title">New Membership</span>
                            <span className="dropdown-item-sub-title">Join TNEBEA Association</span>
                          </div>
                          <FaChevronRight className="dropdown-item-chevron" />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>

            <motion.li className="nav-item" variants={navItemVariants}>
              <Link className={`nav-link nav-hover-effect ${location.pathname === '/tnebea-forms' ? 'active-nav-link' : ''}`} to="/tnebea-forms" onClick={closeAllMenus}>
                <FaFileAlt className="nav-icon" /> Forms
              </Link>
            </motion.li>

            <motion.li className="nav-item" variants={navItemVariants}>
              <Link className={`nav-link nav-hover-effect ${location.pathname === '/contactus' ? 'active-nav-link' : ''}`} to="/contactus" onClick={closeAllMenus}>
                <FaEnvelope className="nav-icon" /> Contact
              </Link>
            </motion.li>

            {isAuthenticated() && (
              <motion.li className="nav-item" variants={navItemVariants}>
                <Link className="nav-link nav-hover-effect" style={{ color: '#ffb300', fontWeight: 'bold' }} to="/dashboard/minnagam" onClick={closeAllMenus}>Dashboard</Link>
              </motion.li>
            )}

          </ul>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;