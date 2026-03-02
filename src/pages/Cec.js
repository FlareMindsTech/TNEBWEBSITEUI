import React, { useState } from 'react';
import { FaUsers, FaPhone, FaTimes, FaCalendarAlt, FaClipboardList, FaHandshake, FaUserTie, FaCog, FaIdCard, FaInfoCircle, FaPhoneAlt, FaStar, FaCrown, FaUser, FaBriefcase } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useSearch } from '../context/SearchContext';
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
  require('../assets/people/BALAMURUGAN.jpg'),
  require('../assets/people/ANITACELINE.jpeg')
];

const Cec = () => {
  const { searchQuery, isSearchActive } = useSearch();

  const cecMembers = [
    { id: 0, serialNo: null, designation: "Principal Secretary", name: "Er. T. JAYANTHI", qualification: "SE / Comm. Opn / Grid Operation / Hqrs", contact: "97106 22185", photo: memberImages[0] },
    { id: 1, serialNo: 1, designation: "President", name: "Er. N. SENTHILKUMAR", qualification: "EE / Master Plan / Transmission / TANTRANSCO / HQRS / CHENNAI", contact: "94980 38894", photo: memberImages[1] },
    { id: 2, serialNo: 2, designation: "Vice President-I", name: "Er. M. SATHIAMURTHY", qualification: "EE / Master Plan / TNPDCL / HQRS / CHENNAI", contact: "94443 55336", photo: memberImages[2] },
    { id: 3, serialNo: 3, designation: "Vice President-II", name: "Er. S. SAMBATHKUMAR", qualification: "AEE / TLC / GCC-II / GUINDY / CHENNAI", contact: "63833 84748", photo: memberImages[3] },
    { id: 4, serialNo: 4, designation: "General Secretary", name: "Er. K. VIJAY", qualification: "EXECUTIVE ASSISTANT TO CE-MTPS-I METTURDAM", contact: "94897 74341", photo: memberImages[4] },
    { id: 5, serialNo: 5, designation: "Treasurer", name: "Er. J. JAYAPRAKASH", qualification: "SENIOR MANAGER (IS) KRISHNAGIRI", contact: "94874 65104", photo: memberImages[5] },
    { id: 6, serialNo: 6, designation: "Organising Secretary", name: "Er. N. ARUNACHALAM", qualification: "AEE / SLDC / ERODE", contact: "94458 59614", photo: memberImages[6] },
    { id: 7, serialNo: 7, designation: "Secretary (Publication)", name: "Er. G. VARUNKUMAR", qualification: "AE / ERP / HQRS / CHENNAI", contact: "97908 30459", photo: memberImages[7] },
    { id: 8, serialNo: 8, designation: "Secretary (Administration)", name: "Er. G. VIKRAMAN", qualification: "AEE / O&M / PALAKKARAI TRICHY", contact: "94421 14221", photo: memberImages[8] },
    { id: 9, serialNo: 9, designation: "Secretary (Minnagam)", name: "Er. D. ANANDKUMAR", qualification: "AE / TURBINE MAINTENANCE / NCTPS-II", contact: "98948 12568", photo: memberImages[9] },
    { id: 10, serialNo: 10, designation: "Secretary (Legal)", name: "Dr. A. DURGADEVI", qualification: "AEE / SCHEMES / MADURAI", contact: "94434 56136", photo: memberImages[10] },
    { id: 11, serialNo: 11, designation: "Secretary (Internal Affairs)", name: "Er. J. ROSELINE GRACE", qualification: "AEE / C&I / KUZHITHURAI KANYAKUMARI", contact: "94896 18015", photo: memberImages[11] },
    { id: 12, serialNo: 12, designation: "Secretary (Personal Affairs)", name: "Er. K. GOMATHI", qualification: "AE / O&M / WEST KINATHUKADAVU COIMBATORE", contact: "75027 36561", photo: memberImages[12] },
    { id: 13, serialNo: 13, designation: "Secretary/EBF", name: "Er. C. R. JAYAMURTHI", qualification: "SUPERINTENDING ENGINEER / 765KV SS / TANTRANSCO HQRS", contact: "96000 82034", photo: memberImages[13] },
    { id: 14, serialNo: 14, designation: "Treasurer/EBF", name: "Er. R. BALAMURUGAN", qualification: "AEE / MRT / METERING CHENNAI SOUTH", contact: "99625 11494", photo: memberImages[14] },
    { id: 15, serialNo: 15, designation: "Secretary-Coordination", name: "Er. X. ANITA CELINE", qualification: "AEE / ELECTRICAL / COAL", contact: "72990 38100", photo: memberImages[15] }
  ];

  const filteredMembers = cecMembers.filter(member => {
    if (!isSearchActive) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      member.name.toLowerCase().includes(searchLower) ||
      member.designation.toLowerCase().includes(searchLower)
    );
  });

  const showMemberDetails = (member) => {
    Swal.fire({
      title: '',
      html: `
        <div style="text-align: center; padding: 10px; max-width: 560px;">
          <!-- Member Image -->
          <div style="margin-bottom: 18px;">
            <img src="${member.photo}" alt="${member.name}" style="width: 180px; height: 220px; border-radius: 15px; margin-bottom: 15px; border: 4px solid #1b5baf; box-shadow: 0 8px 25px rgba(27, 91, 175, 0.25); object-fit: cover;" />
            <h2 style="color: #1b5baf; font-weight: 700; font-size: 1.6rem; margin: 0 0 8px 0; word-wrap: break-word;">${member.name}</h2>
          </div>

          <!-- Divider -->
          <div style="height: 2px; background: linear-gradient(90deg, transparent, #1b5baf, transparent); margin: 16px 0;"></div>

          <!-- Designation Section -->
          <div style="background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); padding: 12px 14px; border-radius: 10px; margin: 16px 0; border-left: 3px solid #f57c00;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" height="1.1em" width="1.1em" style="color: #f57c00; flex-shrink: 0;"><path d="M622.3 271.1l-115.2-37.5-39.6-115.8c-6.5-19.2-24.8-31.7-45.3-31.7-20.5 0-38.7 12.6-45.2 31.7l-39.7 115.8-115.2 37.5c-19.1 6.2-31.8 24.8-31.8 45.5s12.6 39.3 31.8 45.5l115.2 37.5 39.7 115.8c6.5 19.1 24.8 31.7 45.2 31.7 20.5 0 38.8-12.6 45.3-31.7l39.6-115.8 115.2-37.5c19.2-6.2 31.8-24.8 31.8-45.5-.1-20.7-12.6-39.3-31.8-45.5zM523.5 421L464 306.3l-59.5-19.4L464 267.5 523.5 152.8 583 267.5l59.5 19.4L583 306.3z"></path></svg>
              <div style="text-align: center; width: 100%;">
                <div style="font-size: 0.75rem; color: #f57c00; opacity: 0.8; font-weight: 500;">Position</div>
                <strong style="color: #f57c00; font-size: 1rem;">${member.designation}</strong>
              </div>
            </div>
          </div>

          <!-- Qualification Section -->
          <div style="background: linear-gradient(135deg, #f0f4ff 0%, #f5f9ff 100%); padding: 12px 14px; border-radius: 10px; margin: 12px 0; border-left: 3px solid #2a6cc7;">
            <div style="display: flex; align-items: flex-start; gap: 10px;">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.1em" width="1.1em" style="color: #2a6cc7; margin-top: 2px; flex-shrink: 0;"><path d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 0 480 0 480s61-13.6 123.3-37.2C165.4 479.2 209.6 488 256 488c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-6.9-76.8-20.3 2.5-30.5 23.7-58.2 63.4-79.3 8.4-5 17.7-9.8 27.8-14.2 10.3-4.5 20.8-8.7 31.6-12.5l17-6.8c34.1 73.95-8.3 145.2-63 133.1z"></path></svg>
              <div style="text-align: left; width: 100%;">
                <div style="font-size: 0.75rem; color: #2a6cc7; opacity: 0.8; font-weight: 500;">Designation/Branch</div>
                <div style="color: #2a6cc7; font-size: 0.9rem; line-height: 1.4;">${member.qualification}</div>
              </div>
            </div>
          </div>

          <!-- Contact Section -->
          <div style="display: flex; align-items: center; justify-content: center; gap: 12px; background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); padding: 14px 18px; border-radius: 12px; margin-top: 12px; border-left: 4px solid #1b5baf;">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.3em" width="1.3em" style="color: #1b5baf; flex-shrink: 0;"><path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path></svg>
            <div style="text-align: left; width: 100%;">
              <div style="font-size: 0.75rem; color: #1b5baf; opacity: 0.8; font-weight: 500;">Contact</div>
              <strong style="color: #1b5baf; font-size: 1.1rem;">${member.contact}</strong>
            </div>
          </div>
        </div>
      `,
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: '📞 Call Now',
      confirmButtonColor: '#1b5baf',
      width: 600,
      maxWidth: 600,
      padding: '1.5em',
      backdrop: `rgba(0,0,0,0.8)`,
      allowOutsideClick: false,
      allowEscapeKey: true,
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
                    <h5><FaUser style={{ marginRight: '8px', color: '#2a6cc7' }} />{member.name}</h5>
                    <p><FaBriefcase style={{ marginRight: '6px', color: '#ff6b6b' }} />{member.designation}</p>
                </div>
              </div>
              <div className="card-back">
                <h5>{member.name}</h5>
                <p className="back-designation">{member.designation}</p>
                <p className="back-qual"> {member.qualification}</p>
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
              <div className="cec-info-icon"><FaCalendarAlt /></div>
              <div className="info-content">
                <span className="info-label">Current Term</span>
                <strong className="info-value">2025-2027</strong>
              </div>
            </div>
            <div className="info-item">
              <div className="cec-info-icon"><FaClipboardList /></div>
              <div className="info-content">
                <span className="info-label">Elected</span>
                <strong className="info-value">October 2025</strong>
              </div>
            </div>
            <div className="info-item">
              <div className="cec-info-icon"><FaCalendarAlt /></div>
              <div className="info-content">
                <span className="info-label">Next Election</span>
                <strong className="info-value">October 2027</strong>
              </div>
            </div>
            <div className="info-item">
              <div className="cec-info-icon"><FaUsers /></div>
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
    </div>
  );
};

export default Cec;
