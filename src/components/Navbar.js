import React, { useState, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaCaretDown, FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import Logo from "../assets/tnebea_logo_cropped2.png";
import AuthModal from './AuthModal';
import { SidebarContext } from '../context/SidebarContext';

const Navbar = () => {
  const { isSidebarOpen, openSidebar, closeSidebar } = useContext(SidebarContext);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [searchQuery, setSearchQuery] = useState('');
  const closeTimeoutRef = useRef(null);

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
        <motion.div 
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
        </motion.div>

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

                <nav className="sidebar-nav">
                  <ul className="navbar-nav flex-column">
                    <motion.li className="nav-item" variants={navItemVariants}>
                      <Link className="nav-link" to="/" onClick={closeAllMenus}>
                        🏠 Home
                      </Link>
                    </motion.li>

                    <motion.li className="nav-item" variants={navItemVariants}>
                      <div
                        className="nav-link sidebar-toggle"
                        onClick={() => setOpenDropdown(openDropdown === 'about' ? null : 'about')}
                      >
                        <span>👥 About TNEBEA</span>
                        <motion.span
                          animate={{ rotate: openDropdown === 'about' ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FaCaretDown />
                        </motion.span>
                      </div>
                      <AnimatePresence>
                        {openDropdown === 'about' && (
                          <motion.div 
                            className="sidebar-submenu"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Link className="sidebar-item" to="/cec" onClick={closeAllMenus}>
                              👥 CEC
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
                        <span>ℹ️ General Info</span>
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
                              ⚖️ Act & Regulations
                            </Link>
                            <Link className="sidebar-item" to="/manuals-and-forms-download" onClick={closeAllMenus}>
                              📄 Manuals & Forms
                            </Link>
                            <Link className="sidebar-item" to="/contributory-pension-scheme" onClick={closeAllMenus}>
                              👴 Pension Scheme (CPS)
                            </Link>
                            <Link className="sidebar-item" to="/distribution-related-instructions" onClick={closeAllMenus}>
                              📋 Distribution Instructions
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
                        <span>⚙️ Technical</span>
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
                              ❓ Technical Q&A
                            </Link>
                            <Link className="sidebar-item" to="/technical-parameters" onClick={closeAllMenus}>
                              📊 Technical Parameters
                            </Link>
                            <Link className="sidebar-item" to="/technical-books-and-manuals" onClick={closeAllMenus}>
                              📚 Books & Manuals
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>

                    <motion.li className="nav-item" variants={navItemVariants}>
                      <Link className="nav-link" to="/minnagam" onClick={closeAllMenus}>
                        📱 Minnagam
                      </Link>
                    </motion.li>

                    <motion.li className="nav-item" variants={navItemVariants}>
                      <Link className="nav-link" to="/hand-book" onClick={closeAllMenus}>
                        📖 Hand Book
                      </Link>
                    </motion.li>

                    {/* <motion.li className="nav-item" variants={navItemVariants}>
                      <Link className="nav-link" to="/news" onClick={closeAllMenus}>
                        📰 News
                      </Link>
                    </motion.li> */}

                    {/* <motion.li className="nav-item" variants={navItemVariants}>
                      <div
                        className="nav-link sidebar-toggle"
                        onClick={() => setOpenDropdown(openDropdown === 'quickLinks' ? null : 'quickLinks')}
                      >
                        <span>🔗 Quick Links</span>
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
                          >
                            <a className="sidebar-item" href="https://www.tangedco.gov.in/" target="_blank" rel="noopener noreferrer" onClick={closeAllMenus}>
                              ⚡ TANGEDCO
                            </a>
                            <a className="sidebar-item" href="https://www.tantransco.gov.in/" target="_blank" rel="noopener noreferrer" onClick={closeAllMenus}>
                              🔌 TANTRANSCO
                            </a>
                            <a className="sidebar-item" href="https://www.tnerc.gov.in/" target="_blank" rel="noopener noreferrer" onClick={closeAllMenus}>
                              🏛️ TNERC
                            </a>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li> */}

                    
                    <motion.li className="nav-item" variants={navItemVariants}>
                      <Link className="nav-link" to="/contactus" onClick={closeAllMenus}>
                        📝TNEBEA Forms
                      </Link>
                    </motion.li>

                    <motion.li className="nav-item" variants={navItemVariants}>
                      <Link className="nav-link" to="/contactus" onClick={closeAllMenus}>
                        ☎️ Contact
                      </Link>
                    </motion.li>
                  </ul>
                </nav>

                <div className="sidebar-footer">
                  <motion.div className="sidebar-auth-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button className="btn btn-light w-100" onClick={() => { setAuthTab('login'); setShowAuth(true); closeAllMenus(); }}>
                      <FaUser className="me-2" />
                      Login / Register
                    </button>
                  </motion.div>
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
        >
          <ul className="navbar-nav w-100 align-items-center">
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
                About TNEBEA 
                <motion.span animate={{ rotate: openDropdown === 'about' ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <FaCaretDown />
                </motion.span>
              </span>
              <AnimatePresence>
                {openDropdown === 'about' && (
                  <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="dropdown-menu show">
                    <motion.div variants={itemVariants}>
                      <Link className="dropdown-item" to="/cec" onClick={closeAllMenus}>
                        <span className="dropdown-icon">👥</span> CEC
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
                      <Link className="dropdown-item" to="/act-regulations" onClick={closeAllMenus}><span className="dropdown-icon">⚖️</span> Act & Regulations</Link>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Link className="dropdown-item" to="/manuals-and-forms-download" onClick={closeAllMenus}><span className="dropdown-icon">📄</span> Manuals & Forms</Link>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Link className="dropdown-item" to="/contributory-pension-scheme" onClick={closeAllMenus}><span className="dropdown-icon">👴</span> Pension Scheme (CPS)</Link>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Link className="dropdown-item" to="/distribution-related-instructions" onClick={closeAllMenus}><span className="dropdown-icon">📋</span> Distribution Instructions</Link>
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
                      <Link className="dropdown-item" to="/technical-qa" onClick={closeAllMenus}><span className="dropdown-icon">❓</span> Technical Q&A</Link>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Link className="dropdown-item" to="/technical-parameters" onClick={closeAllMenus}><span className="dropdown-icon">📊</span> Technical Parameters</Link>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Link className="dropdown-item" to="/technical-books-and-manuals" onClick={closeAllMenus}><span className="dropdown-icon">📚</span> Books & Manuals</Link>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>

            <motion.li className="nav-item" variants={navItemVariants}>
              <Link className="nav-link nav-hover-effect" to="/minnagam" onClick={closeAllMenus}>Minnagam</Link>
            </motion.li>

            <motion.li className="nav-item" variants={navItemVariants}>
              <Link className="nav-link nav-hover-effect" to="/hand-book" onClick={closeAllMenus}>Hand Book</Link>
            </motion.li>
{/* 
            <motion.li 
              className="nav-item dropdown" 
              variants={navItemVariants}
              onMouseEnter={() => handleDropdownOpen('quickLinks')} 
              onMouseLeave={handleDropdownClose}
            >
              <span className="nav-link d-flex align-items-center gap-1 cursor-pointer">
                TNEBEA Forms
                <motion.span animate={{ rotate: openDropdown === 'quickLinks' ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <FaCaretDown />
                </motion.span>
              </span>
              <AnimatePresence>
                {openDropdown === 'quickLinks' && (
                  <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="dropdown-menu show">
                    <motion.div variants={itemVariants}>
                      <a className="dropdown-item" href="https://www.tangedco.gov.in/" target="_blank" rel="noopener noreferrer" onClick={closeAllMenus}><span className="dropdown-icon">⚡</span> TANGEDCO</a>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <a className="dropdown-item" href="https://www.tantransco.gov.in/" target="_blank" rel="noopener noreferrer" onClick={closeAllMenus}><span className="dropdown-icon">🔌</span> TANTRANSCO</a>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <a className="dropdown-item" href="https://www.tnerc.gov.in/" target="_blank" rel="noopener noreferrer" onClick={closeAllMenus}><span className="dropdown-icon">🏛️</span> TNERC</a>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li> */}

            <motion.li className="nav-item" variants={navItemVariants}>
              <Link className="nav-link nav-hover-effect" to="/contactus" onClick={closeAllMenus}>TNEBEA Forms</Link>
            </motion.li>

            <motion.li className="nav-item" variants={navItemVariants}>
              <Link className="nav-link nav-hover-effect" to="/contactus" onClick={closeAllMenus}>Contact</Link>
            </motion.li>

            <motion.li className="nav-item ms-lg-auto" variants={navItemVariants}>
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
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                        <Link className="user-dropdown-item" to="#" onClick={(e) => { e.preventDefault(); setAuthTab('login'); setShowAuth(true); }} whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                          <span className="user-menu-icon">🔑</span><span>Login</span>
                        </Link>
                      </motion.div>
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                        <Link className="user-dropdown-item" to="#" onClick={(e) => { e.preventDefault(); setAuthTab('register'); setShowAuth(true); }} whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                          <span className="user-menu-icon">📝</span><span>Register</span>
                        </Link>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.li>
          </ul>
        </motion.div>
      </div>
      <AuthModal show={showAuth} onClose={() => setShowAuth(false)} defaultTab={authTab} />
    </motion.nav>
  );
};

export default Navbar;