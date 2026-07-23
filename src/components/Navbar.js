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
  FaHandPaper, FaUserPlus, FaCaretRight
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";
// import Logo from "../assets/tnebea_logo_cropped2.png";
import { SidebarContext } from '../context/SidebarContext';

const Navbar = () => {
  const { isSidebarOpen, openSidebar, closeSidebar } = useContext(SidebarContext);
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  // const [searchQuery, setSearchQuery] = useState('');
  const closeTimeoutRef = useRef(null);
  const sidebarRef = useRef(null);
  
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

  const handleDropdownOpen = (key) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setOpenDropdown(key);
  };

  const handleDropdownClose = () => {
    closeTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 200);
  };

  const handleUserMenuToggle = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const closeAllMenus = () => {
    closeSidebar();
    setOpenDropdown(null);
    setUserMenuOpen(false);
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

  const userDropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -5, 
      scale: 0.95,
      transformOrigin: "top right"
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -5, 
      transition: { duration: 0.15 } 
    }
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

  return (
    <motion.nav 
      className="main-navbar navbar navbar-expand-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container-fluid px-4">
        {/* Logo */}
        {/* <motion.div 
          className="navbar-brand d-flex align-items-center logo-wrapper"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="logo-container me-2">
            <img src={Logo} alt="TNEBEA" className="logo-img" />
            <div className="logo-sparkle"></div>
            <div className="logo-sparkle delay-1"></div>
            <div className="logo-sparkle delay-2"></div>
          </div>
        </motion.div> */}

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
                              <div
                                className="sidebar-item d-flex align-items-center justify-content-between"
                                onClick={() => setOpenDropdown(openDropdown === 'about_tnebea' ? 'about' : 'about_tnebea')}
                                style={{ padding: '8px 20px', color: '#ffffff', cursor: 'pointer', fontSize: '0.95rem' }}
                              >
                                <span><FaInfoCircle className="sidebar-icon" /> About TNEBEA</span>
                                <motion.span animate={{ rotate: openDropdown === 'about_tnebea' ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                  <FaCaretDown />
                                </motion.span>
                              </div>
                              <AnimatePresence>
                                {openDropdown === 'about_tnebea' && (
                                  <motion.div 
                                    className="sidebar-submenu"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ paddingLeft: '20px' }}
                                  >
                                    <span className="sidebar-item disabled text-light-50" style={{ paddingLeft: '45px', cursor: 'default', opacity: 0.7 }}>
                                      This page is under development
                                    </span>
                                  </motion.div>
                                )}
                              </AnimatePresence>

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
                              <Link className="sidebar-item" to="/manuals-and-forms-download" onClick={closeAllMenus}>
                                <FaFilePdf className="sidebar-icon" /> Manuals & Forms
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
                          <FaMobile className="sidebar-icon" /> Minnagam
                        </Link>
                      </motion.li>

                      <motion.li className="nav-item" variants={navItemVariants}>
                        <Link className="nav-link" to="/Minthiran" onClick={closeAllMenus}>
                          <FaRegNewspaper className="sidebar-icon" /> e-Minthiran
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
                              style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0'}}
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

                  <motion.div className="sidebar-auth-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button className="btn btn-light w-100" onClick={() => { navigate('/login'); closeAllMenus(); }}>
                      <FaUser className="me-2" />
                      Login
                    </button>
                  </motion.div>
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
              <Link className="nav-link nav-hover-effect" to="/" onClick={closeAllMenus}>Home</Link>
            </motion.li>

            <motion.li 
              className="nav-item dropdown" 
              variants={navItemVariants}
              onMouseEnter={() => handleDropdownOpen('about')} 
              onMouseLeave={handleDropdownClose}
            >
              <span className="nav-link d-flex align-items-center gap-1 cursor-pointer text-light">
                About 
                <motion.span animate={{ rotate: (openDropdown === 'about' || openDropdown === 'about_tnebea') ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <FaCaretDown />
                </motion.span>
              </span>
              <AnimatePresence>
                {(openDropdown === 'about' || openDropdown === 'about_tnebea') && (
                  <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="dropdown-menu show">
                    <motion.div 
                      variants={itemVariants}
                      className="dropdown-submenu position-relative"
                      onMouseEnter={() => setOpenDropdown('about_tnebea')}
                      onMouseLeave={() => setOpenDropdown('about')}
                    >
                      <span className="dropdown-item d-flex align-items-center justify-content-between cursor-pointer">
                        <span><span className="dropdown-icon"><FaInfoCircle /></span> About TNEBEA</span>
                        <FaCaretRight style={{ fontSize: '0.8rem', marginLeft: '10px' }} />
                      </span>
                      <AnimatePresence>
                        {openDropdown === 'about_tnebea' && (
                          <motion.div 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="dropdown-menu show position-absolute" 
                            style={{ left: '100%', top: 0, minWidth: '220px' }}
                          >
                            <span className="dropdown-item disabled text-muted" style={{ cursor: 'default' }}>
                              This page is under development
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <Link className="dropdown-item" to="/cec" onClick={closeAllMenus}>
                        <span className="dropdown-icon"><FaUserTie /></span> CEC & EBF
                      </Link>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Link className="dropdown-item" to="/regional" onClick={closeAllMenus}>
                        <span className="dropdown-icon"><FaUsers /></span> Regional Secretary
                      </Link>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Link className="dropdown-item" to="/public-secretary" onClick={closeAllMenus}>
                        <span className="dropdown-icon"><FaUsers /></span> Branch Secretary
                      </Link>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Link className="dropdown-item" to="/role-of-honour" onClick={closeAllMenus}>
                        <span className="dropdown-icon"><FaTrophy /></span> Roll Of Honour
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>

            <motion.li 
              className="nav-item dropdown" 
              variants={navItemVariants}
              onMouseEnter={() => handleDropdownOpen('tnebInfo')} 
              onMouseLeave={handleDropdownClose}
            >
              <span className="nav-link d-flex align-items-center gap-1 cursor-pointer">
                General Info
                <motion.span animate={{ rotate: openDropdown === 'tnebInfo' ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <FaCaretDown />
                </motion.span>
              </span>
              <AnimatePresence>
                {openDropdown === 'tnebInfo' && (
                  <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="dropdown-menu show">
                    <motion.div variants={itemVariants}>
                      <Link className="dropdown-item" to="/act-regulations" onClick={closeAllMenus}><span className="dropdown-icon"><FaGavel /></span> Act & Regulations</Link>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Link className="dropdown-item" to="/manuals-and-forms-download" onClick={closeAllMenus}><span className="dropdown-icon"><FaFilePdf /></span> Manuals & Forms</Link>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Link className="dropdown-item" to="/contributory-pension-scheme" onClick={closeAllMenus}><span className="dropdown-icon"><FaUserTie /></span> Pension Scheme (CPS)</Link>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Link className="dropdown-item" to="/distribution-related-instructions" onClick={closeAllMenus}><span className="dropdown-icon"><FaClipboardList /></span> Distribution Instructions</Link>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>

            <motion.li 
              className="nav-item dropdown" 
              variants={navItemVariants}
              onMouseEnter={() => handleDropdownOpen('tech')} 
              onMouseLeave={handleDropdownClose}
            >
              <span className="nav-link d-flex align-items-center gap-1 cursor-pointer">
                Technical
                <motion.span animate={{ rotate: openDropdown === 'tech' ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <FaCaretDown />
                </motion.span>
              </span>
              <AnimatePresence>
                {openDropdown === 'tech' && (
                  <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="dropdown-menu show">
                    <motion.div variants={itemVariants}>
                      <Link className="dropdown-item" to="/technical-qa" onClick={closeAllMenus}><span className="dropdown-icon"><FaQuestionCircle /></span> Technical Q&A</Link>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Link className="dropdown-item" to="/technical-parameters" onClick={closeAllMenus}><span className="dropdown-icon"><FaChartBar /></span> Technical Parameters</Link>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Link className="dropdown-item" to="/technical-books-and-manuals" onClick={closeAllMenus}><span className="dropdown-icon"><FaBookOpen /></span> Books & Manuals</Link>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>

            <motion.li className="nav-item" variants={navItemVariants}>
              <Link className="nav-link nav-hover-effect" to="/minnagam" onClick={closeAllMenus}>Minnagam</Link>
            </motion.li>

            <motion.li className="nav-item" variants={navItemVariants}>
              <Link className="nav-link nav-hover-effect" to="/minthiran" onClick={closeAllMenus}>e-Minthiran</Link>
            </motion.li>

            <motion.li className="nav-item" variants={navItemVariants}>
              <Link className="nav-link nav-hover-effect" to="/hand-book" onClick={closeAllMenus}>Hand Book</Link>
            </motion.li>
            <motion.li 
              className="nav-item dropdown" 
              variants={navItemVariants}
              onMouseEnter={() => handleDropdownOpen('quickLinks')} 
              onMouseLeave={handleDropdownClose}
            >
              <span className="nav-link d-flex align-items-center gap-1 cursor-pointer">
                Quick Links
                <motion.span animate={{ rotate: openDropdown === 'quickLinks' ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <FaCaretDown />
                </motion.span>
              </span>
              <AnimatePresence>
                {openDropdown === 'quickLinks' && (
                  <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="dropdown-menu show">
                    <motion.div variants={itemVariants}>
                      <Link className="dropdown-item" to="/important-notices" onClick={closeAllMenus}>
                        <span className="dropdown-icon"><FaBell /></span> Important Notices
                      </Link>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Link className="dropdown-item" to="/board-proceedings" onClick={closeAllMenus}>
                        <span className="dropdown-icon"><FaLandmark /></span> Board Proceedings
                      </Link>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Link className="dropdown-item" to="/photo-gallery" onClick={closeAllMenus}>
                        <span className="dropdown-icon"><FaImages /></span> Photo Gallery
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>

            <motion.li 
              className="nav-item dropdown" 
              variants={navItemVariants}
              onMouseEnter={() => handleDropdownOpen('enroll')} 
              onMouseLeave={handleDropdownClose}
            >
              <span className="nav-link d-flex align-items-center gap-1 cursor-pointer">
                Enroll
                <motion.span animate={{ rotate: openDropdown === 'enroll' ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <FaCaretDown />
                </motion.span>
              </span>
              <AnimatePresence>
                {openDropdown === 'enroll' && (
                  <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="dropdown-menu show" style={{ minWidth: '220px' }}>
                    <motion.div variants={itemVariants}>
                      <span className="dropdown-item disabled text-muted" style={{ cursor: 'default' }}>
                        This page is under development
                      </span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>

            <motion.li className="nav-item" variants={navItemVariants}>
              <Link className="nav-link nav-hover-effect" to="/tnebea-forms" onClick={closeAllMenus}>Forms</Link>
            </motion.li>

            <motion.li className="nav-item" variants={navItemVariants}>
              <Link className="nav-link nav-hover-effect" to="/contactus" onClick={closeAllMenus}>Contact</Link>
            </motion.li>

          </ul>
          <div className="ms-lg-3" style={{ position: 'relative' }}>
            <div className="user-menu-container">
              <motion.div 
                className="user-profile-icon"
                onClick={handleUserMenuToggle}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ boxShadow: userMenuOpen ? "0 0 20px rgba(27, 91, 175, 0.5)" : "0 4px 12px rgba(0, 0, 0, 0.1)" }}
              >
                <FaUser />
                <motion.div className="pulse-dot" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
              </motion.div>
              
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div variants={userDropdownVariants} initial="hidden" animate="visible" exit="exit" className="user-dropdown-menu" onMouseLeave={() => setUserMenuOpen(false)}>

                     <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                      <Link className="user-dropdown-item" to="#" onClick={(e) => { e.preventDefault(); window.open('https://docs.google.com/forms/d/e/1FAIpQLSfv3I080h3YlwL_8Fmxzf55dnmRhxNPdbfItQmjxoSYHYjoyA/viewform?usp=publish-editor', '_blank'); }} whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                        <span className="user-menu-icon"><FaClipboardList /></span><span>Grievance</span>
                      </Link>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                      <Link className="user-dropdown-item" to="/login" onClick={() => closeAllMenus()} whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                        <span className="user-menu-icon"><FaUser /></span><span>Login</span>
                      </Link>
                    </motion.div>
                    {/* <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                      <Link className="user-dropdown-item" to="#" onClick={(e) => { e.preventDefault(); }} whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                        <span className="user-menu-icon"><FaFileAlt /></span><span>Grievances</span>
                      </Link>
                    </motion.div> */}

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;