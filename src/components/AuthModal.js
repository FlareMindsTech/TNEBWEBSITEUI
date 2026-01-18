import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const theme = {
  primary: '#15458a',
  accent: '#2a6cc7'
};

export default function AuthModal({ show, onClose, defaultTab = 'login' }) {
  const [tab, setTab] = useState(defaultTab);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const switchTab = (next) => setTab(next);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1200);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <Modal show={show} onHide={onClose} centered backdrop="static">
      <div style={{ position: 'absolute', top: 8, right: 12 }}>
        <Button variant="light" size="sm" onClick={onClose} style={{ borderRadius: 8 }}>
          Close
        </Button>
      </div>
      <Modal.Header style={{ borderBottom: 'none', background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`, color: '#fff' }}>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center', gap: 12 }}>
          <Button
            variant={tab === 'login' ? 'light' : 'outline-light'}
            onClick={() => switchTab('login')}
            style={{ fontWeight: 700, borderRadius: 20 }}
          >
            Sign In
          </Button>
          <Button
            variant={tab === 'register' ? 'light' : 'outline-light'}
            onClick={() => switchTab('register')}
            style={{ fontWeight: 700, borderRadius: 20 }}
          >
            Register
          </Button>
        </div>
      </Modal.Header>
      <Modal.Body style={{ padding: '1rem 1.25rem' }}>
        {tab === 'login' ? (
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: theme.primary, fontWeight: 600 }}>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label style={{ color: theme.primary, fontWeight: 600 }}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              />
            </Form.Group>
            <div className="d-grid">
              <Button type="submit" style={{ background: theme.primary, borderColor: theme.primary }} disabled={loading}>
                {loading ? 'Signing in…' : 'Sign In'}
              </Button>
            </div>
          </Form>
        ) : (
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: theme.primary, fontWeight: 600 }}>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Full name"
                value={registerForm.name}
                onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: theme.primary, fontWeight: 600 }}>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label style={{ color: theme.primary, fontWeight: 600 }}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create password"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
              />
            </Form.Group>
            <div className="d-grid">
              <Button type="submit" style={{ background: theme.accent, borderColor: theme.accent }} disabled={loading}>
                {loading ? 'Registering…' : 'Register'}
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
}
