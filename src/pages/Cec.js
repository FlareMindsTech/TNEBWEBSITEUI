// Cec.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHome, FaUser, FaSmile, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Cec.css';

const Cec = () => {
  const [currentTime, setCurrentTime] = useState('');

  // Footer slider images
  const footerImages = [
    { id: 1, src: "../Images/footer/cea.png", alt: "CEA", link: "http://cea.nic.in/" },
    { id: 2, src: "../Images/footer/mnre_0.png", alt: "MNRE", link: "https://mnre.gov.in/" },
    { id: 3, src: "../Images/footer/digitalindia_0-1.png", alt: "Digital India", link: "https://www.digitalindia.gov.in/" },
    { id: 4, src: "../Images/footer/IPDS-1.gif", alt: "IPDS", link: "http://www.ipds.gov.in/" },
    { id: 5, src: "../Images/footer/natportal_0.png", alt: "National Portal", link: "https://npp.gov.in/" },
    { id: 6, src: "../Images/footer/powergrid_1.png", alt: "Power Grid", link: "http://www.powergridindia.com/" },
    { id: 7, src: "../Images/footer/pfcl.png", alt: "PFC", link: "https://www.pfcindia.com/" },
    { id: 8, src: "../Images/footer/minofpower_3.png", alt: "Ministry of Power", link: "https://powermin.nic.in/" },
    { id: 9, src: "../Images/footer/mygov_7.png", alt: "MyGov", link: "https://www.mygov.in/" }
  ];

  // CEC Members Data
  const cecMembers = [
    {
      id: 0,
      serialNo: null,
      designation: "Principal Secretary (National & State Affairs)",
      name: "Er. T. Jayanthi",
      qualification: "M.Tech/MBA(HR)/BGL/MIE.,",
      photo: "../Images/cec/Jayanthi.jpg",
      contact: "97106 22185"
    },
    {
      id: 1,
      serialNo: 1,
      designation: "President",
      name: "Er. N. SENTHIL KUMAR",
      qualification: "EE/Master Plan/TANTRANSCO/HQ CHENNAI",
      photo: "../Images/cec/SENTHILKUMAR.jpg",
      contact: "94980 38894"
    },
    {
      id: 2,
      serialNo: 2,
      designation: "Vice President-I",
      name: "Er. M. SATHIAMURTHY",
      qualification: "EE/Master Plan-II/TNPDL/HQ CHENNAI",
      photo: "../Images/cec/SATHIAMURTHY.jpg",
      contact: "94443 55366"
    },
    {
      id: 3,
      serialNo: 3,
      designation: "Vice President-II",
      name: "Er. S. SAMBATHKUMAR",
      qualification: "AEE/Civil/TLC/GCC-II/CHENNAI",
      photo: "../Images/cec/SAMBATHKUMAR.jpg",
      contact: "63833 84748"
    },
    {
      id: 4,
      serialNo: 4,
      designation: "General Secretary",
      name: "Er. K. VIJAY",
      qualification: "EA to CE/MTPS-I",
      photo: "../Images/cec/VIJAY.jpg",
      contact: "94897 74341"
    },
    {
      id: 5,
      serialNo: 5,
      designation: "Treasurer",
      name: "Er. J. JAYAPRAKASH",
      qualification: "Senior Manager/IS/Krishnagiri",
      photo: "../Images/cec/JAYAPRAKASH.jpg",
      contact: "94874 65104"
    },
    {
      id: 6,
      serialNo: 6,
      designation: "Organising Secretary",
      name: "Er. N. ARUNACHALAM",
      qualification: "AEE/SLDC/ERODE",
      photo: "../Images/cec/ARUNACHALAM.jpg",
      contact: "94458 59614"
    },
    {
      id: 7,
      serialNo: 7,
      designation: "Secretary (Publication)",
      name: "Er. G. VARUN KUMAR",
      qualification: "AE/ERP/IT/HQ CHENNAI",
      photo: "../Images/cec/VARUNKUMAR.jpg",
      contact: "97908 30459"
    },
    {
      id: 8,
      serialNo: 8,
      designation: "Secretary (Administration)",
      name: "Er. G. VIKRAMAN",
      qualification: "AEE/O&M/Thennur/Trichy Metro",
      photo: "../Images/cec/VIKRAMAN.jpg",
      contact: "94421 14221"
    },
    {
      id: 9,
      serialNo: 9,
      designation: "Secretary (Minnagam)",
      name: "Er. D. ANAND KUMAR",
      qualification: "AEE/Turbine Maintenance/NCTPS-II",
      photo: "../Images/cec/ANANDKUMAR.jpg",
      contact: "98948 12568"
    },
    {
      id: 10,
      serialNo: 10,
      designation: "Secretary (Legal)",
      name: "Er. A. DURGA DEVI",
      qualification: "AEE/Schemes/Madurai",
      photo: "../Images/cec/DURGADEVI.jpg",
      contact: "94434 56136"
    },
    {
      id: 11,
      serialNo: 11,
      designation: "Secretary (Personnel Affairs)",
      name: "Er. J. ROSELINE GRACE",
      qualification: "AEE/C&I/Kuzhithurai/Kanyakumari",
      photo: "../Images/cec/ROSELINEGRACE.jpg",
      contact: "94896 18015"
    },
    {
      id: 12,
      serialNo: 12,
      designation: "Secretary (Internal Affairs)",
      name: "Er. K. GOMATHI",
      qualification: "AE/O&M/West/Kinathukadavu/South/Coimbatore",
      photo: "../Images/cec/GOMATHI.jpg",
      contact: "75027 36561"
    },
    {
      id: 13,
      serialNo: 13,
      designation: "Secretary/EBF",
      name: "Er. C. R. JAYAMURTHI",
      qualification: "SE/Transmission/765 KVSS/HQ CHENNAI",
      photo: "../Images/cec/JAYAMURTHI.jpg",
      contact: "96000 82034"
    },
    {
      id: 14,
      serialNo: 14,
      designation: "Treasurer/EBF",
      name: "Er. R. BALAMURUGAN",
      qualification: "AEE/MRT/Metering/Chennai South-I",
      photo: "../Images/cec/BALAMURUGAN.jpg",
      contact: "99625 11494"
    }
  ];

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

  return (
    <div className="cec-container">
      {/* Top Marquee */}
      <div className="top-marquee">
        <marquee behavior="scroll" direction="left">
          <strong>Tamil Nadu Electricity Board Engineers Association Site</strong>
        </marquee>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div className="container-fluid">
          <div className="row align-items-center py-2">
            {/* Logo and Title */}
            <div className="col-md-8 col-lg-9">
              <div className="d-flex align-items-center">
                <div className="logo-container mr-3">
                  <Link to="/">
                    <img 
                      src="../Images/tnebea_logo_cropped2.png" 
                      alt="TNEBEA Logo" 
                      className="header-logo"
                    />
                  </Link>
                </div>
                <div className="header-text">
                  <h1 className="text-primary mb-1">
                    Tamilnadu Electricity Board | Engineers Association
                  </h1>
                  <p className="text-secondary sub-heading mb-0">
                    The association was formed &amp; registered in 1946.
                  </p>
                </div>
              </div>
            </div>

            {/* Search and Time */}
            <div className="col-md-4 col-lg-3">
              <div className="header-right">
                <form className="search-form mb-2">
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      placeholder="Search Portal Content"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary btn-sm" type="button">
                        <FaSearch />
                      </button>
                    </div>
                  </div>
                </form>
                <div className="current-time text-secondary">
                  <small>{currentTime}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Navigation */}
      <nav className="main-navbar navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <button 
            className="navbar-toggler" 
            type="button" 
            data-toggle="collapse" 
            data-target="#mainNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav w-100">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <FaHome className="mr-1" /> Home
                </Link>
              </li>
              
              {/* About TNEBEA with Dropdown */}
              <li className="nav-item dropdown active">
                <a className="nav-link dropdown-toggle" href="#" id="aboutDropdown">
                  About TNEBEA
                </a>
                <div className="dropdown-menu">
                  <Link className="dropdown-item active" to="/cec">
                    CEC
                  </Link>
                </div>
              </li>

              {/* TNEB General Info with Dropdown */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="tnebInfoDropdown">
                  TNEB General Info
                </a>
                <div className="dropdown-menu">
                  <Link className="dropdown-item" to="/act-regulations">
                    Act & Regulations
                  </Link>
                  <Link className="dropdown-item" to="/manuals-and-forms">
                    TNEB Regulations, Manual & Forms
                  </Link>
                  <Link className="dropdown-item" to="/pension-scheme">
                    CONTRIBUTORY PENSION SCHEME
                  </Link>
                  <Link className="dropdown-item" to="/distribution-instructions">
                    DISTRIBUTION RELATED INSTRUCTIONS – AGRI, DOMESTIC, COMMERCIAL
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
                <a className="nav-link dropdown-toggle" href="#" id="techDropdown">
                  Technical Corner
                </a>
                <div className="dropdown-menu">
                  <Link className="dropdown-item" to="/technical-qa">Technical Q&A</Link>
                  <Link className="dropdown-item" to="/technical-parameters">Technical Parameters</Link>
                  <Link className="dropdown-item" to="/technical-books">
                    TECHNICAL BOOKS AND MANUALS
                  </Link>
                </div>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/news">News</Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact Us</Link>
              </li>
              
              <li className="nav-item">
                <a className="nav-link" href="http://tneb.tnebnet.org/emp/forms.html" target="_blank" rel="noopener noreferrer">
                  TNEBEA FORMS
                </a>
              </li>

              {/* User Icon with Dropdown */}
              <li className="nav-item ml-auto dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="userDropdown">
                  <FaUser />
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <Link className="dropdown-item" to="/login">Login</Link>
                  <Link className="dropdown-item" to="/register">Register</Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="cec-content">
        <div className="container">
          <div className="cec-header text-center mb-5">
            <h1 className="cec-main-title">TNEB ENGINEERS' ASSOCIATION</h1>
            <h2 className="cec-sub-title">CENTRAL EXECUTIVE COMMITTEE – 2025-2027</h2>
          </div>

          {/* Principal Secretary Special Table */}
          <div className="principal-secretary-section mb-5">
            <div className="card shadow-lg">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0 text-center">Principal Secretary (National & State Affairs)</h4>
              </div>
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-3 text-center mb-3 mb-md-0">
                    <div className="member-photo-container">
                      <img 
                        src={cecMembers[0].photo} 
                        alt={cecMembers[0].name}
                        className="member-photo"
                      />
                    </div>
                  </div>
                  <div className="col-md-9">
                    <h3 className="member-name mb-2">{cecMembers[0].name}</h3>
                    <p className="member-qualification mb-3">{cecMembers[0].qualification}</p>
                    <div className="member-contact">
                      <h5 className="contact-title mb-2">Contact:</h5>
                      <div className="contact-info">
                        <FaPhone className="mr-2" />
                        <span className="contact-number">{cecMembers[0].contact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CEC Members Table */}
          <div className="cec-members-section">
            <div className="card shadow-lg">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0 text-center">Central Executive Committee Members</h4>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover mb-0">
                    <thead className="thead-light">
                      <tr>
                        <th style={{ width: '60px' }}>S.No</th>
                        <th style={{ width: '200px' }}>Designation</th>
                        <th style={{ width: '300px' }}>Name & Qualification</th>
                        <th style={{ width: '180px' }}>Photo</th>
                        <th style={{ width: '150px' }}>Contact No.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cecMembers.slice(1).map((member) => (
                        <tr key={member.id}>
                          <td className="text-center align-middle">
                            <span className="serial-number">{member.serialNo}</span>
                          </td>
                          <td className="text-center align-middle">
                            <strong>{member.designation}</strong>
                          </td>
                          <td>
                            <div className="member-info">
                              <h6 className="member-name mb-1">{member.name}</h6>
                              <p className="member-qualification mb-0">
                                <em>{member.qualification}</em>
                              </p>
                            </div>
                          </td>
                          <td className="text-center align-middle">
                            <div className="member-photo-container">
                              <img 
                                src={member.photo} 
                                alt={member.name}
                                className="member-photo"
                              />
                            </div>
                          </td>
                          <td className="text-center align-middle">
                            <div className="contact-info">
                              <FaPhone className="mr-1" />
                              <strong>{member.contact}</strong>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Committee Information */}
          <div className="committee-info mt-5">
            <div className="row">
              <div className="col-lg-6 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-header bg-info text-white">
                    <h5 className="mb-0">Committee Term</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled">
                      <li className="mb-2">
                        <strong>Term Duration:</strong> 2025-2027 (2 Years)
                      </li>
                      <li className="mb-2">
                        <strong>Elected On:</strong> October 2025
                      </li>
                      <li className="mb-2">
                        <strong>Next Election:</strong> October 2027
                      </li>
                      <li className="mb-2">
                        <strong>Total Members:</strong> 15
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-6 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-header bg-info text-white">
                    <h5 className="mb-0">Committee Responsibilities</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled">
                      <li className="mb-2">
                        <strong>Policy Making:</strong> Formulate association policies
                      </li>
                      <li className="mb-2">
                        <strong>Member Welfare:</strong> Address member concerns
                      </li>
                      <li className="mb-2">
                        <strong>Administration:</strong> Manage association affairs
                      </li>
                      <li className="mb-2">
                        <strong>Coordination:</strong> Liaise with TNEB management
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact for Queries */}
          <div className="contact-queries mt-4">
            <div className="alert alert-success">
              <h5 className="alert-heading">For Committee Related Queries</h5>
              <p className="mb-2">
                Please contact the General Secretary: <strong>Er. K. VIJAY</strong>
              </p>
              <p className="mb-0">
                <FaPhone className="mr-2" />
                <strong>Phone:</strong> 94897 74341
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-slider">
          <div className="container">
            <div className="slider-circular">
              {[...footerImages, ...footerImages].map((img, index) => (
                <div key={index} className="slider-item">
                  <a href={img.link} target="_blank" rel="noopener noreferrer">
                    <img 
                      src={img.src} 
                      alt={img.alt}
                      className="img-fluid footer-slider-img"
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-2 text-left text-white">
                <FaSmile className="mr-1" />
                <span className="small">TNEBEA</span>
              </div>
              <div className="col-md-6 text-center">
                <span className="text-white">Copyright © TNEBEA 2025</span>
              </div>
              <div className="col-md-4 text-right footer-links">
                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="/terms">Terms & Conditions</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Cec;