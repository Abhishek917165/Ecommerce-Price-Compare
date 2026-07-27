import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all registration fields.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.signup(username.trim(), password.trim(), email.trim(), role);
      setSuccess('Account created successfully! Redirecting to login page...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Registration failed. Username may already exist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '65vh', padding: '1.5rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '440px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>Create Account</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
            Register to join the smart comparison network
          </p>
        </div>

        {error && (
          <div style={{ color: 'var(--danger)', fontSize: '0.85rem', fontWeight: 600, padding: '10px 12px', backgroundColor: 'var(--danger-light)', borderRadius: '8px' }}>
            ⚠️ {error}
          </div>
        )}
        {success && (
          <div style={{ color: 'var(--success)', fontSize: '0.85rem', fontWeight: 600, padding: '10px 12px', backgroundColor: 'var(--success-light)', borderRadius: '8px' }}>
            ✅ {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              placeholder="e.g. smart_shopper"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              placeholder="e.g. shopper@compare.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">System Role Access</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-input"
              style={{ cursor: 'pointer' }}
            >
              <option value="USER">USER (Compare products, review, cart)</option>
              <option value="ADMIN">ADMIN (Full access + Add & Delete products)</option>
            </select>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: '2px', lineHeight: 1.3 }}>
              *For testing ease, you can register as an ADMIN to gain immediate access to the catalog creation dashboards.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', height: '46px', marginTop: '8px' }}
          >
            {loading ? 'Creating secure profile...' : 'Register'}
          </button>
        </form>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', textAlign: 'center', fontSize: '0.85rem' }}>
          <p style={{ color: 'var(--text-secondary)' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 600 }}>Log In</Link>
          </p>
        </div>

      </div>
    </div>
  );
}
