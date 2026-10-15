import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSpinner, 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaUpload, 
  FaAward,
  FaClock,
  FaTimesCircle,
  FaLayerGroup,
  FaThList,
  FaColumns,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import './DashboardMinnagam.css';
import { submitMinnagamForm, getMinnagams, isAuthenticated, getUserData, getUserProfile, updateMinnagamStatus } from '../api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import MinnagamCertificateModal from '../components/MinnagamCertificateModal';

const PaginatedSubmissionsTable = ({
  subList = [],
  emptyMsg,
  itemsPerPage = 10,
  canApprove,
  handleStatusUpdate,
  actionLoading,
  setSelectedCertData,
  setShowCertModal
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = subList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [totalItems, totalPages, currentPage]);

  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedItems = subList.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (safePage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (safePage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', safePage - 1, safePage, safePage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="submissions-table-card">
      <div className="table-responsive">
        <table className="submissions-table">
          <thead>
            <tr>
              <th className="col-date">Date</th>
              {canApprove && <th className="col-member">Member Name</th>}
              <th className="col-nominee">Nominee</th>
              <th className="col-relation">Relation</th>
              <th className="col-units">Units</th>
              <th className="col-amount">Amount</th>
              <th className="col-utr">UTR Number</th>
              <th className="col-doc">Document</th>
              <th className="col-status">Status</th>
              <th className="col-cert">Certificate</th>
              {canApprove && <th className="col-actions">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {subList.length === 0 ? (
              <tr>
                <td colSpan={canApprove ? "11" : "9"} className="no-data">
                  {emptyMsg || "No submissions found."}
                </td>
              </tr>
            ) : (
              paginatedItems.map((sub) => (
                <tr key={sub._id}>
                  <td className="col-date">{new Date(sub.createdAt).toLocaleDateString()}</td>
                  {canApprove && (
                    <td className="col-member">
                      <div className="member-name-text">
                        {sub.user?.name || (typeof sub.user === 'string' ? 'Member' : 'N/A')}
                      </div>
                      {(sub.user?.emp_id || sub.user?.pbo_number || sub.user?.phone_no) && (
                        <div className="member-sub-text">
                          {[sub.user?.emp_id || sub.user?.pbo_number, sub.user?.phone_no].filter(Boolean).join(' • ')}
                        </div>
                      )}
                    </td>
                  )}
                  <td className="col-nominee">{sub.nomineeName}</td>
                  <td className="col-relation">{sub.relation}</td>
                  <td className="col-units">{sub.units}</td>
                  <td className="col-amount">₹{sub.amount.toLocaleString()}</td>
                  <td className="col-utr">{sub.utrNumber}</td>
                  <td className="col-doc">
                    <a href={sub.document?.url} target="_blank" rel="noreferrer" className="doc-link">View</a>
                  </td>
                  <td className="col-status">
                    <span className={`status-badge status-${sub.status?.toLowerCase() || 'pending'}`}>
                      {sub.status || 'Pending'}
                    </span>
                  </td>
                  <td className="col-cert">
                    <button 
                      type="button" 
                      className="btn-view-cert"
                      onClick={() => {
                        setSelectedCertData(sub);
                        setShowCertModal(true);
                      }}
                      title="View & Download Certificate"
                    >
                      <FaAward className="cert-icon" /> Certificate
                    </button>
                  </td>
                  {canApprove && (
                    <td className="col-actions">
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

      {totalItems > 0 && (
        <div className="table-pagination-footer">
          <div className="pagination-info">
            Showing <span className="pagination-highlight">{startIndex + 1}</span> to{' '}
            <span className="pagination-highlight">{endIndex}</span> of{' '}
            <span className="pagination-highlight">{totalItems}</span> submissions
            <span className="pagination-per-page">(10 per page)</span>
          </div>

          <div className="pagination-controls">
            <button
              type="button"
              className="pagination-nav-btn"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={safePage <= 1}
              title="Previous Page"
            >
              <FaChevronLeft className="page-nav-icon" />
              <span>Prev</span>
            </button>

            <div className="pagination-numbers">
              {getPageNumbers().map((p, idx) => {
                if (p === '...') {
                  return (
                    <span key={`ellipsis-${idx}`} className="pagination-ellipsis">
                      &hellip;
                    </span>
                  );
                }
                return (
                  <button
                    key={p}
                    type="button"
                    className={`pagination-num-btn ${safePage === p ? 'active' : ''}`}
                    onClick={() => setCurrentPage(p)}
                    disabled={totalPages <= 1}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="pagination-nav-btn"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={safePage >= totalPages}
              title="Next Page"
            >
              <span>Next</span>
              <FaChevronRight className="page-nav-icon" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const DashboardMinnagam = () => {
  const navigate = useNavigate();
  const isUserAuthenticated = isAuthenticated();
  const userData = getUserData();
  const userRole = (userData?.role || '').toLowerCase();
  const canApprove = userRole === 'treasurer' || userRole === 'admin' || userRole === 'owner';
  const isTreasurer = userRole === 'treasurer';

  const [activeTab, setActiveTab] = useState(isTreasurer ? 'submissions' : 'submit'); // default based on role
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'pending', 'approved', 'rejected'
  const [viewMode, setViewMode] = useState('tabs'); // 'tabs' (filtered by tab) or 'split' (all tables shown)
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

  // Certificate Modal State
  const [userProfile, setUserProfile] = useState(null);
  const [showCertModal, setShowCertModal] = useState(false);
  const [selectedCertData, setSelectedCertData] = useState(null);

  useEffect(() => {
    if (!isUserAuthenticated) {
      navigate('/'); // Redirect to home if not logged in
    } else {
      getUserProfile().then((prof) => {
        if (prof) setUserProfile(prof);
      });
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

      const response = await submitMinnagamForm(data);
      
      const newEntry = response?.data || {
        units: Number(formData.units),
        amount: calculateAmount(),
        nomineeName: formData.nomineeName,
        relation: formData.relation,
        utrNumber: formData.utrNumber,
        createdAt: new Date().toISOString()
      };

      // Set certificate data and immediately show certificate modal
      setSelectedCertData({
        ...newEntry,
        units: Number(formData.units),
        amount: calculateAmount(),
        user: (typeof newEntry.user === 'object' && newEntry.user !== null ? newEntry.user : null) || userProfile || userData || newEntry.user
      });
      setShowCertModal(true);

      setFormData({ nomineeName: '', relation: '', units: '', utrNumber: '', document: null });
      setStep(1);
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
      const rawList = Array.isArray(data) ? data : [];

      // Resolve registered member details for each submission so the correct user details are always present
      const populatedList = await Promise.all(
        rawList.map(async (sub) => {
          if (sub.user && typeof sub.user === 'object' && (sub.user.name || sub.user.phone_no)) {
            return sub;
          }
          const targetUid = typeof sub.user === 'string' ? sub.user : sub.user?._id;
          if (targetUid) {
            try {
              const uProfile = await getUserProfile(targetUid);
              if (uProfile) {
                return { ...sub, user: uProfile };
              }
            } catch (uErr) {
              console.warn(`Could not resolve user for submission ${sub._id}:`, uErr);
            }
          }
          return sub;
        })
      );

      setSubmissions(populatedList);
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

  const pendingSubmissions = submissions.filter(s => (s.status || '').toLowerCase() === 'pending');
  const approvedSubmissions = submissions.filter(s => (s.status || '').toLowerCase() === 'approved');
  const rejectedSubmissions = submissions.filter(s => (s.status || '').toLowerCase() === 'rejected');

  const totalCount = submissions.length;
  const pendingCount = pendingSubmissions.length;
  const approvedCount = approvedSubmissions.length;
  const rejectedCount = rejectedSubmissions.length;

  const getStatusTitle = () => {
    switch (statusFilter) {
      case 'pending':
        return 'Pending Submissions';
      case 'approved':
        return 'Approved Submissions';
      case 'rejected':
        return 'Rejected Submissions';
      default:
        return 'Minnagam Submissions';
    }
  };

  const renderSubmissionsTable = (subList, emptyMsg, tableKey) => (
    <PaginatedSubmissionsTable
      key={tableKey}
      subList={subList}
      emptyMsg={emptyMsg}
      itemsPerPage={10}
      canApprove={canApprove}
      handleStatusUpdate={handleStatusUpdate}
      actionLoading={actionLoading}
      setSelectedCertData={setSelectedCertData}
      setShowCertModal={setShowCertModal}
    />
  );

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
          <motion.div className="submissions-container dashboard-submissions-fullscreen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            
            <div className="submissions-top-bar">
              <h2 className="submissions-title">
                {canApprove 
                  ? (viewMode === 'split' ? 'All Minnagam Submissions' : getStatusTitle()) 
                  : 'My Submissions'}
              </h2>

              {/* View Switcher: Filter Tabs vs All Tables Stacked */}
              {canApprove && (
                <div className="view-mode-toggle">
                  <button 
                    type="button" 
                    className={`view-mode-btn ${viewMode === 'tabs' ? 'active' : ''}`}
                    onClick={() => setViewMode('tabs')}
                    title="Tab view by status"
                  >
                    <FaThList /> Tabs View
                  </button>
                  <button 
                    type="button" 
                    className={`view-mode-btn ${viewMode === 'split' ? 'active' : ''}`}
                    onClick={() => setViewMode('split')}
                    title="Show all tables together on one screen"
                  >
                    <FaColumns /> All Tables
                  </button>
                </div>
              )}
            </div>

            {/* Status Navigation Tabs (when in tabs mode) */}
            {canApprove && viewMode === 'tabs' && (
              <div className="status-filter-bar">
                <button
                  type="button"
                  className={`status-filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('all')}
                >
                  <FaLayerGroup className="filter-btn-icon" />
                  <span>All Submissions</span>
                  <span className="filter-count-badge count-all">{totalCount}</span>
                </button>

                <button
                  type="button"
                  className={`status-filter-btn ${statusFilter === 'approved' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('approved')}
                >
                  <FaCheckCircle className="filter-btn-icon text-green" />
                  <span>Approved Table</span>
                  <span className="filter-count-badge count-approved">{approvedCount}</span>
                </button>

                <button
                  type="button"
                  className={`status-filter-btn ${statusFilter === 'rejected' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('rejected')}
                >
                  <FaTimesCircle className="filter-btn-icon text-red" />
                  <span>Rejected Table</span>
                  <span className="filter-count-badge count-rejected">{rejectedCount}</span>
                </button>

                <button
                  type="button"
                  className={`status-filter-btn ${statusFilter === 'pending' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('pending')}
                >
                  <FaClock className="filter-btn-icon text-amber" />
                  <span>Pending Table</span>
                  <span className="filter-count-badge count-pending">{pendingCount}</span>
                </button>
              </div>
            )}

            {loading ? (
              <div className="loading-spinner"><FaSpinner className="spinner" /></div>
            ) : viewMode === 'split' && canApprove ? (
              /* All Tables View: Pending, Approved, and Rejected tables stacked */
              <div className="split-tables-wrapper">
                
                {/* 1. Pending Table */}
                <div className="split-table-section">
                  <div className="split-section-header header-pending">
                    <h3 className="split-section-title">
                      <FaClock className="text-amber" />
                      <span>Pending Submissions</span>
                    </h3>
                    <span className="split-count-pill pill-pending">{pendingCount} Pending</span>
                  </div>
                  {renderSubmissionsTable(pendingSubmissions, "No pending submissions found.", "split-pending")}
                </div>

                {/* 2. Approved Table */}
                <div className="split-table-section">
                  <div className="split-section-header header-approved">
                    <h3 className="split-section-title">
                      <FaCheckCircle className="text-green" />
                      <span>Approved Submissions</span>
                    </h3>
                    <span className="split-count-pill pill-approved">{approvedCount} Approved</span>
                  </div>
                  {renderSubmissionsTable(approvedSubmissions, "No approved submissions found.", "split-approved")}
                </div>

                {/* 3. Rejected Table */}
                <div className="split-table-section">
                  <div className="split-section-header header-rejected">
                    <h3 className="split-section-title">
                      <FaTimesCircle className="text-red" />
                      <span>Rejected Submissions</span>
                    </h3>
                    <span className="split-count-pill pill-rejected">{rejectedCount} Rejected</span>
                  </div>
                  {renderSubmissionsTable(rejectedSubmissions, "No rejected submissions found.", "split-rejected")}
                </div>

              </div>
            ) : (
              /* Tabs View: Render the selected table */
              renderSubmissionsTable(
                statusFilter === 'all' ? submissions :
                statusFilter === 'pending' ? pendingSubmissions :
                statusFilter === 'approved' ? approvedSubmissions :
                rejectedSubmissions,
                `No ${statusFilter === 'all' ? '' : statusFilter} submissions found.`,
                `tab-${statusFilter}`
              )
            )}
          </motion.div>
        )}
      </div>

      {/* Minnagam Certificate Modal */}
      <MinnagamCertificateModal
        show={showCertModal}
        onClose={() => setShowCertModal(false)}
        submissionData={selectedCertData}
        userData={selectedCertData?.user && typeof selectedCertData.user === 'object' ? selectedCertData.user : (!canApprove ? (userProfile || userData) : null)}
      />
    </div>
  );
};

export default DashboardMinnagam;
