import React, { useState, useEffect } from 'react';
import { 
  FaUsers, FaPhoneAlt, FaMapMarkerAlt, FaUser, FaCrown, 
  FaGraduationCap, FaEnvelope, FaChevronRight, FaPhone 
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useSearch } from '../context/SearchContext';
import { getCommitteeData } from '../api';
import tnebeaLogo from '../assets/tnebea_logo_cropped2.png';
import './Regional.css';

const fallbackRegionalSecretaries = [
  { id: 1, serialNo: 1, region: "CHENNAI HQRS", name: "Er. R. RAVICHANDRAN", designation: "SE / MECH / COAL / HQRS", contact: "99623 22669", contact2: null, photo: null },
  { id: 2, serialNo: 2, region: "CHENNAI GENERATION", name: "Er. S. MURUGESAN", designation: "AEE / MECH / COMMISSIONING NCTPP3", contact: "99624 05511", contact2: null, photo: null },
  { id: 3, serialNo: 3, region: "CHENNAI DISTRIBUTION", name: "Er. S. PALANIVELAN", designation: "SE / DISTRIBUTION / CHENNAI NORTH", contact: "99944 88407", contact2: null, photo: null },
  { id: 4, serialNo: 4, region: "COIMBATORE", name: "Er. R. SUDHA", designation: "EE / ELECTRICAL / COIMBATORE REGION", contact: "80126 40810", contact2: null, photo: null },
  { id: 5, serialNo: 5, region: "ERODE", name: "Er. V. CHANDRASEKAR", designation: "AEE / SS ERECTION / ERODE / GCC / COIMBATORE", contact: "94883 81603", contact2: "94458 57823", photo: null },
  { id: 6, serialNo: 6, region: "ERODE GENERATION", name: "Er. M. KRISHNARAJ", designation: "AE / SHIFT / BARRAGE PH-2 / NERINJIPETTAI", contact: "99766 78866", contact2: null, photo: null },
  { id: 7, serialNo: 7, region: "KANCHIPURAM", name: "Er. T. VELMURUGAN", designation: "SE / DISTRIBUTION / CHENNAI SOUTH", contact: "94454 04141", contact2: null, photo: null },
  { id: 8, serialNo: 8, region: "KARUR", name: "Er. K. SELVAM", designation: "EE / O&M / PALLIPALAYAM", contact: "94425 59899", contact2: "70104 51411", photo: null },
  { id: 9, serialNo: 9, region: "MADURAI", name: "Er. V. SUDHAN", designation: "AE / DISTRIBUTION / ARASAMARAM / MADURAI METRO EDC", contact: "99408 32641", contact2: null, photo: null },
  { id: 10, serialNo: 10, region: "THANJAVUR", name: "Er. S. SANKARKUMAR", designation: "AEE / O&M / MADUKKUR / THANJAVUR EDC", contact: "70103 54716", contact2: null, photo: null },
  { id: 11, serialNo: 11, region: "TIRUCHIRAPALLI", name: "Er. V. SANTHANAKRISHNAN", designation: "AEE / RELIABLE COMMUNICATION / TRICHY", contact: "78100 11120", contact2: "94990 55180", photo: null },
  { id: 12, serialNo: 12, region: "TIRUNELVELI", name: "Er. N. VENKATESHMANI", designation: "EE / GENERAL / TIRUNELVELI EDC", contact: "94436 14154", contact2: null, photo: null },
  { id: 13, serialNo: 13, region: "TIRUNELVELI GENERATION", name: "Er. M. KAMALAKANNAN", designation: "EE / ECHP-I / TTPS", contact: "94862 60444", contact2: null, photo: null },
  { id: 14, serialNo: 14, region: "TIRUVANNAMALAI", name: "Er. M. KATHIRAVAN", designation: "AEE / O&M / TOWN / TIRUVANNAMALAI", contact: "95785 09122", contact2: "94458 56320", photo: null },
  { id: 15, serialNo: 15, region: "VELLORE", name: "Er. P. SANKAR", designation: "AEE / O&M / SHOLINGHUR / VELLORE EDC", contact: "93426 38880", contact2: null, photo: null },
  { id: 16, serialNo: 16, region: "VILLUPURAM", name: "Er. P. DILEEP KUMAR", designation: "MANAGER / IS / VILLUPURAM EDC", contact: "94458 55720", contact2: "99523 02163", photo: null }
];

const Regional = () => {
  const { searchQuery, isSearchActive } = useSearch();

  const [regionalSecretaries, setRegionalSecretaries] = useState(fallbackRegionalSecretaries);
  const [termData, setTermData] = useState({
    currentTerm: "2025-2027",
    totalMembers: 16
  });

  useEffect(() => {
    getCommitteeData('REGIONAL')
      .then((data) => {
        if (data && data.members && data.members.length > 0) {
          const mapped = data.members.map((m, idx) => {
            const phoneParts = (m.phone || '').split('/').map((s) => s.trim());
            return {
              id: m._id || idx + 1,
              serialNo: idx + 1,
              region: m.region || m.branch || 'TAMIL NADU',
              name: m.name,
              designation: m.designation || m.post || 'Regional Secretary',
              contact: phoneParts[0] || '',
              contact2: phoneParts[1] || null,
              photo: m.photo || null
            };
          });
          setRegionalSecretaries(mapped);
        }

        if (data && data.term && data.term.currentTerm) {
          setTermData({
            currentTerm: data.term.currentTerm,
            totalMembers: data.memberCount || data.members?.length || 16
          });
        }
      })
      .catch((err) => {
        console.warn("Using fallback Regional Secretaries:", err.message);
      });
  }, []);

  const filteredSecretaries = regionalSecretaries.filter(secretary => {
    if (!isSearchActive || !searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      (secretary.name && secretary.name.toLowerCase().includes(searchLower)) ||
      (secretary.designation && secretary.designation.toLowerCase().includes(searchLower)) ||
      (secretary.region && secretary.region.toLowerCase().includes(searchLower))
    );
  });

  const showSecretaryDetails = (secretary) => {
    if (!secretary) return;
    const location = secretary.region ? `${secretary.region}, Tamil Nadu` : 'Tamil Nadu';

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
                  ${secretary.photo 
                    ? `<img src="${secretary.photo}" alt="${secretary.name}" onerror="this.src='https://via.placeholder.com/150x180?text=No+Photo'" />`
                    : `<div class="ps-popcard-no-photo"><span>👤</span></div>`
                  }
                </div>
              </div>
            </div>

            <!-- Member Name -->
            <h2 class="ps-popcard-name">${secretary.name}</h2>

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
                <span class="ps-popcard-pos-label">OFFICIAL ROLE</span>
                <strong class="ps-popcard-pos-title">Regional Secretary</strong>
              </div>
            </div>

            <!-- Detail Cards -->
            <div class="ps-popcard-cards-list">
              <!-- Region Card -->
              <div class="ps-popcard-row-card">
                <div class="ps-popcard-row-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </div>
                <div class="ps-popcard-row-details">
                  <span class="ps-popcard-row-label">Assigned Region</span>
                  <div class="ps-popcard-row-val">${secretary.region}</div>
                </div>
              </div>

              <!-- Official Designation Card -->
              ${secretary.designation ? `
                <div class="ps-popcard-row-card">
                  <div class="ps-popcard-row-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
                  </div>
                  <div class="ps-popcard-row-details">
                    <span class="ps-popcard-row-label">Designation / Posting</span>
                    <div class="ps-popcard-row-val">${secretary.designation}</div>
                  </div>
                </div>
              ` : ''}

              <!-- Primary Contact Card -->
              ${secretary.contact ? `
                <div class="ps-popcard-row-card">
                  <div class="ps-popcard-row-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  </div>
                  <div class="ps-popcard-row-details">
                    <span class="ps-popcard-row-label">Primary Contact</span>
                    <strong class="ps-popcard-row-val">${secretary.contact}</strong>
                  </div>
                </div>
              ` : ''}

              <!-- Secondary Contact Card -->
              ${secretary.contact2 ? `
                <div class="ps-popcard-row-card">
                  <div class="ps-popcard-row-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  </div>
                  <div class="ps-popcard-row-details">
                    <span class="ps-popcard-row-label">Alternate Contact</span>
                    <strong class="ps-popcard-row-val">${secretary.contact2}</strong>
                  </div>
                </div>
              ` : ''}
            </div>

            <!-- Call Now Action Button -->
            ${secretary.contact ? `
              <a href="tel:${secretary.contact.replace(/\s+/g, '')}" class="ps-popcard-center-call-btn" onclick="event.stopPropagation()">
                <span class="ps-popcard-btn-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                </span>
                <span>Call Now • ${secretary.contact}</span>
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

  const renderLuxuryFlipCard = (secretary) => (
    <div
      key={secretary.id}
      className="ps-flip-card-wrap"
      onClick={() => showSecretaryDetails(secretary)}
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
                  <path d="M30,85 C20,70 20,45 35,30 C38,36 38,45 34,52 C40,42 45,35 52,32 C50,40 48,48 42,55 C50,48 56,43 64,42 C60,50 56,56 48,62 C58,58 66,56 74,58 C68,64 62,69 52,72 C62,70 70,71 77,76 C70,80 62,82 52,82 C42,82 34,85 30,85 Z" opacity="0.6"/>
                  <path d="M90,85 C100,70 100,45 85,30 C82,36 82,45 86,52 C80,42 75,35 68,32 C70,40 72,48 78,55 C70,48 64,43 56,42 C60,50 64,56 72,62 C62,58 54,56 46,58 C52,64 58,69 68,72 C58,70 50,71 43,76 C50,80 58,82 68,82 C78,82 86,85 90,85 Z" opacity="0.6"/>
                  <path d="M57,35 L63,35 L65,50 L75,53 L75,57 L65,56 L67,75 L80,78 L80,82 L67,81 L70,105 L66,105 L64,83 L56,83 L54,105 L50,105 L53,81 L40,82 L40,78 L53,75 L55,56 L45,57 L45,53 L55,50 Z" />
                  <circle cx="60" cy="60" r="42" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" opacity="0.5"/>
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
                {secretary.photo ? (
                  <img
                    src={secretary.photo}
                    alt={secretary.name}
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
              <div className="ps-plaque-member-name">{secretary.name}</div>
            </div>

            <div className="ps-designation-flank-row">
              <div className="ps-flank-line left"></div>
              <div className="ps-crown-designation-pill">
                <FaCrown className="ps-crown-gold-icon" />
                <span>{secretary.region}</span>
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
            <h4 className="ps-back-member-name">{secretary.name}</h4>
            <div className="ps-back-designation-pill">
              <FaCrown className="ps-back-crown-icon" />
              <span>{secretary.region}</span>
            </div>

            <div className="ps-back-info-list">
              <div className="ps-back-info-item">
                <div className="ps-back-info-icon"><FaMapMarkerAlt /></div>
                <span className="ps-back-info-text">{secretary.region}</span>
              </div>
              {secretary.designation && (
                <div className="ps-back-info-item">
                  <div className="ps-back-info-icon"><FaGraduationCap /></div>
                  <span className="ps-back-info-text">{secretary.designation}</span>
                </div>
              )}
              {secretary.contact && (
                <div className="ps-back-info-item">
                  <div className="ps-back-info-icon"><FaPhoneAlt /></div>
                  <span className="ps-back-info-text">{secretary.contact}</span>
                </div>
              )}
              {secretary.contact2 && (
                <div className="ps-back-info-item">
                  <div className="ps-back-info-icon"><FaPhone /></div>
                  <span className="ps-back-info-text">{secretary.contact2}</span>
                </div>
              )}
              <div className="ps-back-info-item">
                <div className="ps-back-info-icon"><FaEnvelope /></div>
                <span className="ps-back-info-text">
                  {(secretary.name || 'member').toLowerCase().replace(/[^a-z0-9]/g, '')}@tnebea.org
                </span>
              </div>
            </div>

            {/* View Details Button */}
            <button
              type="button"
              className="ps-back-view-btn"
              onClick={(e) => {
                e.stopPropagation();
                showSecretaryDetails(secretary);
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
    <div className="regional-container">
      {/* Hero Section */}
      <div className="regional-hero">
        <div className="regional-hero-ambient-glow"></div>
        <div className="regional-hero-content">
          <h1>REGIONAL <span className="title-highlight">SECRETARIES</span></h1>
          <div className="hero-divider"></div>
          <h2>TNEBEA {termData.currentTerm}</h2>
          <p className="regional-hero-tagline">Representing Excellence &amp; Engineering Interests Across All Regions</p>
        </div>
      </div>

      {/* Regional Secretaries Grid */}
      <div className="secretaries-grid-section">
        <h3><FaUsers /> Regional Representatives ({filteredSecretaries.length})</h3>
        <p className="section-sub">Hover or click on card to flip and view details</p>
        
        <div className="exec-luxury-grid">
          {filteredSecretaries.map(renderLuxuryFlipCard)}
        </div>
      </div>

      {/* Info Section */}
      <div className="regional-info">
        <div className="info-stat">
          <div className="stat-number">{termData.totalMembers || regionalSecretaries.length}</div>
          <div className="stat-label">Regional Secretaries</div>
        </div>
        <div className="info-stat">
          <div className="stat-number">{termData.currentTerm}</div>
          <div className="stat-label">Current Term</div>
        </div>
        <div className="info-stat">
          <div className="stat-number">TN</div>
          <div className="stat-label">Coverage Area</div>
        </div>
      </div>
    </div>
  );
};

export default Regional;
