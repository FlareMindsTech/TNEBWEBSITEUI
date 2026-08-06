import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaHotel, FaBed, FaMapMarkerAlt, FaSnowflake, FaUsers, FaFileAlt, FaSpinner, FaCheckCircle, FaExclamationCircle, FaUpload } from 'react-icons/fa';
import './Minnagam.css';
import building1 from '../assets/Proposed-building-1.jpeg';
import building2 from '../assets/Proposed-building-2.jpeg';
import building3 from '../assets/Proposed-building-3.jpeg';
import { submitMinnagamForm, getMinnagams, isAuthenticated } from '../api';

const RoomCard = ({ room, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="room-card"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(27, 91, 175, 0.3)" }}
    >
      <div className="room-icon-wrapper">
        {room.icon}
      </div>
      <h3 className="room-title">{room.title}</h3>
      <p className="room-description">{room.description}</p>
      <div className="room-price">
        <span className="price-amount">₹{room.price}</span>
        <span className="price-period">{room.period}</span>
      </div>
      {room.monthlyPrice && (
        <div className="room-monthly">
          <span>Monthly: ₹{room.monthlyPrice}</span>
        </div>
      )}
      <div className="room-features">
        {room.features.map((feature, idx) => (
          <span key={idx} className="feature-tag">{feature}</span>
        ))}
      </div>
    </motion.div>
  );
};

const Minnagam = () => {
  const proposedSectionRef = React.useRef(null);
  
  // New States
  const [activeTab, setActiveTab] = useState('info'); // 'info', 'submit', 'submissions'
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nomineeName: '',
    relation: '',
    units: '',
    utrNumber: '',
    document: null
  });
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const isUserAuthenticated = isAuthenticated();

  const buildingImages = [
    { id: 1, src: building2, alt: 'Proposed Building - View 1' },
    { id: 2, src: building3, alt: 'Proposed Building - View 2' },
    { id: 3, src: building1, alt: 'Proposed Building - View 3' }
  ];

  const handleViewConstructionProposal = () => {
    proposedSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, document: e.target.files[0] });
  };

  const calculateAmount = () => {
    const units = parseInt(formData.units) || 0;
    return units * 20000;
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.nomineeName || !formData.relation) {
        setError('Please fill out all Nominee fields.');
        return;
      }
    }
    setError('');
    setStep(step + 1);
  };

  const prevStep = () => {
    setError('');
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.units || !formData.utrNumber || !formData.document) {
      setError('Please fill out all Transaction fields and upload a document.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const data = new FormData();
      data.append('nomineeName', formData.nomineeName);
      data.append('relation', formData.relation);
      data.append('units', formData.units);
      data.append('utrNumber', formData.utrNumber);
      data.append('document', formData.document);

      await submitMinnagamForm(data);
      setSuccessMsg('Minnagam application submitted successfully!');
      setFormData({ nomineeName: '', relation: '', units: '', utrNumber: '', document: null });
      setStep(1);
      setTimeout(() => {
        setSuccessMsg('');
        setActiveTab('submissions');
        fetchSubmissions();
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to submit the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const data = await getMinnagams();
      setSubmissions(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load submissions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'submissions') {
      fetchSubmissions();
    }
  }, [activeTab]);

  return (
    <div className="minnagam-container">
      <div className="minnagam-hero">
        <div className="hero-content">
          <FaHotel className="minnagam-hero-icon" />
          <h1 className="hero-title1">MINNAGAM</h1>
          <div className="hero-subtitle">
            <FaMapMarkerAlt className="location-icon text-light" />
            <span className='text-light'>APR Mansion, Royapettah High Road, Chennai</span>
          </div>
          <p className="hero-description">Residential Accommodation for Engineers</p>
          <div className="minnagam-hero-badge">Information Only</div>
        </div>
      </div>

      <div className="minnagam-tabs">
        <button className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>Information</button>
        {isUserAuthenticated && (
          <>
            <button className={`tab-btn ${activeTab === 'submit' ? 'active' : ''}`} onClick={() => setActiveTab('submit')}>Submit Request</button>
            <button className={`tab-btn ${activeTab === 'submissions' ? 'active' : ''}`} onClick={() => setActiveTab('submissions')}>My Submissions</button>
          </>
        )}
      </div>

      <div className="minnagam-content">
        {activeTab === 'info' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="proposed-building-section" ref={proposedSectionRef}>
              <div className="proposed-building-container">
                <h2 className="proposed-building-title">Proposed Building</h2>
                <div className="building-images-grid">
                  {buildingImages.map((image) => (
                    <div key={image.id} className="building-image-wrapper">
                      <img src={image.src} alt={image.alt} className="building-image" />
                      <div className="image-overlay">
                        <span>Proposed Building</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              className="proposal-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <FaFileAlt className="proposal-icon" />
              <h3>Future Development</h3>
              <p>Learn about our upcoming multipurpose complex project</p>
              <motion.button
                type="button"
                className="proposal-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleViewConstructionProposal}
              >
                View Construction Proposal
              </motion.button>
            </motion.div>

            <motion.div
              className="welcome-footer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <p>Have a Pleasant Stay at Minnagam!</p>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'submit' && (
          <motion.div className="minnagam-form-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="form-header">Submit Minnagam Request</h2>
            
            <div className="stepper">
              <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Nominee Details</div>
              <div className="step-line"></div>
              <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Transaction Data</div>
            </div>

            {error && <div className="form-alert error"><FaExclamationCircle /> {error}</div>}
            {successMsg && <div className="form-alert success"><FaCheckCircle /> {successMsg}</div>}

            <form className="minnagam-form" onSubmit={handleSubmit}>
              {step === 1 && (
                <motion.div className="form-step" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="form-group">
                    <label>Nominee Name *</label>
                    <input type="text" name="nomineeName" value={formData.nomineeName} onChange={handleInputChange} placeholder="Enter full name" />
                  </div>
                  <div className="form-group">
                    <label>Relation *</label>
                    <input type="text" name="relation" value={formData.relation} onChange={handleInputChange} placeholder="e.g. Spouse, Son" />
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn-next" onClick={nextStep}>Next step</button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div className="form-step" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="form-group">
                    <label>Number of Units *</label>
                    <input type="number" min="1" name="units" value={formData.units} onChange={handleInputChange} placeholder="E.g. 1" />
                  </div>
                  
                  <div className="calc-amount-box">
                    <span className="calc-label">Total Amount Calculated:</span>
                    <span className="calc-value">₹ {calculateAmount().toLocaleString()}</span>
                  </div>

                  <div className="form-group">
                    <label>UTR Number *</label>
                    <input type="text" name="utrNumber" value={formData.utrNumber} onChange={handleInputChange} placeholder="Enter transaction reference" />
                  </div>
                  
                  <div className="form-group file-upload-group">
                    <label>Payment Document (PDF/Image) *</label>
                    <div className="file-upload-wrapper">
                      <FaUpload className="upload-icon" />
                      <input type="file" accept=".pdf,image/*" onChange={handleFileChange} />
                      <span className="file-name">{formData.document ? formData.document.name : "Choose file to upload"}</span>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn-prev" onClick={prevStep} disabled={loading}>Back</button>
                    <button type="submit" className="btn-submit" disabled={loading}>
                      {loading ? <FaSpinner className="spinner" /> : 'Submit Request'}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        )}

        {activeTab === 'submissions' && (
          <motion.div className="submissions-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2>My Submissions</h2>
            {loading ? (
              <div className="loading-spinner"><FaSpinner className="spinner" /> Loading...</div>
            ) : (
              <div className="table-responsive">
                <table className="submissions-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Nominee</th>
                      <th>Relation</th>
                      <th>Units</th>
                      <th>Amount</th>
                      <th>UTR Number</th>
                      <th>Document</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="no-data">No submissions found.</td>
                      </tr>
                    ) : (
                      submissions.map((sub) => (
                        <tr key={sub._id}>
                          <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
                          <td>{sub.nomineeName}</td>
                          <td>{sub.relation}</td>
                          <td>{sub.units}</td>
                          <td>₹{sub.amount.toLocaleString()}</td>
                          <td>{sub.utrNumber}</td>
                          <td>
                            <a href={sub.document.url} target="_blank" rel="noreferrer" className="doc-link">View</a>
                          </td>
                          <td>
                            <span className={`status-badge status-${sub.status?.toLowerCase() || 'pending'}`}>
                              {sub.status || 'Pending'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Minnagam;
