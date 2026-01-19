import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaUser, FaUserPlus, FaUserLock, FaTimes } from 'react-icons/fa';
import './AuthModal.css';

const theme = {
  primary: '#15458a',
  accent: '#2a6cc7'
};

export default function AuthModal({ show, onClose, defaultTab = 'login' }) {
  const [tab, setTab] = useState(defaultTab);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) setTab(defaultTab);
  }, [defaultTab, show]);

  const switchTab = (next) => setTab(next);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 900);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1200);
  };

  const renderInput = (icon, props) => (
    <div className="auth-input-wrapper">
      <span className="auth-input-icon">{icon}</span>
      <Form.Control className="auth-input" {...props} />
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
        <p className="auth-subtext">Access your TNEBEA space or create a fresh account.</p>
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
                <Form.Label>Email</Form.Label>
                {renderInput(<FaEnvelope />, {
                  type: 'email',
                  placeholder: 'name@example.com',
                  value: loginForm.email,
                  onChange: (e) => setLoginForm({ ...loginForm, email: e.target.value }),
                  required: true
                })}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                {renderInput(<FaLock />, {
                  type: 'password',
                  placeholder: 'Enter password',
                  value: loginForm.password,
                  onChange: (e) => setLoginForm({ ...loginForm, password: e.target.value }),
                  required: true
                })}
              </Form.Group>

              <div className="auth-actions">
                <Form.Check type="checkbox" label="Remember me" />
                <a href="#" className="auth-link" onClick={(e) => e.preventDefault()}>Forgot password?</a>
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
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3">
                <Form.Label>Full name</Form.Label>
                {renderInput(<FaUser />, {
                  type: 'text',
                  placeholder: 'Enter your name',
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
              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                {renderInput(<FaLock />, {
                  type: 'password',
                  placeholder: 'Create a strong password',
                  value: registerForm.password,
                  onChange: (e) => setRegisterForm({ ...registerForm, password: e.target.value }),
                  required: true
                })}
              </Form.Group>

              <Button
                type="submit"
                className="auth-primary-btn accent"
                disabled={loading}
              >
                {loading ? 'Creating account…' : 'Create account'}
              </Button>
              <p className="auth-footnote">By signing up you accept our terms and privacy notice.</p>
            </Form>
          </motion.div>
        )}
      </Modal.Body>
    </Modal>
  );
}
