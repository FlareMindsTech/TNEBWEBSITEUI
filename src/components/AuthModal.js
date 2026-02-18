import  { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { FaEnvelope, FaLock, FaUser, FaUserPlus, FaUserLock, FaTimes, FaArrowLeft, FaMapMarkerAlt, FaPhoneAlt, FaIdBadge, FaIdCard, FaUserTie } from 'react-icons/fa';
import './AuthModal.css';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api';

const theme = {
  primary: '#15458a',
  accent: '#2a6cc7'
};

export default function AuthModal({ show, onClose, defaultTab = 'login' }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState(defaultTab);
  const [loginForm, setLoginForm] = useState({ phoneorlmno: '', password: '', city: '' });
  const [registerForm, setRegisterForm] = useState({ lm: '', name: '', empid: '', email: '', phone: '', password: '' });
  const [forgotForm, setForgotForm] = useState({ email: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      setTab(defaultTab);
      if (defaultTab === 'login') {
        setLoginForm({ phoneorlmno: '', password: '', city: '' });
      }
      if (defaultTab === 'register') {
        setRegisterForm({ lm: '', name: '', empid: '', email: '', phone: '', password: '' });
      }
      if (defaultTab === 'forgot') {
        setForgotForm({ email: '' });
      }
    }
  }, [defaultTab, show]);



  const switchTab = (next) => {
    setTab(next);
    if (next === 'login') {
      setLoginForm({ phoneorlmno: '', password: '', city: '' });
    }
    if (next === 'register') {
      setRegisterForm({ lm: '', name: '', empid: '', email: '', phone: '', password: '' });
    }
    if (next === 'forgot') {
      setForgotForm({ email: '' });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!loginForm.city || !loginForm.phoneorlmno || !loginForm.password) {
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
        identifier: loginForm.phoneorlmno,
        password: loginForm.password,
        city: loginForm.city
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
    Swal.fire({
      title: 'Processing',
      html: '<p style="font-size: 1rem; color: #1b5baf; font-weight: 600;">Process undergoing...</p>',
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: 'OK',
      confirmButtonColor: theme.primary,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    setTimeout(() => {
      setLoading(false);
      setRegisterForm({ lm: '', name: '', empid: '', email: '', phone: '', password: '' });
      Swal.close();
      setTab('login');
    }, 3000);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: 'info',
      title: 'Work undergoing',
      text: 'Please try again later.',
      confirmButtonText: 'OK',
      confirmButtonColor: theme.primary
    });
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
          <span>Secure Access</span>
        </div>
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
          {/* Register tab hidden for now */}
          {/*
          <button
            className={`auth-tab ${tab === 'register' ? 'active' : ''}`}
            onClick={() => switchTab('register')}
          >
            <FaUserPlus />
            <span>Sign Up</span>
          </button>
          */}
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
            key="auth-login"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                {renderInput(<FaMapMarkerAlt />, {
                  type: 'text',
                  placeholder: 'Enter your city (e.g., Chennai, Coimbatore)',
                  value: loginForm.city,
                  onChange: (e) => setLoginForm({ ...loginForm, city: e.target.value }),
                  required: true
                })}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone or LM.NO</Form.Label>
                {renderInput(<FaPhoneAlt />, {
                  type: 'text',
                  placeholder: 'Enter your phone or LM.NO',
                  value: loginForm.phoneorlmno,
                  onChange: (e) => setLoginForm({ ...loginForm, phoneorlmno: e.target.value }),
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
          /* Register UI is temporarily disabled */
          null
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
