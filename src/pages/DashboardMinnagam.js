import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSpinner, FaCheckCircle, FaExclamationCircle, FaUpload } from 'react-icons/fa';
import './DashboardMinnagam.css';
import { submitMinnagamForm, getMinnagams, isAuthenticated, getUserData, updateMinnagamStatus } from '../api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const DashboardMinnagam = () => {
  const navigate = useNavigate();
  const isUserAuthenticated = isAuthenticated();
  const userData = getUserData();
  const canApprove = userData?.role === 'treasurer' || userData?.role === 'admin' || userData?.role === 'owner';
  const isTreasurer = userData?.role === 'treasurer';

  const [activeTab, setActiveTab] = useState(isTreasurer ? 'submissions' : 'submit'); // default based on role
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
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (!isUserAuthenticated) {
      navigate('/'); // Redirect to home if not logged in
    }
  }, [isUserAuthenticated, navigate]);

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
      
      Swal.fire({
        title: 'Submitted!',
        text: 'Minnagam application submitted successfully!',
        icon: 'success',
        confirmButtonColor: '#15458a',
        confirmButtonText: 'OK'
      });

      setFormData({ nomineeName: '', relation: '', units: '', utrNumber: '', document: null });
      setStep(1);
      setActiveTab('submissions');
      fetchSubmissions();
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

  const handleStatusUpdate = async (id, status) => {
    setActionLoading(id);
    try {
      await updateMinnagamStatus(id, status);
      fetchSubmissions(); // Refresh list after update
    } catch (err) {
      console.error(err);
      alert('Failed to update status.');
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    if (activeTab === 'submissions') {
      fetchSubmissions();
    }
  }, [activeTab]);

  return (
    <div className="dashboard-minnagam-container">
      {!isTreasurer && (
        <div className="minnagam-tabs">
          <button className={`tab-btn ${activeTab === 'submit' ? 'active' : ''}`} onClick={() => setActiveTab('submit')}>Minnagam Request</button>
          <button className={`tab-btn ${activeTab === 'submissions' ? 'active' : ''}`} onClick={() => setActiveTab('submissions')}>{canApprove ? 'All Submissions' : 'My Submissions'}</button>
        </div>
      )}

      <div className="minnagam-content">
        {activeTab === 'submit' && (
          <motion.div className="minnagam-form-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="form-header"> Minnagam Request</h2>
            
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
                    <label>Name of Nominee *</label>
                    <input type="text" name="nomineeName" value={formData.nomineeName} onChange={handleInputChange} placeholder="Enter full name" />
                  </div>
                  <div className="form-group">
                    <label>Relation *</label>
                    <input type="text" name="relation" value={formData.relation} onChange={handleInputChange} placeholder="Relation" />
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn-next" onClick={nextStep}>Next</button>
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
                      {loading ? 'Submitting...' : 'Submit Request'}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        )}

        {activeTab === 'submissions' && (
          <motion.div className="submissions-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2>{canApprove ? 'All Submissions' : 'My Submissions'}</h2>
            {loading ? (
              <div className="loading-spinner"><FaSpinner className="spinner" /></div>
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
                      {canApprove && <th>Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.length === 0 ? (
                      <tr>
                        <td colSpan={canApprove ? "9" : "8"} className="no-data">No submissions found.</td>
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
                          {canApprove && (
                            <td>
                              <div className="action-buttons">
                                <button 
                                  className="btn-approve" 
                                  onClick={() => handleStatusUpdate(sub._id, 'Approved')}
                                  disabled={actionLoading === sub._id || sub.status === 'Approved'}
                                >
                                  {actionLoading === sub._id ? '...' : 'Approve'}
                                </button>
                                <button 
                                  className="btn-reject" 
                                  onClick={() => handleStatusUpdate(sub._id, 'Rejected')}
                                  disabled={actionLoading === sub._id || sub.status === 'Rejected'}
                                >
                                  {actionLoading === sub._id ? '...' : 'Reject'}
                                </button>
                              </div>
                            </td>
                          )}
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

export default DashboardMinnagam;
