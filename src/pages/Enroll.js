import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaCog, FaArrowLeft } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BoardProceedings.css';

const Enroll = () => {
  return (
    <div className="board-proceedings-container">
      <div className="board-proceedings-card">
        <div className="bp-icon-container">
          <FaUserPlus className="bp-main-icon" />
          <FaCog className="bp-gear-bg" />
        </div>
        
        <h2 className="bp-title">Enrollment</h2>
        
        <p className="bp-description fw-bold text-primary fs-4">
          This page is under development
        </p>
        
        <Link to="/" className="bp-home-btn">
          <FaArrowLeft /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Enroll;
