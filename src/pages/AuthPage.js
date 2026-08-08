import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUserLock, FaUserPlus, FaEnvelope, FaLock,
  FaUser, FaPhoneAlt, FaMapMarkerAlt, FaIdBadge,
  FaIdCard, FaUserTie, FaArrowLeft, FaEye, FaEyeSlash
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
    lm_number: '', pbo_number: '', date_of_birth: '', emp_id: '', password: '', confirmPassword: ''
  });
  const [forgotForm, setForgotForm] = useState({
    identifier: '', password: '', confirmPassword: ''
  });

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showForgotConfirmPassword, setShowForgotConfirmPassword] = useState(false);

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
    if (!registerForm.name || !registerForm.email || !registerForm.phone_no || !registerForm.password || !registerForm.confirmPassword) {
      Swal.fire({ icon: 'warning', title: 'Oops...', text: 'Please fill in all required fields!' });
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      Swal.fire({ icon: 'warning', title: 'Oops...', text: 'Passwords do not match!' });
      return;
    }
    try {
      setLoading(true);
      await registerUser(registerForm);
      setLoading(false);
      Swal.fire({ icon: 'success', title: 'Register Successfully', text: 'You can now login with your password' });
      setRegisterForm({ name: '', email: '', phone_no: '', city: '', lm_number: '', pbo_number: '', date_of_birth: '', emp_id: '', password: '', confirmPassword: '' });
      setTab('login');
    } catch (error) {
      setLoading(false);
      Swal.fire({ icon: 'error', title: 'Registration Failed', text: error.response?.data?.error || 'Something went wrong' });
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotForm.identifier || !forgotForm.password || !forgotForm.confirmPassword) {
      Swal.fire({ icon: 'warning', title: 'Oops...', text: 'Identifier (Email or Phone Number), password, and confirm password are required!' });
      return;
    }
    if (forgotForm.password !== forgotForm.confirmPassword) {
      Swal.fire({ icon: 'warning', title: 'Oops...', text: 'Passwords do not match!' });
      return;
    }
    try {
      setLoading(true);
      const response = await forgotPassword(forgotForm);
      setLoading(false);
      Swal.fire({ icon: 'success', title: 'Success!', text: response.message || 'Password has been successfully updated.' });
      setForgotForm({ identifier: '', password: '', confirmPassword: '' });
      setTab('login');
    } catch (error) {
      setLoading(false);
      Swal.fire({ icon: 'error', title: 'Failed', text: error.response?.data?.error || error.message || 'Could not reset password' });
    }
  };

  const renderInput = (icon, props, suffixIcon = null) => (
    <div className="auth-page-input-wrapper" style={{ position: 'relative' }}>
      <span className="auth-page-input-icon">{icon}</span>
      <input className="auth-page-input" {...props} value={props.value || ''} style={{ ...props.style, paddingRight: suffixIcon ? '40px' : undefined }} />
      {suffixIcon && (
        <span className="auth-page-input-suffix-icon" style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#888', display: 'flex', alignItems: 'center' }}>
          {suffixIcon}
        </span>
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
              <Form onSubmit={handleLogin}>
                <Form.Group style={{ marginBottom: '20px' }}>
                  <Form.Label style={{ fontWeight: 600, color: '#333', marginBottom: '8px', display: 'block', fontSize: '14px' }}>Email or Phone Number</Form.Label>
                  {renderInput(<FaIdBadge />, { type: 'text', placeholder: 'Enter Email or Phone Number', value: loginForm.identifier, onChange: (e) => setLoginForm({ ...loginForm, identifier: e.target.value }), required: true })}
                </Form.Group>
                <Form.Group style={{ marginBottom: '20px' }}>
                  <Form.Label style={{ fontWeight: 600, color: '#333', marginBottom: '8px', display: 'block', fontSize: '14px' }}>Password</Form.Label>
                  {renderInput(<FaLock />, { type: showLoginPassword ? 'text' : 'password', placeholder: 'Enter Password', value: loginForm.password, onChange: (e) => setLoginForm({ ...loginForm, password: e.target.value }), required: true },
                    <div onClick={() => setShowLoginPassword(!showLoginPassword)}>
                      {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  )}
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
                    <Form.Label style={{ fontWeight: 600, color: '#333', marginBottom: '8px', display: 'block', fontSize: '14px' }}>City (Optional)</Form.Label>
                    {renderInput(<FaMapMarkerAlt />, { type: 'text', placeholder: 'Enter City', value: registerForm.city, onChange: (e) => setRegisterForm({ ...registerForm, city: e.target.value }) })}
                  </Form.Group>
                  <Form.Group style={{ marginBottom: '20px' }}>
                    <Form.Label style={{ fontWeight: 600, color: '#333', marginBottom: '8px', display: 'block', fontSize: '14px' }}>LM Number (Optional)</Form.Label>
                    {renderInput(<FaIdCard />, { type: 'text', placeholder: 'Enter LM Number', value: registerForm.lm_number, onChange: (e) => setRegisterForm({ ...registerForm, lm_number: e.target.value }) })}
                  </Form.Group>
                  <Form.Group style={{ marginBottom: '20px' }}>
                    <Form.Label style={{ fontWeight: 600, color: '#333', marginBottom: '8px', display: 'block', fontSize: '14px' }}>PPO Number (Optional)</Form.Label>
                    {renderInput(<FaIdCard />, { type: 'text', placeholder: 'Enter PPO Number', value: registerForm.pbo_number, onChange: (e) => setRegisterForm({ ...registerForm, pbo_number: e.target.value }) })}
                  </Form.Group>
                  <Form.Group style={{ marginBottom: '20px' }}>
                    <Form.Label style={{ fontWeight: 600, color: '#333', marginBottom: '8px', display: 'block', fontSize: '14px' }}>Employee ID (Optional)</Form.Label>
                    {renderInput(<FaUserTie />, { type: 'text', placeholder: 'Enter Employee ID', value: registerForm.emp_id, onChange: (e) => setRegisterForm({ ...registerForm, emp_id: e.target.value }) })}
                  </Form.Group>
                  <Form.Group style={{ marginBottom: '20px' }}>
                    <Form.Label style={{ fontWeight: 600, color: '#333', marginBottom: '8px', display: 'block', fontSize: '14px' }}>Date of Birth (Optional)</Form.Label>
                    {renderInput(<FaUser />, { type: 'date', placeholder: 'Select Date of Birth', value: registerForm.date_of_birth, onChange: (e) => setRegisterForm({ ...registerForm, date_of_birth: e.target.value }) })}
                  </Form.Group>
                  <Form.Group style={{ marginBottom: '20px' }}>
                    <Form.Label style={{ fontWeight: 600, color: '#333', marginBottom: '8px', display: 'block', fontSize: '14px' }}>Password</Form.Label>
                    {renderInput(<FaLock />, { type: showRegisterPassword ? 'text' : 'password', placeholder: 'Enter Password', value: registerForm.password, onChange: (e) => setRegisterForm({ ...registerForm, password: e.target.value }), required: true },
                      <div onClick={() => setShowRegisterPassword(!showRegisterPassword)}>
                        {showRegisterPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group style={{ marginBottom: '20px' }}>
                    <Form.Label style={{ fontWeight: 600, color: '#333', marginBottom: '8px', display: 'block', fontSize: '14px' }}>Confirm Password</Form.Label>
                    {renderInput(<FaLock />, { type: showConfirmPassword ? 'text' : 'password', placeholder: 'Confirm Password', value: registerForm.confirmPassword, onChange: (e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value }), required: true },
                      <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    )}
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
                <p style={{ color: '#666', marginBottom: '20px' }}>Reset your password using your email or phone number.</p>
                <div style={{ marginBottom: '15px' }}>
                  {renderInput(<FaIdBadge />, { type: 'text', placeholder: 'Email or Phone Number', value: forgotForm.identifier, onChange: (e) => setForgotForm({ ...forgotForm, identifier: e.target.value }), required: true })}
                </div>
                <div style={{ marginBottom: '15px' }}>
                  {renderInput(<FaLock />, { type: showForgotPassword ? 'text' : 'password', placeholder: 'New Password', value: forgotForm.password, onChange: (e) => setForgotForm({ ...forgotForm, password: e.target.value }), required: true },
                    <div onClick={() => setShowForgotPassword(!showForgotPassword)}>
                      {showForgotPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  )}
                </div>
                <div style={{ marginBottom: '15px' }}>
                  {renderInput(<FaLock />, { type: showForgotConfirmPassword ? 'text' : 'password', placeholder: 'Confirm New Password', value: forgotForm.confirmPassword, onChange: (e) => setForgotForm({ ...forgotForm, confirmPassword: e.target.value }), required: true },
                    <div onClick={() => setShowForgotConfirmPassword(!showForgotConfirmPassword)}>
                      {showForgotConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  )}
                </div>

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
