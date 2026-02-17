import React from 'react';
import { FaUsers, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './Branchsecretary.css';

const Branchsecretary = () => {
  const parseContacts = (contactStr) => {
    const contacts = contactStr.split('/').map(c => c.trim());
    return { contact: contacts[0], contact2: contacts[1], contact3: contacts[2] || null };
  };

  const branchSecretaries = [
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

  const showSecretaryDetails = (secretary) => {
    let contactHTML = `<div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">`;
    
    contactHTML += `
      <div style="display: flex; align-items: center; justify-content: center; gap: 10px; background: #e3f2fd; padding: 15px; border-radius: 10px;">
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.2em" width="1.2em" style="color: #1b5baf;"><path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path></svg>
        <strong style="color: #1b5baf; font-size: 1.2rem;">${secretary.contact}</strong>
      </div>
    `;
    
    if (secretary.contact2) {
      contactHTML += `
        <div style="display: flex; align-items: center; justify-content: center; gap: 10px; background: #e3f2fd; padding: 15px; border-radius: 10px;">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.2em" width="1.2em" style="color: #1b5baf;"><path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path></svg>
          <strong style="color: #1b5baf; font-size: 1.2rem;">${secretary.contact2}</strong>
        </div>
      `;
    }
    
    if (secretary.contact3) {
      contactHTML += `
        <div style="display: flex; align-items: center; justify-content: center; gap: 10px; background: #e3f2fd; padding: 15px; border-radius: 10px;">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.2em" width="1.2em" style="color: #1b5baf;"><path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path></svg>
          <strong style="color: #1b5baf; font-size: 1.2rem;">${secretary.contact3}</strong>
        </div>
      `;
    }
    
    contactHTML += `</div>`;

    Swal.fire({
      title: `<strong>${secretary.name}</strong>`,
      html: `
        <div style="text-align: center; padding: 20px;">
          <div style="width: 100%; height: 200px; background-color: #e0e0e0; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #666; border: 2px dashed #999; border-radius: 10px; margin-bottom: 20px;">
            NO IMAGE
          </div>
          <h3 style="color: #1b5baf; margin-bottom: 10px;">${secretary.branch}</h3>
          <p style="color: #666; font-size: 1rem; margin-bottom: 15px;">${secretary.designation}</p>
          ${contactHTML}
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
        popup: 'branch-details-popup',
        title: 'branch-details-title',
        htmlContainer: 'branch-details-content'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `tel:${secretary.contact}`;
      }
    });
  };

  return (
    <div className="branch-container">
      {/* Hero Section */}
      <div className="branch-hero">
        <div className="branch-hero-content">
          <FaMapMarkerAlt className="hero-icon" />
          <h1>BRANCH SECRETARIES</h1>
          <div className="hero-divider"></div>
          <h2>TNEBEA 2025-2027</h2>
          <p>Serving Excellence Across All Branches</p>
        </div>
      </div>

      {/* Branch Secretaries Grid */}
      <div className="secretaries-grid-section">
        <h3><FaUsers /> Branch Representatives</h3>
        <p className="section-sub">Click or hover for details</p>
        
        <div className="secretaries-grid">
          {branchSecretaries.map((secretary) => (
            <div key={secretary.id} className="secretary-card">
              <div className="card-front">
                <div className="serial">{secretary.serialNo}</div>
                <div className="photo-placeholder">
                  NO IMAGE
                </div>
                <div className="card-info">
                  <h5>{secretary.name}</h5>
                  <p className="branch-name">{secretary.branch}</p>
                </div>
              </div>
              <div className="card-back">
                <h5>{secretary.name}</h5>
                <p className="back-branch"><FaMapMarkerAlt /> {secretary.branch}</p>
                <p className="back-desig">{secretary.designation}</p>
                <p className="back-contact"><FaPhone /> {secretary.contact}</p>
                {secretary.contact2 && <p className="back-contact"><FaPhone /> {secretary.contact2}</p>}
                {secretary.contact3 && <p className="back-contact"><FaPhone /> {secretary.contact3}</p>}
                <button onClick={(e) => { e.stopPropagation(); showSecretaryDetails(secretary); }}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="branch-info">
        <div className="info-stat">
          <div className="stat-number">56</div>
          <div className="stat-label">Branch Secretaries</div>
        </div>
        <div className="info-stat">
          <div className="stat-number">2025-2027</div>
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