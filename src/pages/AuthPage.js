import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUserLock, FaUserPlus, FaEnvelope, FaLock,
  FaUser, FaPhoneAlt, FaMapMarkerAlt, FaIdBadge,
  FaIdCard, FaUserTie, FaArrowLeft, FaEye, FaEyeSlash,
  FaCalendarAlt, FaExclamationCircle
} from 'react-icons/fa';
import { loginUser, registerUser, forgotPassword } from '../api';
import './AuthPage.css';
import logo from '../assets/tnebea_logo_cropped2.png';

const AuthPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('login');
  const [loading, setLoading] = useState(false);

  // Forms
  const [loginForm, setLoginForm] = useState({ identifier: '', password: '' });
  const [loginErrors, setLoginErrors] = useState({});
  const [loginTouched, setLoginTouched] = useState({});

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone_no: '',
    city: '',
    lm_number: '',
    pbo_number: '',
    emp_id: '',
    date_of_birth: '',
    password: '',
    confirmPassword: ''
  });
  const [registerErrors, setRegisterErrors] = useState({});
  const [registerTouched, setRegisterTouched] = useState({});
  const [registerSubmitted, setRegisterSubmitted] = useState(false);

  const [forgotForm, setForgotForm] = useState({
    identifier: '',
    password: '',
    confirmPassword: ''
  });
  const [forgotErrors, setForgotErrors] = useState({});
  const [forgotTouched, setForgotTouched] = useState({});

  // Password visibility
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showForgotConfirmPassword, setShowForgotConfirmPassword] = useState(false);

  // Today for date max attribute
  const todayStr = new Date().toISOString().split('T')[0];

  const switchTab = (newTab) => {
    setTab(newTab);
    setRegisterErrors({});
    setRegisterTouched({});
    setRegisterSubmitted(false);
    setLoginErrors({});
    setLoginTouched({});
    setForgotErrors({});
    setForgotTouched({});
  };

  // --- Registration Field Validation ---
  const validateRegisterField = (fieldName, value, form = registerForm) => {
    const val = (value || '').toString().trim();

    switch (fieldName) {
      case 'name':
        if (!val) return 'Full Name is required';
        if (val.length < 3) return 'Name must be at least 3 characters';
        if (!/^[a-zA-Z\s.]+$/.test(val)) return 'Name should only contain letters, spaces, or dots';
        return '';

      case 'email':
        if (!val) return 'Email Address is required';
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)) {
          return 'Please enter a valid email address (e.g. name@domain.com)';
        }
        return '';

      case 'phone_no':
        if (!val) return 'Phone Number is required';
        if (!/^\d+$/.test(val)) return 'Phone number must contain only digits';
        if (val.length !== 10) return 'Phone number must be exactly 10 digits';
        if (!/^[6-9]\d{9}$/.test(val)) return 'Mobile number must start with 6, 7, 8, or 9';
        return '';

      case 'city':
        if (!val) return 'City is required';
        if (val.length < 2) return 'City must be at least 2 characters';
        return '';

      case 'lm_number':
        if (!val) return 'LM Number is required';
        if (val.length < 2) return 'LM Number must be at least 2 characters';
        return '';

      case 'pbo_number':
        if (!val) return 'PPO Number is required';
        if (val.length < 2) return 'PPO Number must be at least 2 characters';
        return '';

      case 'emp_id':
        if (!val) return 'Employee ID is required';
        if (val.length < 2) return 'Employee ID must be at least 2 characters';
        return '';

      case 'date_of_birth':
        if (!val) return 'Date of Birth is required';
        const dobDate = new Date(val);
        if (isNaN(dobDate.getTime())) return 'Please select a valid date';
        const now = new Date();
        if (dobDate > now) return 'Date of Birth cannot be in the future';
        const minAdultDate = new Date();
        minAdultDate.setFullYear(minAdultDate.getFullYear() - 18);
        if (dobDate > minAdultDate) return 'Applicant must be at least 18 years of age';
        if (dobDate < new Date('1920-01-01')) return 'Please enter a valid Date of Birth';
        return '';

      case 'password':
        if (!val) return 'Password is required';
        if (val.length < 6) return 'Password must be at least 6 characters';
        return '';

      case 'confirmPassword':
        if (!val) return 'Please confirm your password';
        if (val !== form.password) return 'Passwords do not match';
        return '';

      default:
        return '';
    }
  };

  const validateAllRegisterFields = (form = registerForm) => {
    const fields = [
      'name', 'email', 'phone_no', 'city',
      'lm_number', 'pbo_number', 'emp_id',
      'date_of_birth', 'password', 'confirmPassword'
    ];
    const newErrors = {};
    fields.forEach((field) => {
      const err = validateRegisterField(field, form[field], form);
      if (err) newErrors[field] = err;
    });
    return newErrors;
  };

  const handleRegisterChange = (field, value) => {
    let sanitizedVal = value;
    if (field === 'phone_no') {
      sanitizedVal = value.replace(/\D/g, '').slice(0, 10);
    }

    const updatedForm = { ...registerForm, [field]: sanitizedVal };
    setRegisterForm(updatedForm);

    if (registerTouched[field] || registerSubmitted) {
      const err = validateRegisterField(field, sanitizedVal, updatedForm);
      setRegisterErrors((prev) => ({ ...prev, [field]: err }));
    }

    if (field === 'password' && (registerTouched.confirmPassword || registerSubmitted || registerForm.confirmPassword)) {
      const confirmErr = validateRegisterField('confirmPassword', updatedForm.confirmPassword, updatedForm);
      setRegisterErrors((prev) => ({ ...prev, confirmPassword: confirmErr }));
    }
  };

  const handleRegisterBlur = (field) => {
    setRegisterTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateRegisterField(field, registerForm[field], registerForm);
    setRegisterErrors((prev) => ({ ...prev, [field]: err }));
  };

  // --- Submit Registration ---
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterSubmitted(true);

    const allTouched = {
      name: true, email: true, phone_no: true, city: true,
      lm_number: true, pbo_number: true, emp_id: true,
      date_of_birth: true, password: true, confirmPassword: true
    };
    setRegisterTouched(allTouched);

    const formErrors = validateAllRegisterFields(registerForm);
    setRegisterErrors(formErrors);

    const errorFields = Object.keys(formErrors);
    if (errorFields.length > 0) {
      const firstInvalidField = errorFields[0];
      const el = document.getElementById(`auth-reg-${firstInvalidField}`);
      if (el) {
        el.focus();
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      Swal.fire({
        icon: 'warning',
        title: 'Required Fields Missing',
        text: 'Please fill in all required fields marked with * and correct the highlighted errors.',
        confirmButtonColor: '#1b5baf'
      });
      return;
    }

    try {
      setLoading(true);
      await registerUser(registerForm);
      setLoading(false);

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Your account has been registered successfully. You can now login.',
        confirmButtonColor: '#1b5baf'
      });

      setRegisterForm({
        name: '', email: '', phone_no: '', city: '',
        lm_number: '', pbo_number: '', date_of_birth: '', emp_id: '',
        password: '', confirmPassword: ''
      });
      setRegisterErrors({});
      setRegisterTouched({});
      setRegisterSubmitted(false);
      setTab('login');
    } catch (error) {
      setLoading(false);
      const serverMsg = error.response?.data?.message || error.response?.data?.error || 'Registration failed. Please try again.';
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: serverMsg,
        confirmButtonColor: '#1b5baf'
      });
    }
  };

  // --- Login Handler ---
  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!loginForm.identifier.trim()) errors.identifier = 'Email or Phone Number is required';
    if (!loginForm.password) errors.password = 'Password is required';

    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      setLoginTouched({ identifier: true, password: true });
      return;
    }

    try {
      setLoading(true);
      const response = await loginUser({ identifier: loginForm.identifier, password: loginForm.password });
      setLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: `Welcome back, ${response.name || 'User'}!`,
        confirmButtonColor: '#1b5baf'
      });
      navigate('/dashboard/minnagam');
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response?.data?.error || error.response?.data?.message || 'Invalid credentials',
        confirmButtonColor: '#1b5baf'
      });
    }
  };

  // --- Forgot Password Handler ---
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!forgotForm.identifier.trim()) errors.identifier = 'Email or Phone Number is required';
    if (!forgotForm.password) errors.password = 'New Password is required';
    else if (forgotForm.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (!forgotForm.confirmPassword) errors.confirmPassword = 'Confirm Password is required';
    else if (forgotForm.password !== forgotForm.confirmPassword) errors.confirmPassword = 'Passwords do not match';

    if (Object.keys(errors).length > 0) {
      setForgotErrors(errors);
      setForgotTouched({ identifier: true, password: true, confirmPassword: true });
      return;
    }

    try {
      setLoading(true);
      const response = await forgotPassword(forgotForm);
      setLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: response.message || 'Password has been successfully updated.',
        confirmButtonColor: '#1b5baf'
      });
      setForgotForm({ identifier: '', password: '', confirmPassword: '' });
      setForgotErrors({});
      setForgotTouched({});
      setTab('login');
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: error.response?.data?.error || error.response?.data?.message || 'Could not reset password',
        confirmButtonColor: '#1b5baf'
      });
    }
  };

  // Render Input Component with error feedback
  const renderInput = (icon, props, suffixIcon = null, error = null) => (
    <div className="auth-field-group">
      <div className={`auth-page-input-wrapper ${error ? 'has-error' : ''}`}>
        <span className="auth-page-input-icon">{icon}</span>
        <input
          className="auth-page-input"
          {...props}
          value={props.value || ''}
          style={{ ...props.style, paddingRight: suffixIcon ? '45px' : undefined }}
        />
        {suffixIcon && (
          <span className="auth-page-input-suffix-icon" tabIndex="-1">
            {suffixIcon}
          </span>
        )}
      </div>
      {error && (
        <div className="auth-page-field-error" role="alert">
          <FaExclamationCircle className="field-error-icon" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="auth-page-wrapper">
      <div className={`auth-page-card ${tab === 'register' ? 'wide' : ''}`}>
        <div className="auth-page-avatar">
          <img src={logo} alt="TNEBEA Logo" />
        </div>

        <div className="auth-page-form">
          {tab === 'login' ? (
            <motion.div key="auth-login" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Form noValidate onSubmit={handleLogin}>
                <Form.Group style={{ marginBottom: '18px' }}>
                  <Form.Label className="auth-form-label">
                    Email or Phone Number <span className="auth-required-star">*</span>
                  </Form.Label>
                  {renderInput(
                    <FaIdBadge />,
                    {
                      id: 'auth-login-identifier',
                      name: 'identifier',
                      type: 'text',
                      placeholder: 'Enter Email or Phone Number',
                      value: loginForm.identifier,
                      onChange: (e) => {
                        setLoginForm({ ...loginForm, identifier: e.target.value });
                        if (loginTouched.identifier) setLoginErrors((prev) => ({ ...prev, identifier: '' }));
                      },
                      onBlur: () => setLoginTouched((prev) => ({ ...prev, identifier: true }))
                    },
                    null,
                    loginTouched.identifier ? loginErrors.identifier : null
                  )}
                </Form.Group>

                <Form.Group style={{ marginBottom: '18px' }}>
                  <Form.Label className="auth-form-label">
                    Password <span className="auth-required-star">*</span>
                  </Form.Label>
                  {renderInput(
                    <FaLock />,
                    {
                      id: 'auth-login-password',
                      name: 'password',
                      type: showLoginPassword ? 'text' : 'password',
                      placeholder: 'Enter Password',
                      value: loginForm.password,
                      onChange: (e) => {
                        setLoginForm({ ...loginForm, password: e.target.value });
                        if (loginTouched.password) setLoginErrors((prev) => ({ ...prev, password: '' }));
                      },
                      onBlur: () => setLoginTouched((prev) => ({ ...prev, password: true }))
                    },
                    <div onClick={() => setShowLoginPassword(!showLoginPassword)} style={{ cursor: 'pointer' }}>
                      {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>,
                    loginTouched.password ? loginErrors.password : null
                  )}
                </Form.Group>

                <div className="auth-page-actions">
                  <Form.Check type="checkbox" label="Remember me" id="remember-me" style={{ fontSize: '14px' }} />
                  <Link to="#" className="auth-page-link" style={{ fontSize: '14px' }} onClick={(e) => { e.preventDefault(); switchTab('forgot'); }}>
                    Forgot Password?
                  </Link>
                </div>

                <button type="submit" className="auth-page-btn" disabled={loading}>
                  {loading ? 'PROCESSING...' : 'LOGIN'}
                </button>

                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
                  <span style={{ color: '#666' }}>Don't have an account? </span>
                  <Link to="#" className="auth-page-link" onClick={(e) => { e.preventDefault(); switchTab('register'); }}>
                    Register now
                  </Link>
                </div>
              </Form>
            </motion.div>
          ) : tab === 'register' ? (
            <motion.div key="auth-register" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="auth-header-title-box">
                <h3 className="auth-register-heading">Member Registration</h3>
                <p className="auth-register-subheading">All fields marked with an asterisk (<span className="auth-required-star">*</span>) are mandatory.</p>
              </div>

              {registerSubmitted && Object.values(registerErrors).some(Boolean) && (
                <div className="auth-form-error-banner" role="alert">
                  <FaExclamationCircle className="banner-icon" />
                  <span>Please fill in all required fields marked with * and correct the errors below.</span>
                </div>
              )}

              <Form noValidate onSubmit={handleRegister}>
                <div className="auth-page-grid">
                  {/* 1. Full Name */}
                  <Form.Group className="auth-form-group">
                    <Form.Label className="auth-form-label">
                      Full Name <span className="auth-required-star">*</span>
                    </Form.Label>
                    {renderInput(
                      <FaUser />,
                      {
                        id: 'auth-reg-name',
                        name: 'name',
                        type: 'text',
                        placeholder: 'Enter Full Name',
                        value: registerForm.name,
                        onChange: (e) => handleRegisterChange('name', e.target.value),
                        onBlur: () => handleRegisterBlur('name')
                      },
                      null,
                      (registerTouched.name || registerSubmitted) ? registerErrors.name : null
                    )}
                  </Form.Group>

                  {/* 2. Email Address */}
                  <Form.Group className="auth-form-group">
                    <Form.Label className="auth-form-label">
                      Email Address <span className="auth-required-star">*</span>
                    </Form.Label>
                    {renderInput(
                      <FaEnvelope />,
                      {
                        id: 'auth-reg-email',
                        name: 'email',
                        type: 'email',
                        placeholder: 'Enter Email Address',
                        value: registerForm.email,
                        onChange: (e) => handleRegisterChange('email', e.target.value),
                        onBlur: () => handleRegisterBlur('email')
                      },
                      null,
                      (registerTouched.email || registerSubmitted) ? registerErrors.email : null
                    )}
                  </Form.Group>

                  {/* 3. Phone Number */}
                  <Form.Group className="auth-form-group">
                    <Form.Label className="auth-form-label">
                      Phone Number <span className="auth-required-star">*</span>
                    </Form.Label>
                    {renderInput(
                      <FaPhoneAlt />,
                      {
                        id: 'auth-reg-phone_no',
                        name: 'phone_no',
                        type: 'tel',
                        placeholder: 'Enter 10-digit Phone Number',
                        maxLength: 10,
                        value: registerForm.phone_no,
                        onChange: (e) => handleRegisterChange('phone_no', e.target.value),
                        onBlur: () => handleRegisterBlur('phone_no')
                      },
                      null,
                      (registerTouched.phone_no || registerSubmitted) ? registerErrors.phone_no : null
                    )}
                  </Form.Group>

                  {/* 4. City */}
                  <Form.Group className="auth-form-group">
                    <Form.Label className="auth-form-label">
                      City <span className="auth-required-star">*</span>
                    </Form.Label>
                    {renderInput(
                      <FaMapMarkerAlt />,
                      {
                        id: 'auth-reg-city',
                        name: 'city',
                        type: 'text',
                        placeholder: 'Enter City',
                        value: registerForm.city,
                        onChange: (e) => handleRegisterChange('city', e.target.value),
                        onBlur: () => handleRegisterBlur('city')
                      },
                      null,
                      (registerTouched.city || registerSubmitted) ? registerErrors.city : null
                    )}
                  </Form.Group>

                  {/* 5. LM Number */}
                  <Form.Group className="auth-form-group">
                    <Form.Label className="auth-form-label">
                      LM Number <span className="auth-required-star">*</span>
                    </Form.Label>
                    {renderInput(
                      <FaIdCard />,
                      {
                        id: 'auth-reg-lm_number',
                        name: 'lm_number',
                        type: 'text',
                        placeholder: 'Enter LM Number',
                        value: registerForm.lm_number,
                        onChange: (e) => handleRegisterChange('lm_number', e.target.value),
                        onBlur: () => handleRegisterBlur('lm_number')
                      },
                      null,
                      (registerTouched.lm_number || registerSubmitted) ? registerErrors.lm_number : null
                    )}
                  </Form.Group>

                  {/* 6. PPO Number */}
                  <Form.Group className="auth-form-group">
                    <Form.Label className="auth-form-label">
                      PPO Number <span className="auth-required-star">*</span>
                    </Form.Label>
                    {renderInput(
                      <FaIdBadge />,
                      {
                        id: 'auth-reg-pbo_number',
                        name: 'pbo_number',
                        type: 'text',
                        placeholder: 'Enter PPO Number',
                        value: registerForm.pbo_number,
                        onChange: (e) => handleRegisterChange('pbo_number', e.target.value),
                        onBlur: () => handleRegisterBlur('pbo_number')
                      },
                      null,
                      (registerTouched.pbo_number || registerSubmitted) ? registerErrors.pbo_number : null
                    )}
                  </Form.Group>

                  {/* 7. Employee ID */}
                  <Form.Group className="auth-form-group">
                    <Form.Label className="auth-form-label">
                      Employee ID <span className="auth-required-star">*</span>
                    </Form.Label>
                    {renderInput(
                      <FaUserTie />,
                      {
                        id: 'auth-reg-emp_id',
                        name: 'emp_id',
                        type: 'text',
                        placeholder: 'Enter Employee ID',
                        value: registerForm.emp_id,
                        onChange: (e) => handleRegisterChange('emp_id', e.target.value),
                        onBlur: () => handleRegisterBlur('emp_id')
                      },
                      null,
                      (registerTouched.emp_id || registerSubmitted) ? registerErrors.emp_id : null
                    )}
                  </Form.Group>

                  {/* 8. Date of Birth */}
                  <Form.Group className="auth-form-group">
                    <Form.Label className="auth-form-label">
                      Date of Birth <span className="auth-required-star">*</span>
                    </Form.Label>
                    {renderInput(
                      <FaCalendarAlt />,
                      {
                        id: 'auth-reg-date_of_birth',
                        name: 'date_of_birth',
                        type: 'date',
                        max: todayStr,
                        value: registerForm.date_of_birth,
                        onChange: (e) => handleRegisterChange('date_of_birth', e.target.value),
                        onBlur: () => handleRegisterBlur('date_of_birth')
                      },
                      null,
                      (registerTouched.date_of_birth || registerSubmitted) ? registerErrors.date_of_birth : null
                    )}
                  </Form.Group>

                  {/* 9. Password */}
                  <Form.Group className="auth-form-group">
                    <Form.Label className="auth-form-label">
                      Password <span className="auth-required-star">*</span>
                    </Form.Label>
                    {renderInput(
                      <FaLock />,
                      {
                        id: 'auth-reg-password',
                        name: 'password',
                        type: showRegisterPassword ? 'text' : 'password',
                        placeholder: 'Enter Password (min. 6 chars)',
                        value: registerForm.password,
                        onChange: (e) => handleRegisterChange('password', e.target.value),
                        onBlur: () => handleRegisterBlur('password')
                      },
                      <div onClick={() => setShowRegisterPassword(!showRegisterPassword)} style={{ cursor: 'pointer' }}>
                        {showRegisterPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>,
                      (registerTouched.password || registerSubmitted) ? registerErrors.password : null
                    )}
                  </Form.Group>

                  {/* 10. Confirm Password */}
                  <Form.Group className="auth-form-group">
                    <Form.Label className="auth-form-label">
                      Confirm Password <span className="auth-required-star">*</span>
                    </Form.Label>
                    {renderInput(
                      <FaLock />,
                      {
                        id: 'auth-reg-confirmPassword',
                        name: 'confirmPassword',
                        type: showConfirmPassword ? 'text' : 'password',
                        placeholder: 'Confirm Password',
                        value: registerForm.confirmPassword,
                        onChange: (e) => handleRegisterChange('confirmPassword', e.target.value),
                        onBlur: () => handleRegisterBlur('confirmPassword')
                      },
                      <div onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ cursor: 'pointer' }}>
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>,
                      (registerTouched.confirmPassword || registerSubmitted) ? registerErrors.confirmPassword : null
                    )}
                  </Form.Group>
                </div>

                <button type="submit" className="auth-page-btn" disabled={loading}>
                  {loading ? 'PROCESSING...' : 'REGISTER'}
                </button>

                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '15px' }}>
                  <span style={{ color: '#666' }}>Already have an account? </span>
                  <Link to="#" className="auth-page-link" onClick={(e) => { e.preventDefault(); switchTab('login'); }}>
                    Login here
                  </Link>
                </div>
              </Form>
            </motion.div>
          ) : (
            <motion.div key="auth-forgot" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Form noValidate onSubmit={handleForgotPassword}>
                <button type="button" className="auth-page-back-btn" onClick={() => switchTab('login')}>
                  <FaArrowLeft /> Back to Login
                </button>
                <p style={{ color: '#666', marginBottom: '20px' }}>Reset your password using your email or phone number.</p>

                <Form.Group style={{ marginBottom: '18px' }}>
                  <Form.Label className="auth-form-label">
                    Email or Phone Number <span className="auth-required-star">*</span>
                  </Form.Label>
                  {renderInput(
                    <FaIdBadge />,
                    {
                      id: 'auth-forgot-identifier',
                      name: 'identifier',
                      type: 'text',
                      placeholder: 'Email or Phone Number',
                      value: forgotForm.identifier,
                      onChange: (e) => {
                        setForgotForm({ ...forgotForm, identifier: e.target.value });
                        if (forgotTouched.identifier) setForgotErrors((prev) => ({ ...prev, identifier: '' }));
                      },
                      onBlur: () => setForgotTouched((prev) => ({ ...prev, identifier: true }))
                    },
                    null,
                    forgotTouched.identifier ? forgotErrors.identifier : null
                  )}
                </Form.Group>

                <Form.Group style={{ marginBottom: '18px' }}>
                  <Form.Label className="auth-form-label">
                    New Password <span className="auth-required-star">*</span>
                  </Form.Label>
                  {renderInput(
                    <FaLock />,
                    {
                      id: 'auth-forgot-password',
                      name: 'password',
                      type: showForgotPassword ? 'text' : 'password',
                      placeholder: 'New Password (min. 6 chars)',
                      value: forgotForm.password,
                      onChange: (e) => {
                        setForgotForm({ ...forgotForm, password: e.target.value });
                        if (forgotTouched.password) setForgotErrors((prev) => ({ ...prev, password: '' }));
                      },
                      onBlur: () => setForgotTouched((prev) => ({ ...prev, password: true }))
                    },
                    <div onClick={() => setShowForgotPassword(!showForgotPassword)} style={{ cursor: 'pointer' }}>
                      {showForgotPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>,
                    forgotTouched.password ? forgotErrors.password : null
                  )}
                </Form.Group>

                <Form.Group style={{ marginBottom: '18px' }}>
                  <Form.Label className="auth-form-label">
                    Confirm New Password <span className="auth-required-star">*</span>
                  </Form.Label>
                  {renderInput(
                    <FaLock />,
                    {
                      id: 'auth-forgot-confirmPassword',
                      name: 'confirmPassword',
                      type: showForgotConfirmPassword ? 'text' : 'password',
                      placeholder: 'Confirm New Password',
                      value: forgotForm.confirmPassword,
                      onChange: (e) => {
                        setForgotForm({ ...forgotForm, confirmPassword: e.target.value });
                        if (forgotTouched.confirmPassword) setForgotErrors((prev) => ({ ...prev, confirmPassword: '' }));
                      },
                      onBlur: () => setForgotTouched((prev) => ({ ...prev, confirmPassword: true }))
                    },
                    <div onClick={() => setShowForgotConfirmPassword(!showForgotConfirmPassword)} style={{ cursor: 'pointer' }}>
                      {showForgotConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>,
                    forgotTouched.confirmPassword ? forgotErrors.confirmPassword : null
                  )}
                </Form.Group>

                <button type="submit" className="auth-page-btn" disabled={loading} style={{ marginTop: '5px' }}>
                  {loading ? 'PROCESSING...' : 'UPDATE PASSWORD'}
                </button>
              </Form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

