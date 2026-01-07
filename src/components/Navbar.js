import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isTnebOpen, setIsTnebOpen] = useState(false);
  const [isTechOpen, setIsTechOpen] = useState(false);
  const [isQuickOpen, setIsQuickOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="main-navbar navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="mainNavbar">
          <ul className="navbar-nav w-100">
            <li className="nav-item active">
              <Link className="nav-link" to="/" onClick={() => setIsOpen(false)}>Home</Link>
            </li>

            {/* About TNEBEA with Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="aboutDropdown">
                About TNEBEA
              </a>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="/cec">CEC</Link>
              </div>

            </li>

            {/* TNEB General Info with Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="tnebInfoDropdown"
                onClick={(e) => {
                  e.preventDefault();
                  if (isMobile) setIsTnebOpen(!isTnebOpen);
                }}
              >
                TNEB General Info
              </a>
              <div className={`dropdown-menu ${isMobile && isTnebOpen ? 'show' : ''}`}>
                <Link className="dropdown-item" to="/act-regulations">Act & Regulations</Link>
                <Link className="dropdown-item" to="/manuals-and-forms-download">
                  TNEB Regulations Manual & Forms
                </Link>
                <Link className="dropdown-item" to="/contributory-pension-scheme">
                  CONTRIBUTORY PENSION SCHEME
                </Link>
                <Link className="dropdown-item" to="/distribution-related-instructions">
                  DISTRIBUTION RELATED INSTRUCTIONS - AGRI DOMESTIC COMMERCIAL
                </Link>
              </div>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/minnagam">Minnagam</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/hand-book">Engineers Hand Book</Link>
            </li>

            {/* Technical Corner with Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="techDropdown"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isMobile) setIsTechOpen(!isTechOpen);
                }}
              >
                Technical Corner
              </a>
              <div className={`dropdown-menu ${isMobile && isTechOpen ? 'show' : ''}`} onClick={(e) => e.stopPropagation()}>
                <Link className="dropdown-item" to="/technical-qa">Technical Q&A</Link>
                <Link className="dropdown-item" to="/technical-parameters">Technical Parameters</Link>
                <Link className="dropdown-item" to="/technical-books-and-manuals">
                  TECHNICAL BOOKS AND MANUALS
                </Link>
              </div>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/news">News</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contactus">Contact</Link>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="http://tneb.tnebnet.org/emp/forms.html">TNEBEA FORMS</a>
            </li>

            {/* Quick Links Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="quickLinksDropdown"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isMobile) setIsQuickOpen(!isQuickOpen);
                }}
              >
                Quick links
              </a>
              <div className={`dropdown-menu ${isMobile && isQuickOpen ? 'show' : ''}`} onClick={(e) => e.stopPropagation()}>
                <a href="#" className="dropdown-item quick-link from-board">FROM THE BOARD</a>
                <a href="#" className="dropdown-item quick-link to-board">TO THE BOARD</a>
                <a href="https://www.tneb.in/" className="dropdown-item quick-link tneb">TNEB LIMITED</a>
                <a href="https://www.tangedco.gov.in/" className="dropdown-item quick-link tangedco">TANGEDCO</a>
                <a href="https://www.tantransco.gov.in/" className="dropdown-item quick-link tantransco">TANTRANSCO</a>
                <a href="https://www.teda.in/" className="dropdown-item quick-link teda">TEDA</a>
                <a href="https://www.tnerc.gov.in/" className="dropdown-item quick-link tnerc">TNERC</a>
                <a href="https://www.tufidco.gov.in/" className="dropdown-item quick-link tufidco">TUFIDCO</a>
              </div>
            </li>

            {/* User Icon with Dropdown */}
            <li className="nav-item ml-auto dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isMobile) setIsUserOpen(!isUserOpen);
                }}
              >
                <FaUser />
              </a>
              <div className={`dropdown-menu dropdown-menu-right ${isMobile && isUserOpen ? 'show' : ''}`} style={{marginLeft:'100%'}} onClick={(e) => e.stopPropagation()}>
                <Link className="dropdown-item" to="/login">Login</Link>
                <Link className="dropdown-item" to="/register">Register</Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
