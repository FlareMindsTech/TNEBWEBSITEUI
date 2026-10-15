import React, { useRef, useState, useEffect } from 'react';
import { FaDownload, FaPrint, FaTimes, FaEdit, FaFilePdf, FaImage, FaAward, FaCheck } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { numberToWords, unitsToWords } from '../utils/numberToWords';
import { getUserProfile, getUserData } from '../api';
import './MinnagamCertificateModal.css';
import certificateTemplateImg from '../assets/minnagam_certificate_sample.jpg';

const MinnagamCertificateModal = ({ show, onClose, submissionData, userData }) => {
  const certificateRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Initial calculation
  const initialUnits = submissionData?.units || 1;
  const initialAmount = submissionData?.amount || (initialUnits * 20000);

  // Format Certificate Number suffix
  const getCertSuffix = () => {
    if (submissionData?.certificateNumber) {
      // If it's already full format like TNEBEA/2025-26/0014, extract suffix
      const parts = submissionData.certificateNumber.split('/');
      return parts[parts.length - 1];
    }
    if (submissionData?._id) {
      return submissionData._id.slice(-4).toUpperCase();
    }
    return String(Math.floor(1000 + Math.random() * 9000));
  };

  const formatDate = (dateVal) => {
    if (!dateVal) return '';
    try {
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return String(dateVal);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    } catch {
      return String(dateVal);
    }
  };

  const resolveUserObj = (target) => {
    if (target && typeof target === 'object' && (target.name || target.email || target.phone_no || target.emp_id || target.date_of_birth)) {
      return target;
    }
    return null;
  };

  const getFieldValue = (obj, fields) => {
    if (!obj || typeof obj !== 'object') return '';
    for (const f of fields) {
      if (obj[f] !== undefined && obj[f] !== null && String(obj[f]).trim() !== '') {
        return obj[f];
      }
    }
    return '';
  };

  // State for editable fields
  const [certDetails, setCertDetails] = useState({
    certNo: '',
    name: '',
    dateOfBirth: '',
    empId: '',
    mobileNo: '',
    units: initialUnits,
    amount: initialAmount,
  });

  // Sync state on submission or user prop changes
  useEffect(() => {
    if (!show) {
      setIsEditing(false);
      return;
    }

    const units = submissionData?.units || 1;
    const amount = submissionData?.amount || (units * 20000);

    const currentUser = getUserData() || {};
    const currentUserRole = (currentUser?.role || '').toLowerCase();
    const isViewerAdminOrTreasurer = ['treasurer', 'admin', 'owner'].includes(currentUserRole);

    // 1. Resolve registered member object directly from submissionData
    let registeredUser = resolveUserObj(submissionData?.user);

    // If submissionData.user is not a full object, check if userData passed is NOT the admin/treasurer
    if (!registeredUser) {
      const candidateUser = resolveUserObj(userData);
      if (candidateUser) {
        const candidateRole = (candidateUser.role || '').toLowerCase();
        if (!isViewerAdminOrTreasurer || (candidateRole !== 'treasurer' && candidateRole !== 'admin' && candidateRole !== 'owner')) {
          registeredUser = candidateUser;
        }
      }
    }

    // Fallback to current logged-in user ONLY IF viewer is a regular user (not treasurer/admin)
    if (!registeredUser && !isViewerAdminOrTreasurer) {
      registeredUser = resolveUserObj(currentUser);
    }

    const immediateName = getFieldValue(registeredUser, ['name', 'fullName', 'userName']);
    const immediateDob = formatDate(getFieldValue(registeredUser, ['date_of_birth', 'dob', 'dateOfBirth', 'birthDate']));
    const immediateEmp = getFieldValue(registeredUser, ['emp_id', 'pbo_number', 'ppo_number', 'lm_number', 'employeeId', 'ppoNumber']);
    const immediateMobile = getFieldValue(registeredUser, ['phone_no', 'phoneno', 'phone', 'mobile', 'mobileNo']);

    setCertDetails({
      certNo: getCertSuffix(),
      name: immediateName,
      dateOfBirth: immediateDob,
      empId: immediateEmp,
      mobileNo: immediateMobile,
      units: units,
      amount: amount
    });

    // 2. Query backend profile if user ID exists to ensure complete details
    let targetUserId = null;
    if (submissionData?.user) {
      if (typeof submissionData.user === 'string') {
        targetUserId = submissionData.user;
      } else if (typeof submissionData.user === 'object' && submissionData.user._id) {
        targetUserId = submissionData.user._id;
      }
    }

    // Only fallback targetUserId to current user if viewer is regular member
    if (!targetUserId && !isViewerAdminOrTreasurer) {
      targetUserId = userData?._id || currentUser?._id;
    }

    if (targetUserId) {
      getUserProfile(targetUserId)
        .then((profile) => {
          if (profile) {
            const pName = getFieldValue(profile, ['name', 'fullName', 'userName']);
            const pDob = formatDate(getFieldValue(profile, ['date_of_birth', 'dob', 'dateOfBirth']));
            const pEmp = getFieldValue(profile, ['emp_id', 'pbo_number', 'ppo_number', 'lm_number', 'employeeId']);
            const pMobile = getFieldValue(profile, ['phone_no', 'phoneno', 'phone', 'mobile', 'mobileNo']);

            setCertDetails((prev) => ({
              ...prev,
              name: pName || prev.name || '',
              dateOfBirth: pDob || prev.dateOfBirth || '',
              empId: pEmp || prev.empId || '',
              mobileNo: pMobile || prev.mobileNo || ''
            }));
          }
        })
        .catch((err) => {
          console.warn('Could not fetch user profile for certificate:', err);
        });
    }
  }, [submissionData, userData, show]);

  if (!show) return null;

  const handleInputChange = (field, value) => {
    if (field === 'units') {
      const u = parseInt(value, 10) || 1;
      setCertDetails(prev => ({
        ...prev,
        units: u,
        amount: u * 20000
      }));
    } else {
      setCertDetails(prev => ({ ...prev, [field]: value }));
    }
  };

  const cleanFilename = () => {
    const safeNo = (certDetails.certNo || '0001').replace(/[^a-zA-Z0-9_-]/g, '_');
    return `TNEBEA_Minnagam_Certificate_${safeNo}`;
  };

  // Download PDF with Ultra-High Resolution (300+ DPI)
  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;
    try {
      setDownloading(true);
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 0
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'SLOW');
      pdf.save(`${cleanFilename()}.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      alert('Could not download PDF. Please try PNG or Print.');
    } finally {
      setDownloading(false);
    }
  };

  // Download PNG with Ultra-High Clarity
  const handleDownloadPNG = async () => {
    if (!certificateRef.current) return;
    try {
      setDownloading(true);
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 0
      });

      const link = document.createElement('a');
      link.download = `${cleanFilename()}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (err) {
      console.error('Failed to generate image:', err);
      alert('Could not download image.');
    } finally {
      setDownloading(false);
    }
  };

  // Print
  const handlePrint = () => {
    window.print();
  };

  const unitsWord = unitsToWords(certDetails.units);
  const amountWord = numberToWords(certDetails.amount);

  return (
    <div className="minnagam-cert-modal-overlay" onClick={onClose}>
      <div className="minnagam-cert-modal-wrapper" onClick={(e) => e.stopPropagation()}>
        
        {/* Top Control Bar */}
        <div className="minnagam-cert-modal-header">
          <div className="cert-header-title-box">
            <FaAward className="cert-header-icon" />
            <h3 className="cert-header-title">Minnagam Contribution Certificate</h3>
            <span className="cert-header-badge">Official Receipt</span>
          </div>

          <div className="cert-header-actions">
            <button 
              type="button" 
              className={`cert-action-btn cert-btn-edit ${isEditing ? 'active' : ''}`}
              onClick={() => setIsEditing(!isEditing)}
              title="Edit Member Information"
            >
              <FaEdit /> {isEditing ? 'Hide Details' : 'Verify / Edit Details'}
            </button>

            <button 
              type="button" 
              className="cert-action-btn cert-btn-print"
              onClick={handlePrint}
              title="Print Certificate"
            >
              <FaPrint /> Print
            </button>

            <button 
              type="button" 
              className="cert-action-btn cert-btn-png"
              onClick={handleDownloadPNG}
              disabled={downloading}
              title="Download PNG Image"
            >
              <FaImage /> PNG
            </button>

            <button 
              type="button" 
              className="cert-action-btn cert-btn-download"
              onClick={handleDownloadPDF}
              disabled={downloading}
              title="Download Official PDF Certificate"
            >
              <FaFilePdf /> {downloading ? 'Generating...' : 'Download PDF'}
            </button>

            <button 
              type="button" 
              className="cert-btn-close" 
              onClick={onClose}
              title="Close"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Optional Member Details Inline Editor */}
        {isEditing && (
          <div className="cert-edit-panel">
            <div className="cert-edit-panel-header">
              <FaEdit />
              <span>Verify and adjust member details to appear on this certificate:</span>
            </div>
            <div className="cert-edit-grid">
              <div className="cert-edit-field">
                <label>Certificate No. Suffix</label>
                <input 
                  type="text" 
                  value={certDetails.certNo} 
                  onChange={(e) => handleInputChange('certNo', e.target.value)} 
                  placeholder="e.g. 0014"
                />
              </div>
              <div className="cert-edit-field">
                <label>Member Name</label>
                <input 
                  type="text" 
                  value={certDetails.name} 
                  onChange={(e) => handleInputChange('name', e.target.value)} 
                  placeholder="Enter full name"
                />
              </div>
              <div className="cert-edit-field">
                <label>Date of Birth</label>
                <input 
                  type="text" 
                  value={certDetails.dateOfBirth} 
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)} 
                  placeholder="DD-MM-YYYY"
                />
              </div>
              <div className="cert-edit-field">
                <label>Employee ID / PPO No.</label>
                <input 
                  type="text" 
                  value={certDetails.empId} 
                  onChange={(e) => handleInputChange('empId', e.target.value)} 
                  placeholder="Employee ID or PPO Number"
                />
              </div>
              <div className="cert-edit-field">
                <label>Mobile Number</label>
                <input 
                  type="text" 
                  value={certDetails.mobileNo} 
                  onChange={(e) => handleInputChange('mobileNo', e.target.value)} 
                  placeholder="Mobile number"
                />
              </div>
              <div className="cert-edit-field">
                <label>Number of Units</label>
                <input 
                  type="number" 
                  min="1"
                  value={certDetails.units} 
                  onChange={(e) => handleInputChange('units', e.target.value)} 
                />
              </div>
            </div>
          </div>
        )}

        {/* Certificate Render Canvas */}
        <div className="minnagam-cert-modal-body">
          <div 
            className="minnagam-exact-cert-container" 
            ref={certificateRef} 
            id="minnagam-certificate-sheet"
          >
            {/* The Official Certificate Base Template */}
            <img 
              src={certificateTemplateImg} 
              alt="TNEB Engineers' Association Certificate" 
              className="exact-cert-template-img"
            />

            {/* Overlay 1: Certificate Number Suffix on the line */}
            <div className="exact-cert-field cert-no-overlay">
              {certDetails.certNo || '0001'}
            </div>

            {/* Overlay 2: Name on the underline */}
            <div className="exact-cert-field name-overlay">
              {certDetails.name || ''}
            </div>

            {/* Overlay 3: Date of Birth on the underline */}
            <div className="exact-cert-field dob-overlay">
              {certDetails.dateOfBirth || ''}
            </div>

            {/* Overlay 4: Employee ID / PPO No. on the underline */}
            <div className="exact-cert-field empid-overlay">
              {certDetails.empId || ''}
            </div>

            {/* Overlay 5: Mobile No. on the underline */}
            <div className="exact-cert-field mobile-overlay">
              {certDetails.mobileNo || ''}
            </div>

            {/* Overlay 6: Number of Units Purchased (inside box) */}
            <div className="exact-cert-patch units-patch-overlay">
              {certDetails.units} {unitsWord ? `(${unitsWord})` : ''}
            </div>

            {/* Overlay 7: Amount Received (inside box) */}
            <div className="exact-cert-patch amount-patch-overlay">
              ₹ {certDetails.amount?.toLocaleString()}/-
            </div>

            {/* Overlay 8: Amount in Words (between ornaments) */}
            <div className="exact-cert-patch words-patch-overlay">
              (Rupees {amountWord || 'Zero'} Only)
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default MinnagamCertificateModal;
