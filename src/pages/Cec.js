import React, { useState } from 'react';
import { FaUsers, FaPhone, FaTimes, FaCalendarAlt, FaClipboardList, FaHandshake, FaUserTie, FaCog, FaIdCard, FaInfoCircle, FaPhoneAlt, FaStar, FaCrown } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './Cec.css';
// Import images
const memberImages = [
  require('../assets/people/Jayanthi.jpg'),
  require('../assets/people/SENTHILKUMAR.jpg'),
  require('../assets/people/SATHIAMURTHY.jpg'),
  require('../assets/people/SAMBATHKUMAR.jpg'),
  require('../assets/people/VIJAY.jpg'),
  require('../assets/people/JAYAPRAKASH.jpg'),
  require('../assets/people/ARUNACHALAM.jpg'),
  require('../assets/people/VARUNKUMAR.jpg'),
  require('../assets/people/VIKRAMAN.jpg'),
  require('../assets/people/ANANDKUMAR.jpg'),
  require('../assets/people/DURGADEVI.jpg'),
  require('../assets/people/ROSELINEGRACE.jpg'),
  require('../assets/people/GOMATHI.jpg'),
  require('../assets/people/JAYAMURTHI.jpg'),
  require('../assets/people/BALAMURUGAN.jpg')
];

const Cec = () => {
  // const [selectedMember, setSelectedMember] = useState(null);
  // const [modalVisible, setModalVisible] = useState(false);

  const cecMembers = [
    { id: 0, serialNo: null, designation: "Principal Secretary", name: "Er. T. Jayanthi", qualification: "M.Tech/MBA(HR)/BGL/MIE", contact: "97106 22185", photo: memberImages[0] },
    { id: 1, serialNo: 1, designation: "President", name: "Er. N. SENTHIL KUMAR", qualification: "EE/Master Plan/TANTRANSCO/HQ", contact: "94980 38894", photo: memberImages[1] },
    { id: 2, serialNo: 2, designation: "Vice President-I", name: "Er. M. SATHIAMURTHY", qualification: "EE/Master Plan-II/TNPDL", contact: "94443 55366", photo: memberImages[2] },
    { id: 3, serialNo: 3, designation: "Vice President-II", name: "Er. S. SAMBATHKUMAR", qualification: "AEE/Civil/TLC/GCC-II", contact: "63833 84748", photo: memberImages[3] },
    { id: 4, serialNo: 4, designation: "General Secretary", name: "Er. K. VIJAY", qualification: "EA to CE/MTPS-I", contact: "94897 74341", photo: memberImages[4] },
    { id: 5, serialNo: 5, designation: "Treasurer", name: "Er. J. JAYAPRAKASH", qualification: "Senior Manager/IS/Krishnagiri", contact: "94874 65104", photo: memberImages[5] },
    { id: 6, serialNo: 6, designation: "Organising Secretary", name: "Er. N. ARUNACHALAM", qualification: "AEE/SLDC/ERODE", contact: "94458 59614", photo: memberImages[6] },
    { id: 7, serialNo: 7, designation: "Secretary (Publication)", name: "Er. G. VARUN KUMAR", qualification: "AE/ERP/IT/HQ", contact: "97908 30459", photo: memberImages[7] },
    { id: 8, serialNo: 8, designation: "Secretary (Administration)", name: "Er. G. VIKRAMAN", qualification: "AEE/O&M/Thennur/Trichy", contact: "94421 14221", photo: memberImages[8] },
    { id: 9, serialNo: 9, designation: "Secretary (Minnagam)", name: "Er. D. ANAND KUMAR", qualification: "AEE/Turbine Maintenance/NCTPS-II", contact: "98948 12568", photo: memberImages[9] },
    { id: 10, serialNo: 10, designation: "Secretary (Legal)", name: "Er. A. DURGA DEVI", qualification: "AEE/Schemes/Madurai", contact: "94434 56136", photo: memberImages[10] },
    { id: 11, serialNo: 11, designation: "Secretary (Personnel Affairs)", name: "Er. J. ROSELINE GRACE", qualification: "AEE/C&I/Kuzhithurai", contact: "94896 18015", photo: memberImages[11] },
    { id: 12, serialNo: 12, designation: "Secretary (Internal Affairs)", name: "Er. K. GOMATHI", qualification: "AE/O&M/West/Coimbatore", contact: "75027 36561", photo: memberImages[12] },
    { id: 13, serialNo: 13, designation: "Secretary/EBF", name: "Er. C. R. JAYAMURTHI", qualification: "SE/Transmission/765 KVSS", contact: "96000 82034", photo: memberImages[13] },
    { id: 14, serialNo: 14, designation: "Treasurer/EBF", name: "Er. R. BALAMURUGAN", qualification: "AEE/MRT/Metering/Chennai", contact: "99625 11494", photo: memberImages[14] }
  ];

  // const openDialog = (member) => {
  //   setSelectedMember(member);
  //   setModalVisible(true);
  // };

  // const closeDialog = () => {
  //   setModalVisible(false);
  //   setTimeout(() => setSelectedMember(null), 300);
  // };

  const showMemberDetails = (member) => {
    Swal.fire({
      title: `<strong>${member.name}</strong>`,
      html: `
        <div style="text-align: center; padding: 20px;">
          <img src="${member.photo}" alt="${member.name}" style="width: 180px; height: 220px; border-radius: 15px; object-fit: cover; margin-bottom: 20px; border: 3px solid #1b5baf;" />
          <h3 style="color: #1b5baf; margin-bottom: 10px;">${member.designation}</h3>
          <p style="color: #666; font-size: 1rem; margin-bottom: 15px;">${member.qualification}</p>
          <div style="display: flex; align-items: center; justify-content: center; gap: 10px; background: #e3f2fd; padding: 15px; border-radius: 10px; margin-top: 20px;">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.2em" width="1.2em" style="color: #1b5baf;"><path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path></svg>
            <strong style="color: #1b5baf; font-size: 1.2rem;">${member.contact}</strong>
          </div>
        </div>
      `,
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Call Now',
      confirmButtonColor: '#1b5baf',
      width: 600,
      padding: '2em',
      backdrop: `rgba(0,0,0,0.8)`,
      customClass: {
        popup: 'member-details-popup',
        title: 'member-details-title',
        htmlContainer: 'member-details-content'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `tel:${member.contact}`;
      }
    });
  };

  return (
    <div className="cec-container">
      {/* Hero Section */}
      <div className="cec-hero">
        <div className="cec-hero-content">
          <FaUsers className="hero-icon" />
          <h1>TNEB ENGINEERS' ASSOCIATION</h1>
          <div className="hero-divider"></div>
          <h2>CENTRAL EXECUTIVE COMMITTEE 2025-2027</h2>
          <p>Leading with Excellence & Integrity</p>
        </div>
      </div>

      {/* Principal Secretary Card */}
      <div className="ps-section">
        <div className="ps-card">
          <div className="ps-header">
            <h3><FaStar /> Principal Secretary</h3>
            <p>National & State Affairs</p>
          </div>
          <div className="ps-content">
            <img src={cecMembers[0].photo} alt={cecMembers[0].name} />
            <div className="ps-details">
              <h4>{cecMembers[0].name}</h4>
              <p className="ps-qual">{cecMembers[0].qualification}</p>
              <div className="ps-contact">
                <FaPhone /> {cecMembers[0].contact}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Committee Members Grid */}
      <div className="members-grid-section">
        <h3><FaUsers /> Executive Committee Members</h3>
        <p className="section-sub">Click or hover for details</p>
        
        <div className="members-grid">
          {cecMembers.slice(1).map((member) => (
            <div key={member.id} className="member-card">
              <div className="card-front">
                <img src={member.photo} alt={member.name} />
                <div className="card-info">
                  <h5>{member.name.split(' ').pop()}</h5>
                  <p>{member.designation}</p>
                </div>
              </div>
              <div className="card-back">
                <h5>{member.name}</h5>
                <p className="back-designation">{member.designation}</p>
                <p className="back-qual"><FaIdCard /> {member.qualification}</p>
                <p className="back-contact"><FaPhone /> {member.contact}</p>
                <button onClick={(e) => { e.stopPropagation(); showMemberDetails(member); }}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Cards */}
      <div className="info-cards">
        <div className="info-card term-card">
          <div className="info-header">
            <FaCalendarAlt className="header-icon" />
            <span>Committee Term</span>
          </div>
          <div className="info-body">
            <div className="info-item">
              <div className="info-icon"><FaCalendarAlt /></div>
              <div className="info-content">
                <span className="info-label">Current Term</span>
                <strong className="info-value">2025-2027</strong>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon"><FaClipboardList /></div>
              <div className="info-content">
                <span className="info-label">Elected</span>
                <strong className="info-value">October 2025</strong>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon"><FaCalendarAlt /></div>
              <div className="info-content">
                <span className="info-label">Next Election</span>
                <strong className="info-value">October 2027</strong>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon"><FaUsers /></div>
              <div className="info-content">
                <span className="info-label">Total Members</span>
                <strong className="info-value">15</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="info-card resp-card">
          <div className="info-header">
            <FaCog className="header-icon" />
            <span>Responsibilities</span>
          </div>
          <div className="info-body">
            <div className="resp-item">
              <div className="resp-icon"><FaClipboardList /></div>
              <div className="resp-content">
                <h5>Policy Making</h5>
                <p>Strategic decisions & guidelines</p>
              </div>
            </div>
            <div className="resp-item">
              <div className="resp-icon"><FaUserTie /></div>
              <div className="resp-content">
                <h5>Member Welfare</h5>
                <p>Support & development programs</p>
              </div>
            </div>
            <div className="resp-item">
              <div className="resp-icon"><FaCog /></div>
              <div className="resp-content">
                <h5>Administration</h5>
                <p>Operational management</p>
              </div>
            </div>
            <div className="resp-item">
              <div className="resp-icon"><FaHandshake /></div>
              <div className="resp-content">
                <h5>Coordination</h5>
                <p>Inter-departmental liaison</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Query */}
      <div className="contact-query" onClick={() => showMemberDetails(cecMembers[4])}>
        <div className="query-header">
          <FaInfoCircle />
          <div>
            <h5>For Committee Queries</h5>
            <p>Tap to view details</p>
          </div>
        </div>
        <div className="query-body">
          <p className="query-label">General Secretary</p>
          <p className="query-name">{cecMembers[4].name}</p>
          <p className="query-name">{cecMembers[4].qualification}</p>
          <p className="query-phone"><FaPhoneAlt /> {cecMembers[4].contact}</p>
        </div>
      </div>

      {/* Enhanced Modal */}
      {/* {selectedMember && (
        <div className={`modal-overlay ${modalVisible ? 'visible' : ''}`} onClick={closeDialog}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeDialog}><FaTimes /></button>
            
            <div className="modal-header">
              <div className="modal-badge">
                {selectedMember.id === 0 ? <FaCrown /> : `#${selectedMember.serialNo}`}
              </div>
              <h4>{selectedMember.designation}</h4>
            </div>
            
            <div className="modal-body">
              <img src={selectedMember.photo} alt={selectedMember.name} />
              <h3>{selectedMember.name}</h3>
              <p className="modal-qual">{selectedMember.qualification}</p>
              
              <div className="modal-contact">
                <div className="contact-item">
                  <FaPhone />
                  <div>
                    <span>Contact</span>
                    <strong>{selectedMember.contact}</strong>
                  </div>
                </div>
                
                <div className="contact-item">
                  <FaUserTie />
                  <div>
                    <span>Position</span>
                    <strong>{selectedMember.designation}</strong>
                  </div>
                </div>
              </div>
              
              <div className="modal-actions">
                <button className="modal-btn primary">Call Now</button>
                <button className="modal-btn secondary">Share</button>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Cec;