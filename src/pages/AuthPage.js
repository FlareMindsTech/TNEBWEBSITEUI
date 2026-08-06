import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUserLock, FaUserPlus, FaEnvelope, FaLock,
  FaUser, FaPhoneAlt, FaMapMarkerAlt, FaIdBadge,
  FaIdCard, FaUserTie, FaArrowLeft
} from 'react-icons/fa';
import { loginUser, registerUser, forgotPassword } from '../api';
import './AuthPage.css';
import logo from '../assets/tnebea_logo_cropped2.png';

const AuthPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('login');
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({ identifier: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    name: '', email: '', phone_no: '', city: '',
    lm_number: '', pbo_number: '', date_of_birth: '', emp_id: ''
  });
  const [forgotForm, setForgotForm] = useState({
    email: '', emp_id: '', pbo_number: '', lm_number: ''
  });

  const switchTab = (newTab) => {
    setTab(newTab);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginForm.identifier || !loginForm.password) {
      Swal.fire({ icon: 'warning', title: 'Oops...', text: 'Please fill in all fields!' });
      return;
    }
    try {
      setLoading(true);
      const response = await loginUser({ identifier: loginForm.identifier, password: loginForm.password });
      setLoading(false);
      Swal.fire({ icon: 'success', title: 'Login Successful!', text: `Welcome back, ${response.name || 'User'}!` });
      navigate('/dashboard/minnagam');
    } catch (error) {
      setLoading(false);
      Swal.fire({ icon: 'error', title: 'Login Failed', text: error.response?.data?.error || 'Invalid credentials' });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.email || !registerForm.phone_no || !registerForm.emp_id) {
      Swal.fire({ icon: 'warning', title: 'Oops...', text: 'Please fill in all required fields!' });
      return;
    }
    try {
      setLoading(true);
      await registerUser(registerForm);
      setLoading(false);
      Swal.fire({ icon: 'success', title: 'Register Successfully', text: 'Password sent to your email' });
      setRegisterForm({ name: '', email: '', phone_no: '', city: '', lm_number: '', pbo_number: '', date_of_birth: '', emp_id: '' });
      setTab('login');
    } catch (error) {
      setLoading(false);
      Swal.fire({ icon: 'error', title: 'Registration Failed', text: error.response?.data?.error || 'Something went wrong' });
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotForm.email || !forgotForm.emp_id || !forgotForm.pbo_number || !forgotForm.lm_number) {
      Swal.fire({ icon: 'warning', title: 'Oops...', text: 'Please fill in all fields!' });
      return;
    }
    try {
      setLoading(true);
      await forgotPassword(forgotForm);
      setLoading(false);
      Swal.fire({ icon: 'success', title: 'Success!', text: 'A new password has been sent to your email.' });
      setForgotForm({ email: '', emp_id: '', pbo_number: '', lm_number: '' });
      setTab('login');
    } catch (error) {
      setLoading(false);
      Swal.fire({ icon: 'error', title: 'Failed', text: error.response?.data?.error || 'Could not reset password' });
    }
  };

  const renderInput = (icon, props) => (
    <div className="auth-page-input-wrapper">
      <span className="auth-page-input-icon">{icon}</span>
      <input className="auth-page-input" {...props} value={props.value || ''} />
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
              <Form onSubmit={handleLogin}>
                <Form.Group style={{ marginBottom: '20px' }}>
                  <Form.Label style={{ fontWeight: 600, color: '#333', marginBottom: '8px', display: 'block', fontSize: '14px' }}>Employee ID or PPO Number</Form.Label>
                  {renderInput(<FaIdBadge />, { type: 'text', placeholder: 'Enter Employee ID or PPO Number', value: loginForm.identifier, onChange: (e) => setLoginForm({ ...loginForm, identifier: e.target.value }), required: true })}
                </Form.Group>
                <Form.Group style={{ marginBottom: '20px' }}>
                  <Form.Label style={{ fontWeight: 600, color: '#333', marginBottom: '8px', display: 'block', fontSize: '14px' }}>Password</Form.Label>
                  {renderInput(<FaLock />, { type: 'password', placeholder: 'Enter Password', value: loginForm.password, onChange: (e) => setLoginForm({ ...loginForm, password: e.target.value }), required: true })}
                </Form.Group>
                <div className="auth-page-actions">
                  <Form.Check type="checkbox" label="Remember me" style={{ fontSize: '14px' }} />
                  <Link to="#" className="auth-page-link" style={{ fontSize: '14px' }} onClick={(e) => { e.preventDefault(); setTab('forgot'); }}>Forgot Password?</Link>
                </div>
                <button type="submit" className="auth-page-btn" disabled={loading}>
                  {loading ? 'PROCESSING...' : 'LOGIN'}
                </button>
                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
                  <span style={{ color: '#666' }}>Don't have an account? </span>
                  <Link to="#" className="auth-page-link" onClick={(e) => { e.preventDefault(); setTab('register'); }}>Register now</Link>
                </div>
              </Form>
            </motion.div>
          ) : tab === 'register' ? (
            <motion.div key="auth-register" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Form onSubmit={handleRegister}>
                <div className="auth-page-grid">
                  <Form.Group style={{ marginBottom: '20px' }}>
                    <Form.Label style={{ fontWeight: 600, color: '#333', marginBottom: '8px', display: 'block', fontSize: '14px' }}>Full Name</Form.Label>
                    {renderInput(<FaUser />, { type: 'text', placeholder: 'Enter Full Name', value: registerForm.name, onChange: (e) => setRegisterForm({ ...registerForm, name: e.target.value }), required: true })}
                  </Form.Group>
                  <Form.Group style={{ marginBottom: '20px' }}>
                    <Form.Label style={{ fontWeight: 600, color: '#333', marginBottom: '8px', display: 'block', fontSize: '14px' }}>Email Address</Form.Label>
                    {renderInput(<FaEnvelope />, { type: 'email', placeholder: 'Enter Email Address', value: registerForm.email, onChange: (e) => setRegisterForm({ ...registerForm, email: e.target.value }), required: true })}
                  </Form.Group>
                  <Form.Group style={{ marginBottom: '20px' }}>
                    <Form.Label style={{ fontWeight: 600, color: '#333', marginBottom: '8px', display: 'block', fontSize: '14px' }}>Phone Number</Form.Label>
                    {renderInput(<FaPhoneAlt />, { type: 'tel', placeholder: 'Enter Phone (10 digits)', pattern: "[0-9]{10}", value: registerForm.phone_no, onChange: (e) => setRegisterForm({ ...registerForm, phone_no: e.target.value }), required: true })}
                  </Form.Group>
                  <Form.Group style={{ marginBottom: '20px' }}>
                    <Form.Label style={{ fontWeight: 600, color: '#333', marginBottom: '8px', display: 'block', fontSize: '14px' }}>City</Form.Label>
                    {renderInput(<FaMapMarkerAlt />, { type: 'text', placeholder: 'Enter City', value: registerForm.city, onChange: (e) => setRegisterForm({ ...registerForm, city: e.target.value }), required: true })}
                  </Form.Group>
                  <Form.Group style={{ marginBottom: '20px' }}>
                    <Form.Label style={{ fontWeight: 600, color: '#333', marginBottom: '8px', display: 'block', fontSize: '14px' }}>LM Number</Form.Label>
                    {renderInput(<FaIdBadge />, { type: 'text', placeholder: 'Enter LM Number', value: registerForm.lm_number, onChange: (e) => setRegisterForm({ ...registerForm, lm_number: e.target.value }), required: true })}
                  </Form.Group>
                  <Form.Group style={{ marginBottom: '20px' }}>
                    <Form.Label style={{ fontWeight: 600, color: '#333', marginBottom: '8px', display: 'block', fontSize: '14px' }}>PPO Number</Form.Label>
                    {renderInput(<FaIdCard />, { type: 'text', placeholder: 'Enter PPO Number', value: registerForm.pbo_number, onChange: (e) => setRegisterForm({ ...registerForm, pbo_number: e.target.value }), required: true })}
                  </Form.Group>
                  <Form.Group style={{ marginBottom: '20px' }}>
                    <Form.Label style={{ fontWeight: 600, color: '#333', marginBottom: '8px', display: 'block', fontSize: '14px' }}>Employee ID</Form.Label>
                    {renderInput(<FaUserTie />, { type: 'text', placeholder: 'Enter Employee ID', value: registerForm.emp_id, onChange: (e) => setRegisterForm({ ...registerForm, emp_id: e.target.value }), required: true })}
                  </Form.Group>
                  <Form.Group style={{ marginBottom: '20px' }}>
                    <Form.Label style={{ fontWeight: 600, color: '#333', marginBottom: '8px', display: 'block', fontSize: '14px' }}>Date of Birth</Form.Label>
                    {renderInput(<FaUser />, { type: 'date', placeholder: 'Select Date of Birth', value: registerForm.date_of_birth, onChange: (e) => setRegisterForm({ ...registerForm, date_of_birth: e.target.value }), required: true })}
                  </Form.Group>
                </div>
                <button type="submit" className="auth-page-btn" disabled={loading}>
                  {loading ? 'PROCESSING...' : 'REGISTER'}
                </button>
                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '15px' }}>
                  <span style={{ color: '#666' }}>Already have an account? </span>
                  <Link to="#" className="auth-page-link" onClick={(e) => { e.preventDefault(); setTab('login'); }}>Login here</Link>
                </div>
              </Form>
            </motion.div>
          ) : (
            <motion.div key="auth-forgot" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Form onSubmit={handleForgotPassword}>
                <button type="button" className="auth-page-back-btn" onClick={() => setTab('login')}>
                  <FaArrowLeft /> Back to Login
                </button>
                <p style={{ color: '#666', marginBottom: '20px' }}>Verify your identity to receive a new password via email.</p>
                {renderInput(<FaEnvelope />, { type: 'email', placeholder: 'Email Address', value: forgotForm.email, onChange: (e) => setForgotForm({ ...forgotForm, email: e.target.value }), required: true })}
                {renderInput(<FaUserTie />, { type: 'text', placeholder: 'Employee ID', value: forgotForm.emp_id, onChange: (e) => setForgotForm({ ...forgotForm, emp_id: e.target.value }), required: true })}
                {renderInput(<FaIdCard />, { type: 'text', placeholder: 'PPO Number', value: forgotForm.pbo_number, onChange: (e) => setForgotForm({ ...forgotForm, pbo_number: e.target.value }), required: true })}
                {renderInput(<FaIdBadge />, { type: 'text', placeholder: 'LM Number', value: forgotForm.lm_number, onChange: (e) => setForgotForm({ ...forgotForm, lm_number: e.target.value }), required: true })}

                <button type="submit" className="auth-page-btn" disabled={loading}>
                  {loading ? 'PROCESSING...' : 'SEND NEW PASSWORD'}
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
