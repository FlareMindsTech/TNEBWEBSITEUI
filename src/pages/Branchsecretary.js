import React, { useState, useEffect } from 'react';
import { 
  FaUsers, FaPhoneAlt, FaMapMarkerAlt, FaUser, FaCrown, 
  FaGraduationCap, FaEnvelope, FaChevronRight, FaBuilding, FaPhone 
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useSearch } from '../context/SearchContext';
import { getCommitteeData } from '../api';
import tnebeaLogo from '../assets/tnebea_logo_cropped2.png';
import './Branchsecretary.css';

const parseContacts = (contactStr) => {
  const contacts = contactStr.split('/').map(c => c.trim());
  return { contact: contacts[0] || '', contact2: contacts[1] || null, contact3: contacts[2] || null };
};

const fallbackBranchSecretaries = [
  { id: 1, serialNo: 1, branch: "BASIN BRIDGE", name: "Er. P. KALAIVANAN", designation: "AEE/CIVIL/BBGTPS", ...parseContacts("97891 51621 / 94450 71268"), photo: null },
  { id: 2, serialNo: 2, branch: "CHENGALPATTU", name: "Er. A. GOPANNA", designation: "AEE/MRT/CHENGALPATTU", ...parseContacts("70101 02278"), photo: null },
  { id: 3, serialNo: 3, branch: "CHENNAI/CENTRAL", name: "Er. V. RENGANATHAN", designation: "AEE/O&M/WEST MAMBALAM-1", ...parseContacts("98944 15898 / 94458 50769"), photo: null },
  { id: 4, serialNo: 4, branch: "CHENNAI/GUINDY", name: "Er. BALAMANIKANDAN", designation: "AEE/TLC/GCC-II/GUINDY", ...parseContacts("97910 63699"), photo: null },
  { id: 5, serialNo: 5, branch: "CHENNAI/HQRS", name: "Er. M. SENTHILKUMAR", designation: "AEE/ERP/HQRS", ...parseContacts("97910 63061"), photo: null },
  { id: 6, serialNo: 6, branch: "CHENNAI/NORTH", name: "Er. S.C. SAIPRASAD", designation: "AE/O&M/KOLATHUR", ...parseContacts("98944 81410"), photo: null },
  { id: 7, serialNo: 7, branch: "CHENNAI/SOUTH", name: "Er. K. MOHAN", designation: "AEE/O&M/ASHOK NAGAR", ...parseContacts("94458 50203 / 95005 65460"), photo: null },
  { id: 8, serialNo: 8, branch: "CHENNAI/WEST", name: "Dr. S. SELVARAJ", designation: "AEE/O&M/CHETPET", ...parseContacts("99624 43823"), photo: null },
  { id: 9, serialNo: 9, branch: "COIMBATORE", name: "Er. M. SAMPATH KUMAR", designation: "AEE/SHIFT/OTHAKALMANDAPAM", ...parseContacts("99946 43088"), photo: null },
  { id: 10, serialNo: 10, branch: "CUDDALORE", name: "Er. T. ARUL", designation: "AE/O&M/VARAKALPATTU", ...parseContacts("80727 07818 / 94458 55971"), photo: null },
  { id: 11, serialNo: 11, branch: "DHARMAPURI", name: "Er. K. SURESH", designation: "AEE/SPL.MTCE/ADHIYAMANKOTTAI", ...parseContacts("94428 57098 / 94458 55407"), photo: null },
  { id: 12, serialNo: 12, branch: "DINDIGUL", name: "Er. M. SHANMUGA SUNDARAM", designation: "MANAGER/IS/CO/DINDIGUL", ...parseContacts("73737 39495 / 94458 53330"), photo: null },
  { id: 13, serialNo: 13, branch: "ETPS & NCTPS-III", name: "Er. S. BALAJI", designation: "AEE/C&I/ELEC.DIV-IV/NCTPS-III", ...parseContacts("94458 59773"), photo: null },
  { id: 14, serialNo: 14, branch: "ERODE", name: "Er. P. KAVITHA", designation: "EA TO CE/ERODE", ...parseContacts("97500 45666 / 94458 51801"), photo: null },
  { id: 15, serialNo: 15, branch: "ERODE GEN CIRCLE", name: "Er. A. UMARANI", designation: "AEE/MM/URATCHIKOTTAI", ...parseContacts("94864 12778 / 94450 71497"), photo: null },
  { id: 16, serialNo: 16, branch: "GOBI", name: "Er. P. RAJASEKARAN", designation: "AEE/O&M/EAST/GOBI", ...parseContacts("86677 60181"), photo: null },
  { id: 17, serialNo: 17, branch: "KADAMPARAI", name: "Er. S. SATHISHKUMAR", designation: "EE/PH's/NAVAMALAI", ...parseContacts("87781 05808 / 94458 57084"), photo: null },
  { id: 18, serialNo: 18, branch: "KALLAKURICHY", name: "Er. M. GANESAN", designation: "EE/O&M/KALLAKURICHI", ...parseContacts("94887 80624 / 94458 55808"), photo: null },
  { id: 19, serialNo: 19, branch: "KANCHIPURAM", name: "Er. R. ELAYARAJAN", designation: "AEE/O&M/WALAJABAD", ...parseContacts("86819 27501 / 94458 55166"), photo: null },
  { id: 20, serialNo: 20, branch: "KANYAKUMARI", name: "Er. P. SELVESTER", designation: "AEE/MRT/NAGERCOIL", ...parseContacts("94438 41909 / 94458 54564"), photo: null },
  { id: 21, serialNo: 21, branch: "KARUR", name: "Er. D. RAVICHANDRAN", designation: "AEE/SPL.MTCE/KARUR", ...parseContacts("94438 43800"), photo: null },
  { id: 22, serialNo: 22, branch: "KODAYAR", name: "Er. R. MANIMARAN", designation: "AE/MECH/PH-1/LOWER CAMP", ...parseContacts("63832 54434"), photo: null },
  { id: 23, serialNo: 23, branch: "KRISHNAGIRI", name: "Er. S. PREMKUMAR", designation: "AE/O&M/INDL ESTATE", ...parseContacts("90423 78791 / 94458 55450"), photo: null },
  { id: 24, serialNo: 24, branch: "KUNDAH", name: "Er. S. BALAJI", designation: "AEE/O/PUSHEP/NILGRIS", ...parseContacts("99949 29592 / 94458 57059"), photo: null },
  { id: 25, serialNo: 25, branch: "MADURAI", name: "Er. N. KANNAN", designation: "AEE/MRT/MADURAI METRO EDC", ...parseContacts("98437 43049 / 94879 46136 / 79046 45410"), photo: null },
  { id: 26, serialNo: 26, branch: "METTUR EDC", name: "Er. S. SARAVANAKUMAR", designation: "AEE/O&M/METTUR DAM", ...parseContacts("98942 00008"), photo: null },
  { id: 27, serialNo: 27, branch: "METTUR T.P.S.", name: "Er. K. VIJAY", designation: "EA TO CE-MTPS-I", ...parseContacts("94897 74341"), photo: null },
  { id: 28, serialNo: 28, branch: "NAGAPATTINAM", name: "Er. G. PRABAKAR", designation: "AEE/O&M/PERALAM/THIRUVARUR", ...parseContacts("95005 72051 / 94458 54011"), photo: null },
  { id: 29, serialNo: 29, branch: "NAMAKKAL", name: "Er. S. SANKAR", designation: "AEE/O&M/WEST/NAMAGIRIPETTAI", ...parseContacts("98658 13713 / 94458 52521"), photo: null },
  { id: 30, serialNo: 30, branch: "NCTPS-I", name: "Er. K. SENTHILKUMAR", designation: "AEE/CAD/NCTPS-I", ...parseContacts("74181 44723 / 94458 56663"), photo: null },
  { id: 31, serialNo: 31, branch: "NCTPS-II", name: "Er. M.D. PRABHU", designation: "AEE/C&I/NCTPS-II", ...parseContacts("95518 12687 / 94454 42289"), photo: null },
  { id: 32, serialNo: 32, branch: "NILGRIS", name: "Er. K. MUTHUKUMAR", designation: "AEE/O&M/BANDALUR", ...parseContacts("93614 00989"), photo: null },
  { id: 33, serialNo: 33, branch: "PALLADAM", name: "Er. M. VELUSWAMY", designation: "AE/O&M/NARANAPURAM", ...parseContacts("99943 95389 / 94458 51224"), photo: null },
  { id: 34, serialNo: 34, branch: "PAPANASAM", name: "Er. E. PITCHIAH", designation: "AEE/OPN/PAPANASAM PH", ...parseContacts("94892 48316 / 94439 70445"), photo: null },
  { id: 35, serialNo: 35, branch: "PERAMBALUR", name: "Er. R. PONSHANKAR", designation: "AEE/O&M/RURAL/230KVSS", ...parseContacts("63820 62545"), photo: null },
  { id: 36, serialNo: 36, branch: "PERIYAR", name: "Er. M. BALAMURUGAN", designation: "AE/EM-I PERIYAR PH", ...parseContacts("98943 87514 / 94450 71869"), photo: null },
  { id: 37, serialNo: 37, branch: "PUDUKOTTAI", name: "Er. M. SHANKAR", designation: "AEE/O&M/ILLUPUR", ...parseContacts("73736 97374"), photo: null },
  { id: 38, serialNo: 38, branch: "RAMANATHAPURAM", name: "Er. U. KUMARAVEL", designation: "AEE/O&M/RURAL RAMNAD", ...parseContacts("91595 69596 / 94458 53324"), photo: null },
  { id: 39, serialNo: 39, branch: "SALEM", name: "Er. M. GANESAN", designation: "AEE/O&M/NETHIMEDU", ...parseContacts("94432 83355 / 94458 52246"), photo: null },
  { id: 40, serialNo: 40, branch: "SIVAGANGAI", name: "Er. R. SATHAPPAN", designation: "AEE/O&M/SINGAMPUNARY", ...parseContacts("99766 88664 / 94458 53117"), photo: null },
  { id: 41, serialNo: 41, branch: "THANJAVUR", name: "Er. M. SIVAKUMAR", designation: "AEE/GIS/THANJAVUR", ...parseContacts("94881 11188"), photo: null },
  { id: 42, serialNo: 42, branch: "THENI", name: "Er. C. ALAGURAJA", designation: "AEE/O&M/CHINNAMANUR", ...parseContacts("86105 88439"), photo: null },
  { id: 43, serialNo: 43, branch: "THIRUNELVELI", name: "Er. A. MURUGAN", designation: "AEE/GENERAL/GEN CIRCLE", ...parseContacts("94431 13524"), photo: null },
  { id: 44, serialNo: 44, branch: "THIRUPATTUR", name: "Er. P. SOMU", designation: "AEE/SHIFT/THIRUPATTUR 230KV SS", ...parseContacts("97865 79588"), photo: null },
  { id: 45, serialNo: 45, branch: "THIRUVANNAMALAI", name: "Er. S.M. VENKATESAN", designation: "SENIOR MANAGER/TT&DC", ...parseContacts("94436 24107"), photo: null },
  { id: 46, serialNo: 46, branch: "THIRUVALLUR", name: "Dr. M.K. BALACHANDRAN", designation: "AEE/MRT/TIRUVALLUR", ...parseContacts("94456 38412 / 94458 50991"), photo: null },
  { id: 47, serialNo: 47, branch: "TIRUPPUR", name: "Er. T. SHANMUGASUNDARAM", designation: "AEE/O&M/UTHUKULI", ...parseContacts("94435 53658"), photo: null },
  { id: 48, serialNo: 48, branch: "TRICHY", name: "Er. B. MURUGAN", designation: "AE/MTCE/110KV COURT CAMPUS SS", ...parseContacts("86958 81118 / 94990 55042"), photo: null },
  { id: 49, serialNo: 49, branch: "TUTICORIN EDC", name: "Er. P. UMAIORUBAGAM", designation: "AEE/O&M/URBAN/SOUTH", ...parseContacts("94423 72420 / 94458 54748"), photo: null },
  { id: 50, serialNo: 50, branch: "TUTICORIN T.P.S.", name: "Er. T. PIRAISOODI", designation: "AEE/INSTRUMENTATION-II/TTPS", ...parseContacts("94423 17491 / 94458 56893"), photo: null },
  { id: 51, serialNo: 51, branch: "UDUMALPETTAI", name: "Er. R. DEVANAND", designation: "EE/O&M/ANAGALAKURICHI", ...parseContacts("98422 71729 / 94458 51513"), photo: null },
  { id: 52, serialNo: 52, branch: "VELLORE", name: "Er. P. ARULJOTHI", designation: "AEE/MRT/VELLORE", ...parseContacts("81445 17086"), photo: null },
  { id: 53, serialNo: 53, branch: "VGTPS", name: "Er. A. GOPALAKRISHNAN", designation: "AE/MRT/PH-2/VGTPS", ...parseContacts("98946 40479 / 94450 71284"), photo: null },
  { id: 54, serialNo: 54, branch: "VILLUPURAM", name: "Er. A. SARANARAYANAN", designation: "AEE/PLANNING/RO VILLUPURAM", ...parseContacts("98657 74545 / 94458 55691"), photo: null },
  { id: 55, serialNo: 55, branch: "VIRUDHUNAGAR", name: "Er. A. ZAHIR HUSSAIN", designation: "EE/P&C/765KV SS", ...parseContacts("98425 41062"), photo: null },
  { id: 56, serialNo: 56, branch: "UDANGUDI", name: "Er. S. MUTHARASAN", designation: "AEE/MECH/USTPP-I", ...parseContacts("90802 94585 / 99446 98615"), photo: null }
];

const Branchsecretary = () => {
  const { searchQuery, isSearchActive } = useSearch();

  const [branchSecretaries, setBranchSecretaries] = useState(fallbackBranchSecretaries);
  const [termData, setTermData] = useState({
    currentTerm: "2025-2027",
    totalMembers: 56
  });

  useEffect(() => {
    getCommitteeData('BRANCH')
      .then((data) => {
        if (data && data.members && data.members.length > 0) {
          const mapped = data.members.map((m, idx) => {
            const parsed = parseContacts(m.phone || '');
            return {
              id: m._id || idx + 1,
              serialNo: idx + 1,
              branch: m.branch || m.region || 'BRANCH OFFICE',
              name: m.name,
              designation: m.designation || m.post || 'Branch Secretary',
              contact: parsed.contact,
              contact2: parsed.contact2,
              contact3: parsed.contact3,
              photo: m.photo || null
            };
          });
          setBranchSecretaries(mapped);
        }

        if (data && data.term && data.term.currentTerm) {
          setTermData({
            currentTerm: data.term.currentTerm,
            totalMembers: data.memberCount || data.members?.length || 56
          });
        }
      })
      .catch((err) => {
        console.warn("Using fallback Branch Secretaries:", err.message);
      });
  }, []);

  const filteredSecretaries = branchSecretaries.filter(secretary => {
    if (!isSearchActive || !searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      (secretary.name && secretary.name.toLowerCase().includes(searchLower)) ||
      (secretary.designation && secretary.designation.toLowerCase().includes(searchLower)) ||
      (secretary.branch && secretary.branch.toLowerCase().includes(searchLower))
    );
  });

  const showSecretaryDetails = (secretary) => {
    if (!secretary) return;

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
                <strong class="ps-popcard-pos-title">Branch Secretary</strong>
              </div>
            </div>

            <!-- Detail Cards -->
            <div class="ps-popcard-cards-list">
              <!-- Branch Card -->
              <div class="ps-popcard-row-card">
                <div class="ps-popcard-row-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>
                </div>
                <div class="ps-popcard-row-details">
                  <span class="ps-popcard-row-label">Branch Office</span>
                  <div class="ps-popcard-row-val">${secretary.branch}</div>
                </div>
              </div>

              <!-- Designation Card -->
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

              <!-- Tertiary Contact Card -->
              ${secretary.contact3 ? `
                <div class="ps-popcard-row-card">
                  <div class="ps-popcard-row-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  </div>
                  <div class="ps-popcard-row-details">
                    <span class="ps-popcard-row-label">Additional Contact</span>
                    <strong class="ps-popcard-row-val">${secretary.contact3}</strong>
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
                <span>{secretary.branch}</span>
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
              <span>{secretary.branch}</span>
            </div>

            <div className="ps-back-info-list">
              <div className="ps-back-info-item">
                <div className="ps-back-info-icon"><FaBuilding /></div>
                <span className="ps-back-info-text">{secretary.branch}</span>
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
              {secretary.contact3 && (
                <div className="ps-back-info-item">
                  <div className="ps-back-info-icon"><FaPhone /></div>
                  <span className="ps-back-info-text">{secretary.contact3}</span>
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
    <div className="branch-container">
      {/* Hero Section */}
      <div className="branch-hero">
        <div className="branch-hero-ambient-glow"></div>
        <div className="branch-hero-content">
          <h1>BRANCH <span className="title-highlight">SECRETARIES</span></h1>
          <div className="hero-divider"></div>
          <h2>TNEBEA {termData.currentTerm}</h2>
          <p className="branch-hero-tagline">Serving Excellence &amp; Dedicated Support Across All Branches</p>
        </div>
      </div>

      <div className="secretaries-grid-section">
        <h3><FaUsers /> Branch Representatives ({filteredSecretaries.length})</h3>
        <p className="section-sub">Hover or click on card to flip and view details</p>
        
        <div className="exec-luxury-grid">
          {filteredSecretaries.map(renderLuxuryFlipCard)}
        </div>
      </div>

      <div className="branch-info">
        <div className="info-stat">
          <div className="stat-number">{termData.totalMembers || branchSecretaries.length}</div>
          <div className="stat-label">Branch Secretaries</div>
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

export default Branchsecretary;
