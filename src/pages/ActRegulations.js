// ActRegulations.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilePdf, FaCalendar, FaDownload, FaSmile, FaHome, FaUser } from 'react-icons/fa';
import './ActRegulations.css';


const ActRegulations = () => {
  const [currentTime, setCurrentTime] = useState('');



  // Document links data
  const documents = [
    {
      id: 1,
      title: "TNEB Conduct Regulations",
      path: "./documents/TNEBConductRegulations.pdf",
      filename: "TNEBConductRegulations.pdf"
    },
    {
      id: 2,
      title: "TNEB Discipline and Appeal Regulations",
      path: "./documents/TNEBDARegulations.pdf",
      filename: "TNEBDARegulations.pdf"
    },
    {
      id: 3,
      title: "TNEB Leave Regulations",
      path: "./documents/TNEBLeaveRegulations.pdf",
      filename: "TNEBLeaveRegulations.pdf"
    },
    {
      id: 4,
      title: "TNERC Amendments to the Tamil Nadu Electricity Supply Code & Distribution code",
      path: "./documents/TNERC-Amendments-to-SC-DC.pdf",
      filename: "TNERC-Amendments-to-SC-DC.pdf",
      note: "(Notification No. TNERC/SC/7–40, dated 18-12-2019.) (Notification No. TNERC/DC/8–25 dated 18-12-2019.)"
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
    <div className="act-regulations-container">
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
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="aboutDropdown">
                  About TNEBEA
                </a>
                <div className="dropdown-menu">
                  <Link className="dropdown-item" to="/cec">CEC</Link>
                </div>
              </li>

              {/* TNEB General Info with Dropdown */}
              <li className="nav-item dropdown active">
                <a className="nav-link dropdown-toggle" href="#" id="tnebInfoDropdown">
                  TNEB General Info
                </a>
                <div className="dropdown-menu">
                  <Link className="dropdown-item active" to="/act-regulations">
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
      <main className="act-regulations-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-header mb-4">
                <h1 className="text-primary">
                  <FaFilePdf className="mr-2" />
                  Act & Regulations
                </h1>
                <p className="text-muted">Important documents and regulations for TNEB engineers</p>
              </div>
              
              <div className="documents-container">
                <div className="card shadow-sm">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Official Documents</h5>
                  </div>
                  <div className="card-body">
                    <div className="documents-list">
                      {documents.map((doc) => (
                        <div key={doc.id} className="document-item mb-4 p-3 border rounded">
                          <div className="d-flex align-items-start">
                            <div className="document-icon mr-3">
                              <FaFilePdf className="text-danger fa-2x" />
                            </div>
                            <div className="document-details flex-grow-1">
                              <h6 className="mb-2">
                                <a 
                                  href={doc.path} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-decoration-none text-dark font-weight-bold"
                                >
                                  {doc.title}
                                </a>
                              </h6>
                              <div className="document-meta d-flex justify-content-between align-items-center">
                                <small className="text-muted">
                                  <FaCalendar className="mr-1" />
                                  PDF Document
                                </small>
                                <small className="text-muted">
                                  <FaDownload className="mr-1" />
                                  {doc.filename}
                                </small>
                              </div>
                              {doc.note && (
                                <div className="document-note mt-2">
                                  <p className="mb-0 text-secondary small">
                                    <em>{doc.note}</em>
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="additional-info mt-4">
                      <div className="alert alert-info">
                        <h6 className="alert-heading">Important Notes:</h6>
                        <ul className="mb-0 pl-3">
                          <li>All documents are in PDF format</li>
                          <li>Click on document titles to view/download</li>
                          <li>Documents open in new tab/window</li>
                          <li>Ensure you have PDF reader installed</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>


    </div>
  );
};

export default ActRegulations;