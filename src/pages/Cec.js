import React, { useState, useEffect } from 'react';
import {
  FaUsers, FaCalendarAlt, FaHandshake, FaUserTie, FaCog,
  FaPhoneAlt, FaStar, FaUser, FaBriefcase, FaCrown, FaEnvelope,
  FaMapMarkerAlt, FaGraduationCap, FaChevronRight, FaFileAlt, FaQuoteLeft, FaQuoteRight,
  FaArrowRight, FaInfo, FaShieldAlt, FaChartBar
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useSearch } from '../context/SearchContext';
import { getCommitteeData } from '../api';
import tnebeaLogo from '../assets/tnebea_logo_cropped2.png';
import './Cec.css';

const Cec = () => {
  const { searchQuery, isSearchActive } = useSearch();

  const [cecMembers, setCecMembers] = useState([]);
  const [ebfMembers, setEbfMembers] = useState([]);
  const [termData, setTermData] = useState({
    currentTerm: "",
    electedDate: "",
    nextElectionDate: "",
    totalMembers: 0
  });
  const [responsibilities, setResponsibilities] = useState([]);
  const [queryContact, setQueryContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // 1. Fetch CEC Data
    const fetchCEC = getCommitteeData('CEC')
      .then((data) => {
        if (data && data.members && data.members.length > 0) {
          const mapped = data.members.map((m, idx) => ({
            id: m._id || idx,
            displayOrder: m.displayOrder !== undefined ? Number(m.displayOrder) : idx,
            serialNo: m.displayOrder !== undefined ? Number(m.displayOrder) : idx,
            designation: m.post || m.designation || '',
            name: m.name || '',
            qualification: [m.designation, m.branch, m.region].filter(Boolean).join(' / ') || m.designation || '',
            contact: m.phone || '',
            photo: m.photo || '',
            email: m.email || '',
            location: m.region || m.branch || 'Chennai, Tamil Nadu',
            isQueryContact: !!m.isQueryContact
          }));

          mapped.sort((a, b) => a.displayOrder - b.displayOrder);
          setCecMembers(mapped);

          const qContact = mapped.find((m) => m.isQueryContact);
          if (qContact) setQueryContact(qContact);
        } else {
          setCecMembers([]);
        }

        if (data && data.term) {
          setTermData({
            currentTerm: data.term.currentTerm || "",
            electedDate: data.term.electedDate || "",
            nextElectionDate: data.term.nextElectionDate || "",
            totalMembers: data.memberCount || data.members?.length || 0
          });
        }

        if (data && data.responsibilities && data.responsibilities.length > 0) {
          setResponsibilities(data.responsibilities);
        } else {
          setResponsibilities([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching CEC data:", err);
      });

    // 2. Fetch EBF Data
    const fetchEBF = getCommitteeData('EBF')
      .then((data) => {
        if (data && data.members && data.members.length > 0) {
          const mapped = data.members.map((m, idx) => ({
            id: m._id || idx + 100,
            displayOrder: m.displayOrder !== undefined ? Number(m.displayOrder) : idx + 1,
            serialNo: m.displayOrder !== undefined ? Number(m.displayOrder) : idx + 1,
            designation: m.post || m.designation || '',
            name: m.name || '',
            qualification: [m.designation, m.branch, m.region].filter(Boolean).join(' / ') || m.designation || '',
            contact: m.phone || '',
            photo: m.photo || '',
            email: m.email || '',
            location: m.region || m.branch || 'Chennai, Tamil Nadu',
            isQueryContact: !!m.isQueryContact
          }));

          mapped.sort((a, b) => a.displayOrder - b.displayOrder);
          setEbfMembers(mapped);
        } else {
          setEbfMembers([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching EBF data:", err);
      });

    Promise.all([fetchCEC, fetchEBF]).finally(() => {
      setLoading(false);
    });
  }, []);

  const spotlightMembers = cecMembers.filter((m) => Number(m.displayOrder) === 0);
  const executiveMembers = cecMembers.filter((m) => Number(m.displayOrder) !== 0);

  const filterList = (list) => {
    if (!isSearchActive || !searchQuery) return list;
    const searchLower = searchQuery.toLowerCase();
    return list.filter(
      (m) =>
        (m.name && m.name.toLowerCase().includes(searchLower)) ||
        (m.designation && m.designation.toLowerCase().includes(searchLower)) ||
        (m.qualification && m.qualification.toLowerCase().includes(searchLower))
    );
  };

  const filteredSpotlight = filterList(spotlightMembers);
  const filteredExec = filterList(executiveMembers);
  const filteredEbf = filterList(ebfMembers);

  const activeQueryContact = queryContact || cecMembers.find(m => m.designation?.toLowerCase().includes('general secretary')) || cecMembers[0];

  const showMemberDetails = (member) => {
    if (!member) return;
    const location = member.location || 'Chennai, Tamil Nadu';

    Swal.fire({
      title: '',
      html: `
        <div class="ps-popcard-container">
          <!-- Background Watermark Layer -->
          <div class="ps-popcard-bg-layer">
            <div class="ps-popcard-watermark-wrap">
              <img src="${tnebeaLogo}" alt="TNEBEA" class="ps-popcard-bg-watermark" />
            </div>
          </div>

          <div class="ps-popcard-content">
            <!-- Center Photo with Curved Gold Frame -->
            <div class="ps-popcard-photo-wrapper">
              <div class="ps-popcard-photo-gold-rim">
                <div class="ps-popcard-photo-box">
                  ${member.photo
          ? `<img src="${member.photo}" alt="${member.name}" onerror="this.src='https://via.placeholder.com/150x180?text=No+Photo'" />`
          : `<div class="ps-popcard-no-photo"><span>👤</span></div>`
        }
                </div>
              </div>
            </div>

            <!-- Member Name -->
            <h2 class="ps-popcard-name">${member.name}</h2>

            <!-- Gold Curved Arch Divider -->
            <div class="ps-popcard-arch-divider">
              <span class="ps-popcard-arch-line"></span>
              <span class="ps-popcard-arch-diamond">◆</span>
              <span class="ps-popcard-arch-line"></span>
            </div>

            <!-- Position Pill Badge -->
            <div class="ps-popcard-position-badge">
              <div class="ps-popcard-crown-circle">
                <svg class="ps-popcard-crown-svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>
              </div>
              <div class="ps-popcard-position-text">
                <strong class="ps-popcard-pos-title">${member.designation}</strong>
              </div>
            </div>

            <!-- Detail Cards -->
            <div class="ps-popcard-cards-list">
              <!-- Designation / Branch Card -->
              ${member.qualification ? `
                <div class="ps-popcard-row-card">
                  <div class="ps-popcard-row-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
                  </div>
                  <div class="ps-popcard-row-details">
                    <span class="ps-popcard-row-label">Designation / Branch</span>
                    <div class="ps-popcard-row-val">${member.qualification}</div>
                  </div>
                </div>
              ` : ''}

              <!-- Contact Card -->
              ${member.contact ? `
                <div class="ps-popcard-row-card">
                  <div class="ps-popcard-row-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  </div>
                  <div class="ps-popcard-row-details">
                    <span class="ps-popcard-row-label">Official Contact</span>
                    <strong class="ps-popcard-row-val">${member.contact}</strong>
                  </div>
                </div>
              ` : ''}

              <!-- Location Card -->
              <div class="ps-popcard-row-card">
                <div class="ps-popcard-row-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </div>
                <div class="ps-popcard-row-details">
                  <span class="ps-popcard-row-label">Posting / Location</span>
                  <strong class="ps-popcard-row-val">${location}</strong>
                </div>
              </div>
            </div>

            <!-- Call Now Action Button -->
            ${member.contact ? `
              <a href="tel:${member.contact.replace(/\s+/g, '')}" class="ps-popcard-center-call-btn" onclick="event.stopPropagation()">
                <span class="ps-popcard-btn-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                </span>
                <span>Call Now • ${member.contact}</span>
                <svg class="ps-popcard-btn-arrow" viewBox="0 0 24 24" fill="currentColor"><path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-7.85-1.42 1.42L16.86 11H5v2z"/></svg>
              </a>
            ` : ''}
          </div>
        </div>
      `,
      showCloseButton: true,
      showConfirmButton: false,
      customClass: {
        popup: 'ps-popcard-popup',
        closeButton: 'ps-popcard-close-btn'
      },
      width: 'min(94vw, 420px)',
      maxWidth: '420px',
      padding: '0',
      heightAuto: false,
      scrollbarPadding: false,
      backdrop: `rgba(2, 14, 34, 0.85)`,
      allowOutsideClick: false,
      allowEscapeKey: true,
    });
  };

  const renderLuxuryFlipCard = (member) => (
    <div
      key={member.id}
      className="ps-flip-card-wrap"
      onClick={() => showMemberDetails(member)}
    >
      <div className="ps-flip-card-inner">
        {/* FRONT OF CARD */}
        <div className="ps-luxury-card ps-card-front">
          {/* Background Art Layer: Transmission Towers, Insignia, & Slogan */}
          <div className="ps-card-bg-layer">
            <div className="ps-ribbon-tl"></div>

            <div className="ps-tower-left">
              <svg viewBox="0 0 100 200" fill="currentColor">
                <path d="M45,10 L55,10 L58,40 L75,45 L75,52 L59,50 L63,90 L85,96 L85,103 L64,101 L68,150 L95,158 L95,166 L69,164 L75,200 L68,200 L63,165 L37,165 L32,200 L25,200 L31,164 L5,166 L5,158 L32,150 L36,101 L15,103 L15,96 L37,90 L41,50 L25,52 L25,45 L42,40 Z M46,45 L54,45 L52,25 L48,25 Z M44,88 L56,88 L58,52 L42,52 Z M42,148 L58,148 L62,92 L38,92 Z M40,163 L60,163 L58,150 L42,150 Z" />
              </svg>
              <div className="ps-slogan-vertical">
                <span>POWERING</span>
                <span>PEOPLE</span>
                <span>EMPOWERING</span>
                <span>TOMORROW</span>
              </div>
            </div>

            <div className="ps-tower-right">
              <div className="ps-laurel-insignia">
                <svg viewBox="0 0 120 120" fill="currentColor">
                  <path d="M30,85 C20,70 20,45 35,30 C38,36 38,45 34,52 C40,42 45,35 52,32 C50,40 48,48 42,55 C50,48 56,43 64,42 C60,50 56,56 48,62 C58,58 66,56 74,58 C68,64 62,69 52,72 C62,70 70,71 77,76 C70,80 62,82 52,82 C42,82 34,85 30,85 Z" opacity="0.6" />
                  <path d="M90,85 C100,70 100,45 85,30 C82,36 82,45 86,52 C80,42 75,35 68,32 C70,40 72,48 78,55 C70,48 64,43 56,42 C60,50 64,56 72,62 C62,58 54,56 46,58 C52,64 58,69 68,72 C58,70 50,71 43,76 C50,80 58,82 68,82 C78,82 86,85 90,85 Z" opacity="0.6" />
                  <path d="M57,35 L63,35 L65,50 L75,53 L75,57 L65,56 L67,75 L80,78 L80,82 L67,81 L70,105 L66,105 L64,83 L56,83 L54,105 L50,105 L53,81 L40,82 L40,78 L53,75 L55,56 L45,57 L45,53 L55,50 Z" />
                  <circle cx="60" cy="60" r="42" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" opacity="0.5" />
                  <text x="60" y="72" textAnchor="middle" fontSize="9" fontWeight="bold" fill="currentColor">TNEBEA</text>
                </svg>
                <div className="ps-insignia-text">
                  <span>ENGINEERS</span>
                  <span>FOR A BRIGHTER</span>
                  <span>TAMIL NADU</span>
                </div>
              </div>
              <svg className="ps-tower-svg-right" viewBox="0 0 100 200" fill="currentColor">
                <path d="M45,10 L55,10 L58,40 L75,45 L75,52 L59,50 L63,90 L85,96 L85,103 L64,101 L68,150 L95,158 L95,166 L69,164 L75,200 L68,200 L63,165 L37,165 L32,200 L25,200 L31,164 L5,166 L5,158 L32,150 L36,101 L15,103 L15,96 L37,90 L41,50 L25,52 L25,45 L42,40 Z M46,45 L54,45 L52,25 L48,25 Z M44,88 L56,88 L58,52 L42,52 Z M42,148 L58,148 L62,92 L38,92 Z M40,163 L60,163 L58,150 L42,150 Z" />
              </svg>
            </div>
          </div>

          {/* Central Photo Frame */}
          <div className="ps-photo-luxury-wrap">
            <div className="ps-photo-gold-border">
              <div className="ps-photo-white-border">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200x230?text=No+Photo';
                    }}
                  />
                ) : (
                  <div className="ps-no-photo">
                    <FaUser style={{ fontSize: '3.5rem', opacity: 0.5 }} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Lower White Plaque */}
          <div className="ps-plaque">
            <div className="ps-plaque-name-row">
              <div className="ps-user-badge-icon">
                <FaUser />
              </div>
              <div className="ps-plaque-member-name">{member.name}</div>
            </div>

            <div className="ps-designation-flank-row">
              <div className="ps-flank-line left"></div>
              <div className="ps-crown-designation-pill">
                <FaCrown className="ps-crown-gold-icon" />
                <span>{member.designation}</span>
              </div>
              <div className="ps-flank-line right"></div>
            </div>

            <div className="ps-plaque-diamond-divider">
              <span className="ps-diamond-line"></span>
              <span className="ps-diamond-symbol">◆</span>
              <span className="ps-diamond-line"></span>
            </div>

            <div className="ps-bottom-gold-waves"></div>
          </div>
        </div>

        {/* BACK OF CARD */}
        <div className="ps-luxury-card-back">
          {/* Top Header with Centered Official TNEBEA Logo */}
          <div className="ps-back-header">
            <div className="ps-back-logo-wrap">
              <img src={tnebeaLogo} alt="TNEBEA Logo" className="ps-back-logo-img" />
            </div>
          </div>

          {/* Member Details */}
          <div className="ps-back-body">
            <h4 className="ps-back-member-name">{member.name}</h4>
            <div className="ps-back-designation-pill">
              <FaCrown className="ps-back-crown-icon" />
              <span>{member.designation}</span>
            </div>

            <div className="ps-back-info-list">
              {member.qualification && (
                <div className="ps-back-info-item">
                  <div className="ps-back-info-icon"><FaGraduationCap /></div>
                  <span className="ps-back-info-text">{member.qualification}</span>
                </div>
              )}
              {member.contact && (
                <div className="ps-back-info-item">
                  <div className="ps-back-info-icon"><FaPhoneAlt /></div>
                  <span className="ps-back-info-text">{member.contact}</span>
                </div>
              )}
              <div className="ps-back-info-item">
                <div className="ps-back-info-icon"><FaEnvelope /></div>
                <span className="ps-back-info-text">
                  {member.email || `${(member.name || 'member').toLowerCase().replace(/[^a-z0-9]/g, '')}@tnebea.org`}
                </span>
              </div>
              <div className="ps-back-info-item">
                <div className="ps-back-info-icon"><FaMapMarkerAlt /></div>
                <span className="ps-back-info-text">{member.location || 'Chennai, Tamil Nadu'}</span>
              </div>
            </div>

            {/* View Details Button */}
            <button
              type="button"
              className="ps-back-view-btn"
              onClick={(e) => {
                e.stopPropagation();
                showMemberDetails(member);
              }}
            >
              <span>View Details</span>
              <FaChevronRight className="ps-back-btn-chevron" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="cec-container">
      {/* Hero Section */}
      <div className="cec-hero">
        <div className="cec-hero-ambient-glow"></div>
        <div className="cec-hero-content">
          <h1>TNEB ENGINEERS' <span className="title-highlight">ASSOCIATION</span></h1>
          <div className="hero-divider"></div>
          <h2>CENTRAL EXECUTIVE COMMITTEE {termData.currentTerm ? termData.currentTerm : ''}</h2>
          <p className="cec-hero-tagline">Leading with Excellence &amp; Integrity • Committed to Engineering Fraternity</p>
        </div>
      </div>

      {/* Loading state */}
      {loading && cecMembers.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#1b5baf', fontSize: '1.2rem', fontWeight: 600 }}>
          Loading Committee Members...
        </div>
      )}

      {/* Priority 0 Spotlight Card(s) - CEC only */}
      {filteredSpotlight.length > 0 && (
        <div className="ps-section">
          {filteredSpotlight.map((member) => (
            <div key={member.id} className="ps-spotlight-poster-card" onClick={() => showMemberDetails(member)}>
              {/* TOP CENTER: HANGING RIBBON & TITLES */}
              <div className="ps-header-spotlight">
                <div className="ps-hanging-ribbon">
                  <FaStar className="ps-star-gold" />
                  <span>LEADERSHIP SPOTLIGHT</span>
                  <FaStar className="ps-star-gold" />
                </div>
                <h2 className="ps-spotlight-title">
                  {member.designation || 'Principal Secretary'}
                </h2>
                <div className="ps-spotlight-pill-wrap">
                  <span className="ps-spotlight-pill">NATIONAL &amp; STATE AFFAIRS</span>
                </div>
              </div>

              {/* MAIN BODY: PORTRAIT (WITH GOLD LAUREL) & RIGHT VALUE PILLARS */}
              <div className="ps-main-body-row">
                {/* CENTER PHOTO WITH MODERN LAYERED OFFSET FRAME */}
                <div className="ps-portrait-center-col">
                  {/* Outer Layered Frame Container */}
                  <div className="ps-offset-frame-outer">
                    {/* Golden Outline Shape */}
                    <div className="ps-offset-gold-border"></div>
                    {/* Navy Offset Backdrop Shadow */}
                    <div className="ps-offset-navy-layer"></div>
                    {/* White Card Frame */}
                    <div className="ps-offset-white-card">
                      <div className="ps-offset-photo-wrapper">
                        {member.photo ? (
                          <img src={member.photo} alt={member.name} onError={(e) => { e.target.src = 'https://via.placeholder.com/220x260?text=No+Photo'; }} />
                        ) : (
                          <div className="ps-no-portrait">
                            <FaUser className="ps-no-portrait-icon" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Name Ribbon Bar */}
                  <div className="ps-name-ribbon-bar">
                    <span>{member.name}</span>
                  </div>
                </div>
              </div>

              {/* LOWER SECTION: QUALIFICATION STRIP & CONTACT */}
              <div className="ps-footer-section">
                {/* Post / Branch Capsule */}
                {member.qualification && (
                  <div className="ps-qualification-capsule">
                    <span className="ps-capsule-diamond">◆</span>
                    <div className="ps-capsule-icon-circle">
                      <FaBriefcase />
                    </div>
                    <span className="ps-capsule-text">{member.qualification}</span>
                  </div>
                )}

                {/* Phone Contact Pill Button */}
                {member.contact && (
                  <a
                    href={`tel:${member.contact.replace(/\s+/g, '')}`}
                    className="ps-contact-pill-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="ps-contact-icon-circle">
                      <FaPhoneAlt />
                    </div>
                    <span className="ps-contact-number">{member.contact}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State when no members uploaded */}
      {!loading && cecMembers.length === 0 && ebfMembers.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: 20, maxWidth: 600, margin: '20px auto', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
          <FaUsers style={{ fontSize: '3.5rem', color: '#cbd5e1', marginBottom: 16 }} />
          <h3 style={{ color: '#1e293b', fontWeight: 700 }}>No Committee Members Found</h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Members added in the admin dashboard will appear here automatically.</p>
        </div>
      )}

      {/* Executive Committee Members Grid */}
      {filteredExec.length > 0 && (
        <div className="members-grid-section">
          <div className="section-title-wrapper text-center mb-4">
            <h3><FaUsers /> Executive Committee Members</h3>
            <p className="section-sub">Hover to view executive details • Tap for complete profile</p>
          </div>

          <div className="exec-luxury-grid">
            {filteredExec.map(renderLuxuryFlipCard)}
          </div>
        </div>
      )}

      {/* EBF Committee Heading and Members Grid */}
      {filteredEbf.length > 0 && (
        <div className="members-grid-section mt-5">
          <div className="ebf-header-banner">
            <h3><FaUsers className="me-2 text-gold" /> EBF Committee</h3>
            <div className="hero-divider"></div>
            <p className="section-sub">Dedicated to welfare, mutual support, and benevolence</p>
          </div>

          <div className="exec-luxury-grid">
            {filteredEbf.map(renderLuxuryFlipCard)}
          </div>
        </div>
      )}

      {/* Info Cards - Committee Term & Responsibilities */}
      <div className="cec-info-section">
        <div className="info-cards">
          {/* Card 1: Committee Term */}
          <div className="info-card term-card">
            <div className="info-header">
              <div className="info-header-icon-circle">
                <FaCalendarAlt />
              </div>
              <div className="info-header-text">
                <h3>Committee Term</h3>
                <p>EXECUTIVE COMMITTEE DETAILS</p>
              </div>
              <div className="info-header-gold-waves"></div>
            </div>

            <div className="info-body">
              <div className="term-info-row theme-blue">
                <div className="term-icon-box blue">
                  <FaCalendarAlt />
                </div>
                <div className="term-content-col">
                  <span className="term-label">CURRENT TERM</span>
                  <strong className="term-val">{termData.currentTerm || "2025-2027"}</strong>
                </div>
                <div className="term-chevron-btn blue">
                  <FaChevronRight />
                </div>
              </div>

              <div className="term-info-row theme-amber">
                <div className="term-icon-box amber">
                  <FaUserTie />
                </div>
                <div className="term-content-col">
                  <span className="term-label">ELECTED</span>
                  <strong className="term-val">{termData.electedDate || "October 2025"}</strong>
                </div>
                <div className="term-chevron-btn amber">
                  <FaChevronRight />
                </div>
              </div>

              <div className="term-info-row theme-highlight">
                <div className="term-icon-box highlight">
                  <FaCalendarAlt />
                </div>
                <div className="term-content-col">
                  <span className="term-label">NEXT ELECTION</span>
                  <strong className="term-val">{termData.nextElectionDate || "October 2027"}</strong>
                </div>
                <div className="term-chevron-btn highlight">
                  <FaChevronRight />
                </div>
              </div>

              <div className="term-info-row theme-purple">
                <div className="term-icon-box purple">
                  <FaUsers />
                </div>
                <div className="term-content-col">
                  <span className="term-label">TOTAL MEMBERS</span>
                  <strong className="term-val">{termData.totalMembers || cecMembers.length || 14}</strong>
                </div>
                <div className="term-chevron-btn purple">
                  <FaChevronRight />
                </div>
              </div>
            </div>

            <div className="term-card-footer">
              <span className="footer-line"></span>
              <span className="footer-text">UNITY &nbsp;•&nbsp; SERVICE &nbsp;•&nbsp; PROGRESS</span>
              <span className="footer-line"></span>
            </div>
          </div>

          {/* Card 2: Responsibilities */}
          <div className="info-card resp-card">
            <div className="info-header">
              <div className="info-header-icon-circle">
                <FaCog />
              </div>
              <div className="info-header-text">
                <h3>Responsibilities</h3>
                <p>KEY AREAS OF FOCUS</p>
              </div>
              <div className="info-header-gold-waves"></div>
            </div>

            <div className="info-body">
              {(responsibilities.length > 0 ? responsibilities.slice(0, 4) : [
                { title: "Policy Making", description: "Strategic decisions & organizational guidelines" },
                { title: "Member Welfare", description: "Support, professional growth & development programs" },
                { title: "Administration", description: "Operational management & state representations" },
                { title: "Coordination", description: "Inter-departmental liaison & active communication" }
              ]).map((resp, i) => {
                const icons = [<FaFileAlt key="1" />, <FaUsers key="2" />, <FaCog key="3" />, <FaHandshake key="4" />];
                const nums = ['01', '02', '03', '04'];
                return (
                  <div key={resp._id || i} className="resp-luxury-item">
                    <div className="resp-icon-box">
                      {icons[i % 4]}
                    </div>
                    <div className="resp-text-col">
                      <h5>{resp.title}</h5>
                      <p>{resp.description}</p>
                    </div>
                    <div className="resp-number-badge">
                      {nums[i % 4]}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="resp-card-footer">
              <div className="resp-quote-pill">
                <FaQuoteLeft className="quote-mark" />
                <span>Empowering Engineers &nbsp;•&nbsp; Strengthening Communities &nbsp;•&nbsp; Building a Better Tomorrow</span>
                <FaQuoteRight className="quote-mark" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Query Banner */}
      {activeQueryContact && (
        <div className="cec-query-banner-wrap">
          <div className="cec-query-banner" onClick={() => showMemberDetails(activeQueryContact)}>
            {/* Left Section */}
            <div className="query-left-section">
              <div className="query-ambient-waves"></div>
              <div className="query-info-badge">
                <FaInfo />
              </div>
              <div className="query-left-text">
                <h4>For Committee Queries</h4>
                <p>Tap to view member details</p>
              </div>
              <div className="query-v-divider"></div>
            </div>

            {/* Right Section */}
            <div className="query-right-section">
              <div className="query-member-col">
                <div className="query-avatar-box">
                  {activeQueryContact.photo ? (
                    <img
                      src={activeQueryContact.photo}
                      alt={activeQueryContact.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="query-avatar-fallback" style={{ display: activeQueryContact.photo ? 'none' : 'flex' }}>
                    <FaUser />
                  </div>
                </div>

                <div className="query-details-col">
                  <span className="query-designation-tag">
                    {activeQueryContact.designation || 'GENERAL SECRETARY'}
                  </span>
                  <h4 className="query-person-name">{activeQueryContact.name}</h4>
                  {activeQueryContact.qualification && (
                    <p className="query-person-sub">{activeQueryContact.qualification}</p>
                  )}
                  {activeQueryContact.contact && (
                    <div className="query-phone-row">
                      <FaPhoneAlt className="query-phone-icon" />
                      <span>{activeQueryContact.contact}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="query-actions-col">
                <div className="query-help-tag">
                  <span>We are here to help you</span>
                  <small>Connect with us easily</small>
                </div>

                {activeQueryContact.contact && (
                  <a
                    href={`tel:${activeQueryContact.contact.replace(/\s+/g, '')}`}
                    className="query-call-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaPhoneAlt className="btn-call-icon" />
                    <span>Call Now</span>
                    <FaArrowRight className="btn-arrow-icon" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cec;
