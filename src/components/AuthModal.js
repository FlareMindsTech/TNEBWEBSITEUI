import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { FaEnvelope, FaLock, FaUser, FaUserPlus, FaUserLock, FaTimes, FaArrowLeft, FaMapMarkerAlt, FaPhoneAlt, FaIdBadge, FaIdCard, FaUserTie } from 'react-icons/fa';
import './AuthModal.css';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, registerUser, forgotPassword } from '../api';

const theme = {
  primary: '#15458a',
  accent: '#2a6cc7'
};

export default function AuthModal({ show, onClose, defaultTab = 'login' }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState(defaultTab);
  const [loginForm, setLoginForm] = useState({ identifier: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', phone_no: '', city: '', lm_number: '', pbo_number: '', date_of_birth: '', emp_id: '' });
  const [forgotForm, setForgotForm] = useState({ email: '', emp_id: '', pbo_number: '', lm_number: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      setTab(defaultTab);
      if (defaultTab === 'login') {
        setLoginForm({ identifier: '', password: '' });
      }
      if (defaultTab === 'register') {
        setRegisterForm({ name: '', email: '', phone_no: '', city: '', lm_number: '', pbo_number: '', date_of_birth: '', emp_id: '' });
      }
      if (defaultTab === 'forgot') {
        setForgotForm({ email: '', emp_id: '', pbo_number: '', lm_number: '' });
      }
      if (defaultTab === 'work') {
        setTab('work');
      }
    }
  }, [defaultTab, show]);



  const switchTab = (next) => {
    setTab(next);
    if (next === 'login') {
      setLoginForm({ identifier: '', password: '' });
    }
    if (next === 'register') {
      setRegisterForm({ name: '', email: '', phone_no: '', city: '', lm_number: '', pbo_number: '', date_of_birth: '', emp_id: '' });
    }
    if (next === 'forgot') {
      setForgotForm({ email: '', emp_id: '', pbo_number: '', lm_number: '' });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginForm.identifier || !loginForm.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please fill in all fields',
        confirmButtonColor: theme.primary
      });
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser({
        identifier: loginForm.identifier,
        password: loginForm.password
      });

      setLoading(false);

      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: `Welcome back, ${response.user?.name || 'User'}!`,
        confirmButtonColor: theme.primary,
        timer: 2000
      }).then(() => {
        onClose();
        // Optionally redirect to dashboard or home
        // navigate('/dashboard');
      });

    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message || 'Invalid credentials. Please try again.',
        confirmButtonColor: theme.primary
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.email || !registerForm.phone_no || !registerForm.city || !registerForm.lm_number || !registerForm.pbo_number || !registerForm.date_of_birth || !registerForm.emp_id) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please fill in all required fields',
        confirmButtonColor: theme.primary
      });
      return;
    }

    try {
      setLoading(true);

      const response = await registerUser(registerForm);

      setLoading(false);

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Your password has been sent to your email. You can now log in.',
        confirmButtonColor: theme.primary,
        timer: 3000
      }).then(() => {
        setRegisterForm({ name: '', email: '', phone_no: '', city: '', lm_number: '', pbo_number: '', date_of_birth: '', emp_id: '' });
        setTab('login');
      });

    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message || 'Could not register. Please try again.',
        confirmButtonColor: theme.primary
      });
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!forgotForm.email || !forgotForm.emp_id || !forgotForm.pbo_number || !forgotForm.lm_number) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please fill in all required fields to verify your identity',
        confirmButtonColor: theme.primary
      });
      return;
    }

    try {
      setLoading(true);

      const response = await forgotPassword(forgotForm);

      setLoading(false);

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: response.message || 'A new password has been sent to your registered email address.',
        confirmButtonColor: theme.primary
      }).then(() => {
        setForgotForm({ email: '', emp_id: '', pbo_number: '', lm_number: '' });
        setTab('login');
      });

    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: error.message || 'Could not reset password. Please try again.',
        confirmButtonColor: theme.primary
      });
    }
  };

  const renderInput = (icon, props) => (
    <div className="auth-input-wrapper">
      <span className="auth-input-icon">{icon}</span>
      <Form.Control className="auth-input" {...props} value={props.value ?? ''} />
    </div>
  );



  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop={true}
      dialogClassName="auth-modal-dialog"
      contentClassName="auth-modal"
    >
      <button
        type="button"
        className="auth-close"
        onClick={onClose}
        aria-label="Close auth modal"
        style={{ position: 'absolute', top: '14px', right: '14px', zIndex: 1000 }}
      >
        <FaTimes />
      </button>

      <div className="auth-bg" aria-hidden />

      <div className="auth-header">
        <div className="auth-ribbon">
          <FaUserLock />
          <span>{tab === 'work' ? 'Notice' : 'Secure Access'}</span>
        </div>
        {tab !== 'work' && (
          <motion.div
            className="auth-tabs auth-tabs-single"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              className={`auth-tab ${tab === 'login' ? 'active' : ''}`}
              onClick={() => switchTab('login')}
            >
              <FaUserLock />
              <span>Login</span>
            </button>
            <button
              className={`auth-tab ${tab === 'register' ? 'active' : ''}`}
              onClick={() => switchTab('register')}
            >
              <FaUserPlus />
              <span>Sign Up</span>
            </button>
          </motion.div>
        )}
        {/* <p className="auth-subtext">Access your TNEBEA space or create a fresh account.</p>
        <div className="auth-chips">
          <span className="auth-chip">No OTP delays</span>
          <span className="auth-chip">Fast sign-in</span>
          <span className="auth-chip">Privacy-first</span>
        </div> */}
      </div>

      <Modal.Body className="auth-body">
        {tab === 'work' ? (
          <motion.div
            key="auth-work"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            style={{ textAlign: 'center', padding: '0.75rem 0.25rem' }}
          >
            <h5 style={{ marginBottom: '0.5rem', color: '#15458a', fontWeight: 700 }}>Work Undergoing</h5>
            <p style={{ marginBottom: 0, color: '#4b5f7a' }}>Grievance section is currently under development. Please check again later.</p>
          </motion.div>
        ) : null}
        {tab === 'login' ? (
          <motion.div
            key="auth-login"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Employee ID or PBO Number</Form.Label>
                {renderInput(<FaIdBadge />, {
                  type: 'text',
                  placeholder: 'Enter Employee ID or PBO Number',
                  value: loginForm.identifier,
                  onChange: (e) => setLoginForm({ ...loginForm, identifier: e.target.value }),
                  required: true
                })}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                {renderInput(<FaLock />, {
                  type: 'password',
                  placeholder: 'Enter your password',
                  value: loginForm.password,
                  onChange: (e) => setLoginForm({ ...loginForm, password: e.target.value }),
                  required: true
                })}
              </Form.Group>
              <div className="auth-actions">
                <Form.Check type="checkbox" label="Remember me" />
                <Link to="" className="auth-link" onClick={(e) => { e.preventDefault(); setTab('forgot'); }}>Forgot password?</Link>
              </div>

              <Button
                type="submit"
                className="auth-primary-btn"
                disabled={loading}
              >
                {loading ? 'Signing in…' : 'Login securely'}
              </Button>
            </Form>
          </motion.div>
        ) : tab === 'register' ? (
          <motion.div
            key="auth-register"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                {renderInput(<FaUser />, {
                  type: 'text',
                  placeholder: 'Enter your full name',
                  value: registerForm.name,
                  onChange: (e) => setRegisterForm({ ...registerForm, name: e.target.value }),
                  required: true
                })}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                {renderInput(<FaEnvelope />, {
                  type: 'email',
                  placeholder: 'name@example.com',
                  value: registerForm.email,
                  onChange: (e) => setRegisterForm({ ...registerForm, email: e.target.value }),
                  required: true
                })}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                {renderInput(<FaPhoneAlt />, {
                  type: 'tel',
                  placeholder: 'Enter 10-digit phone number',
                  value: registerForm.phone_no,
                  onChange: (e) => setRegisterForm({ ...registerForm, phone_no: e.target.value }),
                  required: true,
                  pattern: "[0-9]{10}"
                })}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                {renderInput(<FaMapMarkerAlt />, {
                  type: 'text',
                  placeholder: 'Enter your city',
                  value: registerForm.city,
                  onChange: (e) => setRegisterForm({ ...registerForm, city: e.target.value }),
                  required: true
                })}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>LM Number</Form.Label>
                {renderInput(<FaIdBadge />, {
                  type: 'text',
                  placeholder: 'Enter your LM number',
                  value: registerForm.lm_number,
                  onChange: (e) => setRegisterForm({ ...registerForm, lm_number: e.target.value }),
                  required: true
                })}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>PBO Number</Form.Label>
                {renderInput(<FaIdCard />, {
                  type: 'text',
                  placeholder: 'Enter PBO number',
                  value: registerForm.pbo_number,
                  onChange: (e) => setRegisterForm({ ...registerForm, pbo_number: e.target.value }),
                  required: true
                })}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Employee ID</Form.Label>
                {renderInput(<FaUserTie />, {
                  type: 'text',
                  placeholder: 'Enter Employee ID',
                  value: registerForm.emp_id,
                  onChange: (e) => setRegisterForm({ ...registerForm, emp_id: e.target.value }),
                  required: true
                })}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                {renderInput(<FaUser />, {
                  type: 'date',
                  placeholder: 'Select Date of Birth',
                  value: registerForm.date_of_birth,
                  onChange: (e) => setRegisterForm({ ...registerForm, date_of_birth: e.target.value }),
                  required: true
                })}
              </Form.Group>

              <Button
                type="submit"
                className="auth-primary-btn"
                disabled={loading}
              >
                {loading ? 'Registering…' : 'Create Account'}
              </Button>
            </Form>
          </motion.div>
        ) : tab === 'forgot' ? (
          <motion.div
            key="auth-forgot"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Form onSubmit={handleForgotPassword}>
              <button
                type="button"
                className="auth-back-btn"
                onClick={() => setTab('login')}
              >
                <FaArrowLeft /> Back to Login
              </button>
              <p className="auth-helper-text">Verify your identity to receive a new password via email.</p>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                {renderInput(<FaEnvelope />, {
                  type: 'email',
                  placeholder: 'name@example.com',
                  value: forgotForm.email,
                  onChange: (e) => setForgotForm({ ...forgotForm, email: e.target.value }),
                  required: true
                })}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Employee ID</Form.Label>
                {renderInput(<FaUserTie />, {
                  type: 'text',
                  placeholder: 'Enter Employee ID',
                  value: forgotForm.emp_id,
                  onChange: (e) => setForgotForm({ ...forgotForm, emp_id: e.target.value }),
                  required: true
                })}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>PBO Number</Form.Label>
                {renderInput(<FaIdCard />, {
                  type: 'text',
                  placeholder: 'Enter PBO number',
                  value: forgotForm.pbo_number,
                  onChange: (e) => setForgotForm({ ...forgotForm, pbo_number: e.target.value }),
                  required: true
                })}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>LM Number</Form.Label>
                {renderInput(<FaIdBadge />, {
                  type: 'text',
                  placeholder: 'Enter LM number',
                  value: forgotForm.lm_number,
                  onChange: (e) => setForgotForm({ ...forgotForm, lm_number: e.target.value }),
                  required: true
                })}
              </Form.Group>

              <Button
                type="submit"
                className="auth-primary-btn"
                disabled={loading}
              >
                {loading ? 'Sending new password…' : 'Send New Password'}
              </Button>
              <p className="auth-footnote">We'll send a new generated password to your email.</p>
            </Form>
          </motion.div>
        ) : null}
      </Modal.Body>
    </Modal>
  );
}
