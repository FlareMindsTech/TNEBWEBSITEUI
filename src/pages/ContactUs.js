// ContactUs.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHome, FaUser, FaSmile, FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import './ContactUs.css';

const ContactUs = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

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

  // Contact information
  const contactInfo = {
    address: "144, Anna Salai, Chennai – 600 002",
    registration: "Regn.No.217/94",
    recognition: "Recognised in G.O.No.854 dated 06.04.1946",
    name: "GS TNEBEA",
    phone: "94897 74341",
    email: "tnebea@gmail.com",
    mapLink: "https://maps.google.com/?q=144+Anna+Salai+Chennai+600002"
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    alert('Thank you for your message. We will get back to you soon!');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-us-container">
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
              
              <li className="nav-item active">
                <Link className="nav-link" to="/contactus">
                  Contact
                </Link>
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
      <main className="contact-us-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              {/* Contact Header Image */}
              <div className="contact-header-image text-center mb-4">
                <img 
                  src="../Images/contactUs-1-1-300x175.jpg" 
                  alt="Contact Us" 
                  className="contact-us-img img-fluid rounded"
                />
              </div>

              <div className="row">
                {/* Contact Information */}
                <div className="col-lg-6 col-md-12 mb-4">
                  <div className="card shadow-sm h-100">
                    <div className="card-header bg-primary text-white">
                      <h4 className="mb-0">TNEB Engineers' Association</h4>
                    </div>
                    <div className="card-body">
                      <div className="contact-info-section">
                        <div className="contact-item mb-4">
                          <div className="d-flex align-items-start">
                            <div className="contact-icon mr-3">
                              <FaMapMarkerAlt className="text-primary fa-lg" />
                            </div>
                            <div>
                              <h6 className="font-weight-bold">Address</h6>
                              <p className="mb-1">{contactInfo.address}</p>
                              <p className="text-muted small mb-1">{contactInfo.registration}</p>
                              <p className="text-muted small mb-0">{contactInfo.recognition}</p>
                              <a 
                                href={contactInfo.mapLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-outline-primary btn-sm mt-2"
                              >
                                View on Map
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="contact-item mb-4">
                          <div className="d-flex align-items-start">
                            <div className="contact-icon mr-3">
                              <FaPhone className="text-primary fa-lg" />
                            </div>
                            <div>
                              <h6 className="font-weight-bold">Contact Person & Phone</h6>
                              <p className="mb-1">{contactInfo.name}</p>
                              <p className="mb-0">
                                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="text-decoration-none">
                                  {contactInfo.phone}
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="contact-item mb-4">
                          <div className="d-flex align-items-start">
                            <div className="contact-icon mr-3">
                              <FaEnvelope className="text-primary fa-lg" />
                            </div>
                            <div>
                              <h6 className="font-weight-bold">Email</h6>
                              <p className="mb-0">
                                <a href={`mailto:${contactInfo.email}`} className="text-decoration-none">
                                  {contactInfo.email}
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="contact-note mt-4">
                          <div className="alert alert-info">
                            <h6 className="alert-heading">Suggestions & Comments</h6>
                            <p className="mb-0">
                              Please send your suggestions and comments to us at: <br />
                              <a href={`mailto:${contactInfo.email}`} className="font-weight-bold">
                                {contactInfo.email}
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="col-lg-6 col-md-12 mb-4">
                  <div className="card shadow-sm h-100">
                    <div className="card-header bg-primary text-white">
                      <h4 className="mb-0">Send us a Message</h4>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                          <label htmlFor="name">Your Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="email">Email Address *</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your email address"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="phone">Phone Number</label>
                          <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="subject">Subject *</label>
                          <input
                            type="text"
                            className="form-control"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter subject of your message"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="message">Your Message *</label>
                          <textarea
                            className="form-control"
                            id="message"
                            name="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            placeholder="Type your message here..."
                          ></textarea>
                        </div>

                        <div className="form-group mb-0">
                          <button type="submit" className="btn btn-primary btn-block">
                            <FaPaperPlane className="mr-2" />
                            Send Message
                          </button>
                        </div>

                        <div className="form-note mt-3">
                          <small className="text-muted">
                            Fields marked with * are required. We'll get back to you as soon as possible.
                          </small>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="row mt-4">
                <div className="col-12">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h5 className="text-primary mb-3">Office Hours & Working Days</h5>
                      <div className="row">
                        <div className="col-md-6">
                          <ul className="list-unstyled">
                            <li className="mb-2">
                              <strong>Office Hours:</strong> 10:00 AM to 5:00 PM
                            </li>
                            <li className="mb-2">
                              <strong>Working Days:</strong> Monday to Friday
                            </li>
                            <li className="mb-2">
                              <strong>Weekend:</strong> Saturday & Sunday
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-6">
                          <ul className="list-unstyled">
                            <li className="mb-2">
                              <strong>Emergency Contact:</strong> Available during office hours only
                            </li>
                            <li className="mb-2">
                              <strong>Response Time:</strong> Within 24-48 hours for emails
                            </li>
                            <li className="mb-2">
                              <strong>Visit by Appointment:</strong> Recommended for detailed discussions
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

export default ContactUs;