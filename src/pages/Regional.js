import React from 'react';
import { FaUsers, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
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
        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 10px; background: #e3f2fd; padding: 15px; border-radius: 10px;">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.2em" width="1.2em" style="color: #1b5baf;"><path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path></svg>
            <strong style="color: #1b5baf; font-size: 1.2rem;">${secretary.contact}</strong>
          </div>
          <div style="display: flex; align-items: center; justify-content: center; gap: 10px; background: #e3f2fd; padding: 15px; border-radius: 10px;">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.2em" width="1.2em" style="color: #1b5baf;"><path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path></svg>
            <strong style="color: #1b5baf; font-size: 1.2rem;">${secretary.contact2}</strong>
          </div>
        </div>
      `
      : `
        <div style="display: flex; align-items: center; justify-content: center; gap: 10px; background: #e3f2fd; padding: 15px; border-radius: 10px; margin-top: 20px;">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.2em" width="1.2em" style="color: #1b5baf;"><path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path></svg>
          <strong style="color: #1b5baf; font-size: 1.2rem;">${secretary.contact}</strong>
        </div>
      `;

    Swal.fire({
      title: '',
      html: `
        <div style="text-align: center; padding: 20px;">
          <h2 style="color: #1b5baf; font-weight: 700; font-size: 1.5rem; margin-bottom: 20px; word-wrap: break-word;">${secretary.name}</h2>
          <div style="width: 100%; height: 200px; background-color: #e0e0e0; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #666; border: 2px dashed #999; border-radius: 10px; margin-bottom: 20px;">
            NO IMAGE
          </div>
          <h3 style="color: #1b5baf; margin-bottom: 10px;">${secretary.region}</h3>
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
                  NO IMAGE
                </div>
                <div className="card-info">
                  <h5>{secretary.name}</h5>
                  <p className="region-name">{secretary.region}</p>
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