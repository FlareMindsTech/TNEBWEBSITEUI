import React from 'react';
import { FaUsers, FaPhone, FaMapMarkerAlt, FaUser, FaBriefcase } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './Regional.css';

const Regional = () => {
  const regionalSecretaries = [
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

  const showSecretaryDetails = (secretary) => {
    const contactHTML = secretary.contact2 
      ? `
        <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 18px;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 12px; background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); padding: 14px 18px; border-radius: 12px; border-left: 4px solid #1b5baf;">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.3em" width="1.3em" style="color: #1b5baf; flex-shrink: 0;"><path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path></svg>
            <div style="text-align: left;">
              <div style="font-size: 0.75rem; color: #1b5baf; opacity: 0.8; font-weight: 500;">Primary Contact</div>
              <strong style="color: #1b5baf; font-size: 1.1rem;">${secretary.contact}</strong>
            </div>
          </div>
          <div style="display: flex; align-items: center; justify-content: center; gap: 12px; background: linear-gradient(135deg, #f3e5f5 0%, #ede7f6 100%); padding: 14px 18px; border-radius: 12px; border-left: 4px solid #7b1fa2;">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.3em" width="1.3em" style="color: #7b1fa2; flex-shrink: 0;"><path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path></svg>
            <div style="text-align: left;">
              <div style="font-size: 0.75rem; color: #7b1fa2; opacity: 0.8; font-weight: 500;">Secondary Contact</div>
              <strong style="color: #7b1fa2; font-size: 1.1rem;">${secretary.contact2}</strong>
            </div>
          </div>
        </div>
      `
      : `
        <div style="display: flex; align-items: center; justify-content: center; gap: 12px; background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); padding: 14px 18px; border-radius: 12px; border-left: 4px solid #1b5baf; margin-top: 18px;">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.3em" width="1.3em" style="color: #1b5baf; flex-shrink: 0;"><path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path></svg>
          <div style="text-align: left;">
            <div style="font-size: 0.75rem; color: #1b5baf; opacity: 0.8; font-weight: 500;">Contact</div>
            <strong style="color: #1b5baf; font-size: 1.1rem;">${secretary.contact}</strong>
          </div>
        </div>
      `;

    Swal.fire({
      title: '',
      html: `
        <div style="text-align: center; padding: 10px; max-width: 560px;">
          <!-- Image Placeholder -->
          <div style="margin-bottom: 18px;">
            <div style="width: 150px; height: 180px; margin: 0 auto 15px; background-color: #e0e0e0; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #666; border: 2px dashed #999; border-radius: 10px; font-weight: 600;">
              NO IMAGE
            </div>
            <h2 style="color: #1b5baf; font-weight: 700; font-size: 1.6rem; margin: 0 0 12px 0; word-wrap: break-word;">${secretary.name}</h2>
          </div>

          <!-- Divider -->
          <div style="height: 2px; background: linear-gradient(90deg, transparent, #1b5baf, transparent); margin: 16px 0;"></div>

          <!-- Region Section -->
          <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin: 16px 0;">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" height="1em" width="1em" style="color: #ff6b6b;"><path d="M192 0c-88.22 0-160 71.78-160 160 0 87.06 135.79 300.64 160 320 24.21-19.36 160-232.94 160-320 0-88.22-71.78-160-160-160zm0 240c-44.11 0-80-35.89-80-80s35.89-80 80-80 80 35.89 80 80-35.89 80-80 80z"></path></svg>
            <span style="color: #ff6b6b; font-weight: 600; font-size: 0.95rem;">${secretary.region}</span>
          </div>

          <!-- Designation Section -->
          <div style="background: linear-gradient(135deg, #f0f4ff 0%, #f5f9ff 100%); padding: 12px 14px; border-radius: 10px; margin: 16px 0; border-left: 3px solid #2a6cc7;">
            <div style="display: flex; align-items: flex-start; gap: 10px;">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" height="1.1em" width="1.1em" style="color: #2a6cc7; margin-top: 2px; flex-shrink: 0;"><path d="M622.3 271.1l-115.2-37.5-39.6-115.8c-6.5-19.2-24.8-31.7-45.3-31.7-20.5 0-38.7 12.6-45.2 31.7l-39.7 115.8-115.2 37.5c-19.1 6.2-31.8 24.8-31.8 45.5s12.6 39.3 31.8 45.5l115.2 37.5 39.7 115.8c6.5 19.1 24.8 31.7 45.2 31.7 20.5 0 38.8-12.6 45.3-31.7l39.6-115.8 115.2-37.5c19.2-6.2 31.8-24.8 31.8-45.5-.1-20.7-12.6-39.3-31.8-45.5zM523.5 421L464 306.3l-59.5-19.4L464 267.5 523.5 152.8 583 267.5l59.5 19.4L583 306.3z"></path></svg>
              <div style="text-align: left;">
                <div style="font-size: 0.8rem; color: #2a6cc7; opacity: 0.8; font-weight: 500;">Designation</div>
                <div style="color: #2a6cc7; font-size: 0.95rem; line-height: 1.4;">${secretary.designation}</div>
              </div>
            </div>
          </div>

          <!-- Contact Section -->
          ${contactHTML}
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
        popup: 'regional-details-popup',
        title: 'regional-details-title',
        htmlContainer: 'regional-details-content'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `tel:${secretary.contact}`;
      }
    });
  };

  return (
    <div className="regional-container">
      {/* Hero Section */}
      <div className="regional-hero">
        <div className="regional-hero-content">
          <FaUsers className="hero-icon" />
          <h1>REGIONAL SECRETARIES</h1>
          <div className="hero-divider"></div>
          <h2>TNEBEA 2025-2027</h2>
          <p>Representing Excellence Across Regions</p>
        </div>
      </div>

      {/* Regional Secretaries Grid */}
      <div className="secretaries-grid-section">
        <h3><FaUsers /> Regional Representatives</h3>
        <p className="section-sub">Click or hover for details</p>
        
        <div className="secretaries-grid">
          {regionalSecretaries.map((secretary) => (
            <div key={secretary.id} className="secretary-card">
                <div className="card-front">
                <div className="serial">{secretary.serialNo}</div>
                <div className="photo-placeholder">
                  <FaUser style={{ fontSize: '3rem', color: '#1b5baf', opacity: 0.3 }} />
                </div>
                <div className="card-info">
                  <h5><FaUser style={{ marginRight: '8px', color: '#2a6cc7' }} />{secretary.name}</h5>
                  <p className="region-name"><FaMapMarkerAlt style={{ marginRight: '6px', color: '#ff6b6b' }} />{secretary.region}</p>
                </div>
              </div>
              <div className="card-back">
                <h5>{secretary.name}</h5>
                <p className="back-region"><FaMapMarkerAlt /> {secretary.region}</p>
                <p className="back-desig">{secretary.designation}</p>
                <p className="back-contact"><FaPhone /> {secretary.contact}</p>
                {secretary.contact2 && <p className="back-contact"><FaPhone /> {secretary.contact2}</p>}
                <button onClick={(e) => { e.stopPropagation(); showSecretaryDetails(secretary); }}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="regional-info">
        <div className="info-stat">
          <div className="stat-number">16</div>
          <div className="stat-label">Regional Secretaries</div>
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

export default Regional;