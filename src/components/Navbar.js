import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const closeTimeoutRef = React.useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownOpen = (key) => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(key);
  };

  const handleDropdownClose = () => {
    // Add a small delay before closing to prevent flickering
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  return (
    <nav className="main-navbar navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-expanded={isOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="mainNavbar">
          <ul className="navbar-nav w-100">
            <li className="nav-item active">
              <Link className="nav-link" to="/" onClick={() => setIsOpen(false)}>Home</Link>
            </li>

            {/* About TNEBEA with Dropdown */}
            <li
              className="nav-item dropdown"
              onMouseEnter={() => handleDropdownOpen('about')}
              onMouseLeave={handleDropdownClose}
            >
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="aboutDropdown"
                onClick={(e) => { e.preventDefault(); handleDropdownOpen('about'); }}
              >
                About TNEBEA
              </a>
              <div className={`dropdown-menu ${openDropdown === 'about' ? 'show' : ''}`}>
                <Link className="dropdown-item" to="/cec">CEC</Link>
              </div>
            </li>

            {/* TNEB General Info with Dropdown */}
            <li
              className="nav-item dropdown"
              onMouseEnter={() => handleDropdownOpen('tnebInfo')}
              onMouseLeave={handleDropdownClose}
            >
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="tnebInfoDropdown"
                onClick={(e) => { e.preventDefault(); handleDropdownOpen('tnebInfo'); }}
              >
                TNEB General Info
              </a>
              <div className={`dropdown-menu ${openDropdown === 'tnebInfo' ? 'show' : ''}`}>
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
            <li
              className="nav-item dropdown"
              onMouseEnter={() => handleDropdownOpen('tech')}
              onMouseLeave={handleDropdownClose}
            >
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="techDropdown"
                onClick={(e) => { e.preventDefault(); handleDropdownOpen('tech'); }}
              >
                Technical Corner
              </a>
              <div className={`dropdown-menu ${openDropdown === 'tech' ? 'show' : ''}`}>
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
            <li
              className="nav-item dropdown"
              onMouseEnter={() => handleDropdownOpen('quickLinks')}
              onMouseLeave={handleDropdownClose}
            >
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="quickLinksDropdown"
                onClick={(e) => { e.preventDefault(); handleDropdownOpen('quickLinks'); }}
              >
                Quick links
              </a>
              <div className={`dropdown-menu ${openDropdown === 'quickLinks' ? 'show' : ''}`}>
                <a href="#" className="dropdown-item">FROM THE BOARD</a>
                <a href="#" className="dropdown-item">TO THE BOARD</a>
                <a href="https://www.tneb.in/" className="dropdown-item">TNEB LIMITED</a>
                <a href="https://www.tangedco.gov.in/" className="dropdown-item">TANGEDCO</a>
                <a href="https://www.tantransco.gov.in/" className="dropdown-item">TANTRANSCO</a>
                <a href="https://www.teda.in/" className="dropdown-item">TEDA</a>
                <a href="https://www.tnerc.gov.in/" className="dropdown-item">TNERC</a>
                <a href="https://www.tufidco.gov.in/" className="dropdown-item">TUFIDCO</a>
              </div>
            </li>

            {/* User Icon with Dropdown */}
            <li
              className="nav-item ml-auto dropdown"
              onMouseEnter={() => handleDropdownOpen('user')}
              onMouseLeave={handleDropdownClose}
            >
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                onClick={(e) => { e.preventDefault(); handleDropdownOpen('user'); }}
              >
                <FaUser />
              </a>
              <div className={`dropdown-menu dropdown-menu-right ${openDropdown === 'user' ? 'show' : ''}`} style={{marginLeft:'100%'}}>
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
