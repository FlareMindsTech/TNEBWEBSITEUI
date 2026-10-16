import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import {
  FaIdCard,
  FaUser,
  FaMapMarkerAlt,
  FaFileAlt,
  FaCloudUploadAlt,
  FaPaperPlane,
  FaUndo,
  FaExclamationCircle,
  FaTrashAlt,
  FaFilePdf,
  FaFileWord,
  FaFileImage,
  FaSpinner
} from 'react-icons/fa';
import { submitGrievance, getUserData } from '../api';
import logo from '../assets/tnebea_logo_cropped2.png';
import './Grievance.css';

// Tamil Nadu Districts for quick autocomplete / selection
const TN_DISTRICTS = [
  'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore',
  'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram',
  'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai',
  'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai',
  'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi',
  'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli',
  'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur',
  'Vellore', 'Viluppuram', 'Virudhunagar', 'Head Office / Other'
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB in bytes

const Grievance = () => {
  const fileInputRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    lmNumber: '',
    name: '',
    district: '',
    grievanceDetails: '',
  });

  const [attachment, setAttachment] = useState(null);
  const [fileError, setFileError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // Validation & status
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Auto-prefill if user is logged in
  useEffect(() => {
    try {
      const user = getUserData();
      if (user) {
        setFormData((prev) => ({
          ...prev,
          lmNumber: prev.lmNumber || user.lm_number || user.lmNumber || '',
          name: prev.name || user.name || '',
          district: prev.district || user.city || user.district || '',
        }));
      }
    } catch (e) {
      console.warn('Could not read user data for prefill', e);
    }
  }, []);

  // Validate fields
  const validateField = (name, value) => {
    let error = '';
    if (name === 'lmNumber') {
      if (!value.trim()) {
        error = 'LM Number is required';
      }
    } else if (name === 'name') {
      if (!value.trim()) {
        error = 'Name is required';
      } else if (value.trim().length < 2) {
        error = 'Name must be at least 2 characters';
      }
    } else if (name === 'grievanceDetails') {
      if (!value.trim()) {
        error = 'Grievance Details are required';
      } else if (value.trim().length < 10) {
        error = 'Please provide at least 10 characters describing your grievance';
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  // File handling
  const handleFileChange = (file) => {
    if (!file) return;

    // Check size limit: Max 10 MB
    if (file.size > MAX_FILE_SIZE) {
      setFileError('File size exceeds the 10 MB limit. Please choose a smaller file.');
      setAttachment(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setFileError('');
    setAttachment(file);
  };

  const onFileInputChange = (e) => {
    const file = e.target.files?.[0];
    handleFileChange(file);
  };

  const handleRemoveFile = () => {
    setAttachment(null);
    setFileError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Drag and drop events
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFileChange(file);
  };

  // Helper for file type icon
  const getFileIcon = (file) => {
    if (!file) return <FaFileAlt />;
    const type = file.type || '';
    const name = (file.name || '').toLowerCase();
    if (type.includes('pdf') || name.endsWith('.pdf')) {
      return <FaFilePdf className="file-icon-pdf" />;
    }
    if (type.includes('word') || name.endsWith('.doc') || name.endsWith('.docx')) {
      return <FaFileWord className="file-icon-word" />;
    }
    if (type.startsWith('image/')) {
      return <FaFileImage className="file-icon-img" />;
    }
    return <FaFileAlt className="file-icon-gen" />;
  };

  const formatFileSize = (bytes) => {
    if (!bytes && bytes !== 0) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Form Reset
  const handleReset = () => {
    setFormData({
      lmNumber: '',
      name: '',
      district: '',
      grievanceDetails: '',
    });
    setAttachment(null);
    setFileError('');
    setTouched({});
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all required fields as touched
    const touchedState = {
      lmNumber: true,
      name: true,
      grievanceDetails: true,
    };
    setTouched(touchedState);

    const newErrors = {
      lmNumber: validateField('lmNumber', formData.lmNumber),
      name: validateField('name', formData.name),
      grievanceDetails: validateField('grievanceDetails', formData.grievanceDetails),
    };
    setErrors(newErrors);

    if (newErrors.lmNumber || newErrors.name || newErrors.grievanceDetails || fileError) {
      Swal.fire({
        icon: 'warning',
        title: 'Please Check Required Fields',
        text: 'Kindly fill in all required fields marked with an asterisk (*) correctly before submitting.',
        confirmButtonColor: '#1b5baf',
        background: '#ffffff',
        color: '#0e2649',
      });
      return;
    }

    setSubmitting(true);

    try {
      // Build FormData payload
      const payload = new FormData();
      payload.append('lmNumber', formData.lmNumber.trim());
      payload.append('name', formData.name.trim());
      if (formData.district.trim()) {
        payload.append('district', formData.district.trim());
      }
      payload.append('grievanceDetails', formData.grievanceDetails.trim());

      if (attachment) {
        payload.append('attachment', attachment);
      }

      const res = await submitGrievance(payload);

      if (res && res.success) {
        Swal.fire({
          icon: 'success',
          title: 'Grievance Submitted Successfully!',
          html: `
            <div style="text-align: left; padding: 0.5rem 0; font-size: 0.95rem; color: #1e293b;">
              <p style="margin-bottom: 0.5rem;">Your grievance has been securely registered in the TNEBEA system.</p>
              <div style="background: #f1f5f9; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #1b5baf; margin: 12px 0;">
                <strong>Member:</strong> ${res.data.name} (LM: ${res.data.lmNumber})<br/>
                ${res.data.district ? `<strong>District:</strong> ${res.data.district}<br/>` : ''}
                <strong>Submitted On:</strong> ${new Date(res.data.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
              <p style="margin-bottom: 0; font-size: 0.85rem; color: #64748b;">
                Our Central Executive Committee will review and process your submission.
              </p>
            </div>
          `,
          confirmButtonText: 'Great, Thank You',
          confirmButtonColor: '#1b5baf',
          background: '#ffffff',
          color: '#0e2649',
        });

        // Reset form
        handleReset();
      } else {
        throw new Error(res?.message || 'Failed to submit grievance');
      }
    } catch (err) {
      console.error('Error submitting grievance:', err);
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: err.message || 'An error occurred while submitting your grievance. Please verify your internet connection and try again.',
        confirmButtonColor: '#1b5baf',
        background: '#ffffff',
        color: '#0e2649',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page-wrapper grievance-page-wrapper">
      <motion.div 
        className="auth-page-card wide grievance-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Floating Top Emblem Avatar */}
        <div className="auth-page-avatar">
          <img src={logo} alt="TNEBEA Logo" />
        </div>

        {/* Header Title Box */}
        <div className="auth-header-title-box">
          <h2 className="auth-register-heading">Grievance Form</h2>
          <p className="auth-register-subheading">
            All fields marked with an asterisk (<span className="auth-required-star">*</span>) are mandatory.
          </p>
        </div>

        <form noValidate onSubmit={handleSubmit} className="auth-page-form">
          <div className="auth-page-grid">
            {/* 1. LM Number */}
            <div className="auth-field-group">
              <label className="auth-form-label" htmlFor="grievance-lm-number">
                LM Number <span className="auth-required-star">*</span>
              </label>
              <div className={`auth-page-input-wrapper ${touched.lmNumber && errors.lmNumber ? 'has-error' : ''}`}>
                <span className="auth-page-input-icon"><FaIdCard /></span>
                <input
                  id="grievance-lm-number"
                  name="lmNumber"
                  type="text"
                  placeholder="Enter LM Number"
                  className="auth-page-input"
                  value={formData.lmNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </div>
              {touched.lmNumber && errors.lmNumber && (
                <div className="auth-page-field-error" role="alert">
                  <FaExclamationCircle className="field-error-icon" />
                  <span>{errors.lmNumber}</span>
                </div>
              )}
            </div>

            {/* 2. Name */}
            <div className="auth-field-group">
              <label className="auth-form-label" htmlFor="grievance-name">
                Name <span className="auth-required-star">*</span>
              </label>
              <div className={`auth-page-input-wrapper ${touched.name && errors.name ? 'has-error' : ''}`}>
                <span className="auth-page-input-icon"><FaUser /></span>
                <input
                  id="grievance-name"
                  name="name"
                  type="text"
                  placeholder="Enter Name"
                  className="auth-page-input"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </div>
              {touched.name && errors.name && (
                <div className="auth-page-field-error" role="alert">
                  <FaExclamationCircle className="field-error-icon" />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* 3. District */}
          <div className="auth-field-group">
            <label className="auth-form-label" htmlFor="grievance-district">
              District
            </label>
            <div className="auth-page-input-wrapper">
              <span className="auth-page-input-icon"><FaMapMarkerAlt /></span>
              <input
                id="grievance-district"
                name="district"
                type="text"
                list="grievance-district-options"
                placeholder="Enter or select District"
                className="auth-page-input"
                value={formData.district}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <datalist id="grievance-district-options">
                {TN_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist} />
                ))}
              </datalist>
            </div>
          </div>

          {/* 4. Grievance Details */}
          <div className="auth-field-group">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label className="auth-form-label mb-0" htmlFor="grievance-details">
                Grievance Details <span className="auth-required-star">*</span>
              </label>
              <span className="grievance-char-count">
                {formData.grievanceDetails.length} characters
              </span>
            </div>
            <div className={`auth-page-input-wrapper textarea-mode ${touched.grievanceDetails && errors.grievanceDetails ? 'has-error' : ''}`}>
              <span className="auth-page-input-icon textarea-icon"><FaFileAlt /></span>
              <textarea
                id="grievance-details"
                name="grievanceDetails"
                rows={5}
                placeholder="Enter your grievance details here..."
                className="auth-page-input auth-page-textarea"
                value={formData.grievanceDetails}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
            </div>
            {touched.grievanceDetails && errors.grievanceDetails && (
              <div className="auth-page-field-error" role="alert">
                <FaExclamationCircle className="field-error-icon" />
                <span>{errors.grievanceDetails}</span>
              </div>
            )}
          </div>

          {/* 5. Upload Supporting Attachment(s) (Optional) */}
          <div className="auth-field-group">
            <label className="auth-form-label">
              Upload Supporting Attachment(s) (Optional)
            </label>

            <div 
              className={`grievance-dropzone ${isDragging ? 'is-dragging' : ''} ${attachment ? 'has-file' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.xls,.xlsx"
                onChange={onFileInputChange}
                className="visually-hidden-file-input"
              />

              {!attachment ? (
                <div className="dropzone-content">
                  <div className="dropzone-icon">
                    <FaCloudUploadAlt />
                  </div>
                  <div className="dropzone-text">
                    <span className="dropzone-title">
                      <strong className="dropzone-link">Click to browse</strong> or drag &amp; drop file here
                    </span>
                    <span className="dropzone-subtitle">
                      Upload 1 supported file. Max 10 MB.
                    </span>
                    <span className="dropzone-hint">
                      Supported formats: PDF, DOC, DOCX, JPG, PNG
                    </span>
                  </div>
                </div>
              ) : (
                <div className="dropzone-file-item" onClick={(e) => e.stopPropagation()}>
                  <div className="dropzone-file-left">
                    <div className="file-icon-box">
                      {getFileIcon(attachment)}
                    </div>
                    <div className="file-meta">
                      <span className="file-name" title={attachment.name}>{attachment.name}</span>
                      <span className="file-size">{formatFileSize(attachment.size)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-file-remove"
                    onClick={handleRemoveFile}
                    title="Remove file"
                    aria-label="Remove file"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              )}
            </div>

            {fileError && (
              <div className="auth-page-field-error mt-2" role="alert">
                <FaExclamationCircle className="field-error-icon" />
                <span>{fileError}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grievance-btn-row">
            <button
              type="button"
              onClick={handleReset}
              disabled={submitting}
              className="grievance-btn-reset"
            >
              <FaUndo className="me-2" /> Reset
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="auth-page-btn grievance-submit-btn"
            >
              {submitting ? (
                <>
                  <FaSpinner className="spinner-icon me-2" />
                  SUBMITTING...
                </>
              ) : (
                <>
                  <FaPaperPlane className="me-2" />
                  SUBMIT GRIEVANCE
                </>
              )}
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
};

export default Grievance;
