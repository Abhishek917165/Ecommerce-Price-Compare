import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all credentials fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const user = await api.login(username.trim(), password.trim());
      if (onLoginSuccess) {
        onLoginSuccess(user);
      }
      navigate('/');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: '1.5rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '420px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>Secure Sign In</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
            Enter your credentials to manage your comparison cart
          </p>
        </div>

        {error && (
          <div style={{ color: 'var(--danger)', fontSize: '0.85rem', fontWeight: 600, padding: '10px 12px', backgroundColor: 'var(--danger-light)', borderRadius: '8px' }}>
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              placeholder="e.g. user1 or admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', height: '46px', marginTop: '4px' }}
          >
            {loading ? 'Authenticating account...' : 'Sign In'}
          </button>
        </form>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', fontSize: '0.85rem' }}>
          <p style={{ color: 'var(--text-secondary)' }}>
            New to CompareStore? <Link to="/signup" style={{ color: 'var(--accent)', fontWeight: 600 }}>Create Account</Link>
          </p>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textAlign: 'center', marginTop: '10px', backgroundColor: 'var(--bg-tertiary)', padding: '8px', borderRadius: '6px', width: '100%' }}>
            <p style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem', marginBottom: '2px' }}>Test Accounts Available (Seoded):</p>
            <p>Admin: <strong style={{ color: 'var(--text-primary)' }}>admin</strong> / password: <strong style={{ color: 'var(--text-primary)' }}>admin123</strong></p>
            <p>User: <strong style={{ color: 'var(--text-primary)' }}>user1</strong> / password: <strong style={{ color: 'var(--text-primary)' }}>user123</strong></p>
          </div>
        </div>

      </div>
    </div>
  );
}
