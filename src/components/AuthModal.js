import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { FaEnvelope, FaLock, FaUser, FaUserPlus, FaUserLock, FaTimes, FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa';
import './AuthModal.css';

const theme = {
  primary: '#15458a',
  accent: '#2a6cc7'
};

export default function AuthModal({ show, onClose, defaultTab = 'login' }) {
  const [tab, setTab] = useState(defaultTab);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });
  const [forgotForm, setForgotForm] = useState({ email: '' });
  const [loading, setLoading] = useState(false);
  const [systemLocation, setSystemLocation] = useState('Location permission not granted');
  const [locationStatus, setLocationStatus] = useState('idle');
  const [locationHint, setLocationHint] = useState('Permission required');

  useEffect(() => {
    if (show) setTab(defaultTab);
  }, [defaultTab, show]);

  const requestSystemLocation = () => {
    if (!navigator.geolocation) {
      setSystemLocation('Geolocation not supported');
      setLocationStatus('error');
      setLocationHint('Browser does not support location');
      return;
    }
    setLocationStatus('loading');
    setLocationHint('Requesting permission...');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setSystemLocation(`Lat ${latitude.toFixed(4)}, Lng ${longitude.toFixed(4)}`);
        setLocationStatus('granted');
        setLocationHint('Location enabled');
      },
      (error) => {
        setLocationStatus('error');
        if (error.code === error.PERMISSION_DENIED) {
          setSystemLocation('Location permission denied');
          setLocationHint('Allow location in browser address bar');
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setSystemLocation('Location unavailable');
          setLocationHint('Try again or check GPS');
        } else {
          setSystemLocation('Location request timed out');
          setLocationHint('Please try again');
        }
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  };

  useEffect(() => {
    if (show && tab === 'login' && locationStatus === 'idle') {
      requestSystemLocation();
    }
  }, [show, tab, locationStatus]);

  useEffect(() => {
    if (!navigator.permissions || !navigator.permissions.query) return;
    navigator.permissions
      .query({ name: 'geolocation' })
      .then((status) => {
        if (status.state === 'granted') {
          setLocationStatus('granted');
          setLocationHint('Location enabled');
        } else if (status.state === 'denied') {
          setLocationStatus('error');
          setSystemLocation('Location permission denied');
          setLocationHint('Allow location in browser address bar');
        }
        status.onchange = () => {
          if (status.state === 'granted') {
            setLocationStatus('granted');
            setLocationHint('Location enabled');
            requestSystemLocation();
          } else if (status.state === 'denied') {
            setLocationStatus('error');
            setSystemLocation('Location permission denied');
            setLocationHint('Allow location in browser address bar');
          } else {
            setLocationStatus('idle');
            setLocationHint('Permission required');
          }
        };
      })
      .catch(() => {});
  }, []);

  const switchTab = (next) => setTab(next);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please fill in all fields',
        confirmButtonColor: theme.primary
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: `Welcome back, ${loginForm.email}! Location: ${systemLocation}`,
        confirmButtonColor: theme.primary
      }).then(() => {
        setLoginForm({ email: '', password: '' });
        onClose();
      });
    }, 900);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please fill in all fields',
        confirmButtonColor: theme.primary
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Account Created',
        text: `Welcome, ${registerForm.name}! Your account is ready.`,
        confirmButtonColor: theme.primary
      }).then(() => {
        setRegisterForm({ name: '', email: '', password: '' });
        setTab('login');
      });
    }, 1200);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!forgotForm.email) {
      Swal.fire({
        icon: 'warning',
        title: 'Email Required',
        text: 'Please enter your email address',
        confirmButtonColor: theme.primary
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Reset Link Sent',
        text: `A password reset link has been sent to ${forgotForm.email}. Check your inbox and spam folder.`,
        confirmButtonColor: theme.primary
      }).then(() => {
        setTab('login');
        setForgotForm({ email: '' });
      });
    }, 900);
  };

  const renderInput = (icon, props) => (
    <div className="auth-input-wrapper">
      <span className="auth-input-icon">{icon}</span>
      <Form.Control className="auth-input" {...props} />
    </div>
  );

  const renderSystemLocation = (value) => (
    <div className="auth-input-wrapper">
      <span className="auth-input-icon"><FaMapMarkerAlt /></span>
      <Form.Control
        className="auth-input"
        value={value}
        readOnly
      />
    </div>
  );

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
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
          <span>Secure Access</span>
        </div>
        <motion.div
          className="auth-tabs"
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
        {/* <p className="auth-subtext">Access your TNEBEA space or create a fresh account.</p>
        <div className="auth-chips">
          <span className="auth-chip">No OTP delays</span>
          <span className="auth-chip">Fast sign-in</span>
          <span className="auth-chip">Privacy-first</span>
        </div> */}
      </div>

      <Modal.Body className="auth-body">
        {tab === 'login' ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>📍 Location (System)</Form.Label>
                {renderSystemLocation(systemLocation)}
                <div className="d-flex align-items-center gap-2 mt-2">
                  <Button
                    type="button"
                    variant="outline-primary"
                    size="sm"
                    onClick={requestSystemLocation}
                    disabled={locationStatus === 'loading'}
                  >
                    {locationStatus === 'loading' ? 'Enabling…' : 'Enable location'}
                  </Button>
                  <span className="auth-helper-text">{locationHint}</span>
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email or LM.NO</Form.Label>
                {renderInput(<FaEnvelope />, {
                  type: 'text',
                  placeholder: 'Enter your email or LM.NO',
                  value: loginForm.email,
                  onChange: (e) => setLoginForm({ ...loginForm, email: e.target.value }),
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
                <a href="#" className="auth-link" onClick={(e) => { e.preventDefault(); setTab('forgot'); }}>Forgot password?</a>
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
                <Form.Label>Email</Form.Label>
                {renderInput(<FaEnvelope />, {
                  type: 'email',
                  placeholder: 'name@example.com',
                  value: registerForm.email,
                  onChange: (e) => setRegisterForm({ ...registerForm, email: e.target.value }),
                  required: true
                })}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                {renderInput(<FaLock />, {
                  type: 'password',
                  placeholder: 'Create a password',
                  value: registerForm.password,
                  onChange: (e) => setRegisterForm({ ...registerForm, password: e.target.value }),
                  required: true
                })}
              </Form.Group>

              <Button
                type="submit"
                className="auth-primary-btn"
                disabled={loading}
              >
                {loading ? 'Creating account…' : 'Create Account'}
              </Button>
              <p className="auth-footnote">By signing up you accept our terms and privacy notice.</p>
            </Form>
          </motion.div>
        ) : tab === 'forgot' ? (
          <motion.div
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
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <p className="auth-helper-text">Enter your registered email to receive a password reset link.</p>
                {renderInput(<FaEnvelope />, {
                  type: 'email',
                  placeholder: 'name@example.com',
                  value: forgotForm.email,
                  onChange: (e) => setForgotForm({ ...forgotForm, email: e.target.value }),
                  required: true
                })}
              </Form.Group>

              <Button
                type="submit"
                className="auth-primary-btn"
                disabled={loading}
              >
                {loading ? 'Sending reset link…' : 'Send Reset Link'}
              </Button>
              <p className="auth-footnote">We'll send you a link to reset your password within minutes.</p>
            </Form>
          </motion.div>
        ) : null}
      </Modal.Body>
    </Modal>
  );
}
