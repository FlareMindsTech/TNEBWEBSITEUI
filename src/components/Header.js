import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import logo from '../assets/tnebea_logo_cropped2.png';

const Header = () => {
  const [currentTime, setCurrentTime] = useState('');

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
    <>
      {/* Top Carousel with Sentences */}
      <div className="sentence-carousel">
        <div className="sentence-track">
          {[
            "Welcome to Tamilnadu Electricity Board Engineers Association",
            "Serving Engineers Since 1946",
            "Powering Tamil Nadu's Progress",
            "Engineering Excellence in Electricity"
          ].map((sentence, index) => (
            <div key={index} className="sentence-item">
              <div className="circular-icon">
                <img src={logo} alt="Icon" />
              </div>
              <span className="sentence-text">{sentence}</span>
            </div>
          ))}
        </div>
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
                      src={logo}
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
      <Navbar />
    </>
  );
};

export default Header;
