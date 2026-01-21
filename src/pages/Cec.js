// Cec.js
import React, { useState } from 'react';
import { FaUser, FaPhone, FaTimes, FaCalendarAlt, FaUsers, FaClipboardList, FaHandshake, FaUserTie, FaCog, FaIdCard, FaImage, FaMobile, FaInfoCircle, FaPhoneAlt, FaLinkedin, FaTwitter, FaEnvelope, FaStar, FaCrown } from 'react-icons/fa';
import './Cec.css';
import ANANDKUMAR from '../assets/people/ANANDKUMAR.jpg';
import ARUNACHALAM from '../assets/people/ARUNACHALAM.jpg';
import BALAMURUGAN from '../assets/people/BALAMURUGAN.jpg';
import DURGADEVI from '../assets/people/DURGADEVI.jpg';
import GOMATHI from '../assets/people/GOMATHI.jpg';
import JAYAMURTHI from '../assets/people/JAYAMURTHI.jpg';
import JAYAPRAKASH from '../assets/people/JAYAPRAKASH.jpg';
import Jayanthi from '../assets/people/Jayanthi.jpg';
import ROSELINEGRACE from '../assets/people/ROSELINEGRACE.jpg';
import SAMBATHKUMAR from '../assets/people/SAMBATHKUMAR.jpg';
import SATHIAMURTHY from '../assets/people/SATHIAMURTHY.jpg';
import SENTHILKUMAR from '../assets/people/SENTHILKUMAR.jpg';
import VARUNKUMAR from '../assets/people/VARUNKUMAR.jpg';
import VIJAY from '../assets/people/VIJAY.jpg';
import VIKRAMAN from '../assets/people/VIKRAMAN.jpg';

const Cec = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const openDialog = (member) => {
    setSelectedMember(member);
  };

  const closeDialog = () => {
    setSelectedMember(null);
  };

  // CEC Members Data
  const cecMembers = [
    {
      id: 0,
      serialNo: null,
      designation: "Principal Secretary (National & State Affairs)",
      name: "Er. T. Jayanthi",
      qualification: "M.Tech/MBA(HR)/BGL/MIE.,",
      photo: Jayanthi,
      contact: "97106 22185"
    },
    {
      id: 1,
      serialNo: 1,
      designation: "President",
      name: "Er. N. SENTHIL KUMAR",
      qualification: "EE/Master Plan/TANTRANSCO/HQ CHENNAI",
      photo: SENTHILKUMAR,
      contact: "94980 38894"
    },
    {
      id: 2,
      serialNo: 2,
      designation: "Vice President-I",
      name: "Er. M. SATHIAMURTHY",
      qualification: "EE/Master Plan-II/TNPDL/HQ CHENNAI",
      photo: SATHIAMURTHY,
      contact: "94443 55366"
    },
    {
      id: 3,
      serialNo: 3,
      designation: "Vice President-II",
      name: "Er. S. SAMBATHKUMAR",
      qualification: "AEE/Civil/TLC/GCC-II/CHENNAI",
      photo: SAMBATHKUMAR,
      contact: "63833 84748"
    },
    {
      id: 4,
      serialNo: 4,
      designation: "General Secretary",
      name: "Er. K. VIJAY",
      qualification: "EA to CE/MTPS-I",
      photo: VIJAY,
      contact: "94897 74341"
    },
    {
      id: 5,
      serialNo: 5,
      designation: "Treasurer",
      name: "Er. J. JAYAPRAKASH",
      qualification: "Senior Manager/IS/Krishnagiri",
      photo: JAYAPRAKASH,
      contact: "94874 65104"
    },
    {
      id: 6,
      serialNo: 6,
      designation: "Organising Secretary",
      name: "Er. N. ARUNACHALAM",
      qualification: "AEE/SLDC/ERODE",
      photo: ARUNACHALAM,
      contact: "94458 59614"
    },
    {
      id: 7,
      serialNo: 7,
      designation: "Secretary (Publication)",
      name: "Er. G. VARUN KUMAR",
      qualification: "AE/ERP/IT/HQ CHENNAI",
      photo: VARUNKUMAR,
      contact: "97908 30459"
    },
    {
      id: 8,
      serialNo: 8,
      designation: "Secretary (Administration)",
      name: "Er. G. VIKRAMAN",
      qualification: "AEE/O&M/Thennur/Trichy Metro",
      photo: VIKRAMAN,
      contact: "94421 14221"
    },
    {
      id: 9,
      serialNo: 9,
      designation: "Secretary (Minnagam)",
      name: "Er. D. ANAND KUMAR",
      qualification: "AEE/Turbine Maintenance/NCTPS-II",
      photo: ANANDKUMAR,
      contact: "98948 12568"
    },
    {
      id: 10,
      serialNo: 10,
      designation: "Secretary (Legal)",
      name: "Er. A. DURGA DEVI",
      qualification: "AEE/Schemes/Madurai",
      photo: DURGADEVI,
      contact: "94434 56136"
    },
    {
      id: 11,
      serialNo: 11,
      designation: "Secretary (Personnel Affairs)",
      name: "Er. J. ROSELINE GRACE",
      qualification: "AEE/C&I/Kuzhithurai/Kanyakumari",
      photo: ROSELINEGRACE,
      contact: "94896 18015"
    },
    {
      id: 12,
      serialNo: 12,
      designation: "Secretary (Internal Affairs)",
      name: "Er. K. GOMATHI",
      qualification: "AE/O&M/West/Kinathukadavu/South/Coimbatore",
      photo: GOMATHI,
      contact: "75027 36561"
    },
    {
      id: 13,
      serialNo: 13,
      designation: "Secretary/EBF",
      name: "Er. C. R. JAYAMURTHI",
      qualification: "SE/Transmission/765 KVSS/HQ CHENNAI",
      photo: JAYAMURTHI,
      contact: "96000 82034"
    },
    {
      id: 14,
      serialNo: 14,
      designation: "Treasurer/EBF",
      name: "Er. R. BALAMURUGAN",
      qualification: "AEE/MRT/Metering/Chennai South-I",
      photo: BALAMURUGAN,
      contact: "99625 11494"
    }
  ];

  return (
    <div className="cec-container">
      {/* Main Content */}
      <main className="cec-content">
        <div className="container">
          <div className="cec-header text-center mb-5">
            <div className="header-icon-container">
              <FaUsers className="header-icon" />
            </div>
            <h1 className="cec-main-title">TNEB ENGINEERS' ASSOCIATION</h1>
            <div className="header-divider"></div>
            <h2 className="cec-sub-title">CENTRAL EXECUTIVE COMMITTEE – 2025-2027</h2>
            <p className="header-description">Dedicated Leadership for Professional Excellence</p>
          </div>

          {/* Principal Secretary Special Card */}
          <div className="principal-secretary-section mb-5">
            <div className="ps-card-wrapper">
              <div className="ps-card" onClick={() => openDialog(cecMembers[0])}>
                <div className="ps-card-badge">
                  <FaCrown className="ps-badge-icon" />
                </div>
                
                <div className="ps-card-header">
                  <h3 className="ps-designation">
                    <FaStar className="ps-designation-icon" />
                    Principal Secretary
                  </h3>
                  <p className="ps-subtitle">National & State Affairs</p>
                </div>

                <div className="ps-card-content">
                  <div className="ps-photo-wrapper">
                    <img
                      src={cecMembers[0].photo}
                      alt={cecMembers[0].name}
                      className="ps-photo"
                    />
                  </div>

                  <div className="ps-info-section">
                    <h4 className="ps-member-name">{cecMembers[0].name}</h4>
                    <p className="ps-qualification">{cecMembers[0].qualification}</p>

                    <div className="ps-contact-group">
                      <div className="ps-contact-item">
                        <FaPhone className="ps-contact-icon" />
                        <span>{cecMembers[0].contact}</span>
                      </div>
                    </div>

                    <button className="ps-view-button">
                      View Full Profile
                    </button>
                  </div>
                </div>

                <div className="ps-card-footer">
                  <div className="ps-footer-badge">Leadership</div>
                </div>
              </div>
            </div>
          </div>

          {/* CEC Members Flip Cards Section */}
          <div className="cec-members-section">
            <div className="section-header mb-5">
              <h3 className="section-title text-center">
                <FaUsers className="mr-3" />Central Executive Committee Members
              </h3>
              <p className="section-subtitle text-center">Hover to reveal member details</p>
            </div>

            <div className="flip-cards-container">
              {cecMembers.slice(1).map((member) => (
                <div key={member.id} className="flip-card-wrapper">
                  <div className="flip-card">
                    {/* Front of card */}
                    <div className="flip-card-front">
                      <div className="card-serial-badge">{member.serialNo}</div>
                      <div className="flip-card-image">
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="card-photo"
                        />
                      </div>
                      <div className="flip-card-info">
                        <h4 className="card-member-name">{member.name.split(' ').pop()}</h4>
                        <p className="card-designation">{member.designation}</p>
                      </div>
                    </div>

                    {/* Back of card */}
                    <div className="flip-card-back">
                      <div className="back-content">
                        <h5 className="back-name">{member.name}</h5>
                        <div className="back-designation">{member.designation}</div>
                        <div className="back-qualification">
                          <FaIdCard className="mr-2" />
                          {member.qualification}
                        </div>
                        <div className="back-contact">
                          <FaPhone className="contact-icon" />
                          <span>{member.contact}</span>
                        </div>
                        <button 
                          className="details-button"
                          onClick={() => openDialog(member)}
                        >
                          View Full Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
                        <FaCalendarAlt className="list-icon" />
                        <strong>Term Duration:</strong> <span>2025-2027 (2 Years)</span>
                      </li>
                      <li className="mb-2">
                        <FaClipboardList className="list-icon" />
                        <strong>Elected On:</strong> <span>October 2025</span>
                      </li>
                      <li className="mb-2">
                        <FaCalendarAlt className="list-icon" />
                        <strong>Next Election:</strong> <span>October 2027</span>
                      </li>
                      <li className="mb-2">
                        <FaUsers className="list-icon" />
                        <strong>Total Members:</strong> <span>15</span>
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
                        <FaClipboardList className="list-icon" />
                        <strong>Policy Making:</strong> <span>Formulate association policies</span>
                      </li>
                      <li className="mb-2">
                        <FaUserTie className="list-icon" />
                        <strong>Member Welfare:</strong> <span>Address member concerns</span>
                      </li>
                      <li className="mb-2">
                        <FaCog className="list-icon" />
                        <strong>Administration:</strong> <span>Manage association affairs</span>
                      </li>
                      <li className="mb-2">
                        <FaHandshake className="list-icon" />
                        <strong>Coordination:</strong> <span>Liaise with TNEB management</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact for Queries */}
          <div className="contact-queries mt-4">
            <div
              className="alert alert-success contact-query-card"
              style={{ cursor: 'pointer' }}
              onClick={() => openDialog(cecMembers[4])}
            >
              <div className="contact-query-header">
                <div className="contact-query-icon">
                  <FaInfoCircle />
                </div>
                <div>
                  <h5 className="alert-heading mb-1">For Committee Related Queries</h5>
                  <p className="contact-query-subtext mb-0">Tap to view details</p>
                </div>
              </div>
              <div className="contact-query-body">
                <div className="contact-query-label">General Secretary</div>
                <div className="contact-query-name">Er. K. VIJAY</div>
                <div className="contact-query-name">EA to CE/MTPS-I</div>
                <div className="contact-query-phone">
                  <FaPhoneAlt className="mr-2" />
                  <strong>94897 74341</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Member Dialog */}
      {selectedMember && (
        <div className="member-dialog-overlay" onClick={closeDialog}>
          <div
            className="member-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-button" onClick={closeDialog}>
              <FaTimes />
            </button>
            <div className="dialog-content text-center">
              <div className="dialog-photo-container mb-3">
                <img
                  src={selectedMember.photo}
                  alt={selectedMember.name}
                  className="dialog-photo"
                />
              </div>
              <h4 className="dialog-designation mb-2">{selectedMember.designation}</h4>
              <h5 className="dialog-name mb-2">{selectedMember.name}</h5>
              <p className="dialog-qualification mb-3">{selectedMember.qualification}</p>
              <div className="dialog-contact">
                <FaPhone className="mr-2" />
                <strong>{selectedMember.contact}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cec;