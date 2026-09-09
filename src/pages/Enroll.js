import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaCog, FaArrowLeft } from 'react-icons/fa';
import './Enroll.css';

const Enroll = () => {
  return (
    <div className="enroll-page-wrapper">
      <div className="enroll-card">
        <div className="enroll-icon-wrapper">
          <FaCog className="enroll-gear-bg" />
          <FaUserPlus className="enroll-main-icon" />
        </div>
        
        <h2 className="enroll-title">Enrollment</h2>
        
        <p className="enroll-subtitle">
          This page is under development
        </p>
        
        <Link to="/" className="enroll-home-btn">
          <FaArrowLeft /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Enroll;

