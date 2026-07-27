import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function Navbar({ cartCount = 0, onSearch, user, onLogout }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  // Initialize Theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  // Theme Toggle Handler
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
    navigate('/');
  };

  return (
    <nav className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '0.85rem 1.5rem',
      borderRadius: '0 0 var(--border-radius-md) var(--border-radius-md)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      margin: '0 auto',
      width: '100%',
      maxWidth: '1300px',
      borderTop: 'none'
    }}>
      {/* Brand logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div className="grad-bg" style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 800,
          fontSize: '1.2rem',
          boxShadow: '0 4px 10px rgba(99, 102, 241, 0.4)'
        }}>
          C
        </div>
        <span style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
          Compare<span className="grad-text">Store</span>
        </span>
      </Link>

      {/* Global Search Bar */}
      <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flexGrow: 0.6, maxWidth: '500px', width: '100%', position: 'relative' }}>
        <input
          type="text"
          placeholder="Search for Mobiles, Laptops, Shoes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-input"
          style={{ width: '100%', paddingRight: '40px', paddingLeft: '1rem', height: '42px', borderRadius: '12px' }}
        />
        <button type="submit" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--text-tertiary)' }}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </form>

      {/* Navigation and Session options */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Home */}
        <Link to="/" className="btn btn-outline btn-icon" style={{ borderRadius: '10px' }} title="Home">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </Link>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="btn btn-outline btn-icon theme-toggle-btn" style={{ borderRadius: '10px' }} title="Toggle Theme">
          {isDarkMode ? (
            // Sun Icon
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            // Moon Icon
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>

        {/* Cart Item Tracker */}
        <Link to="/cart" className="btn btn-outline" style={{ borderRadius: '10px', padding: '0 1rem', height: '40px', position: 'relative' }} title="Cart">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ marginRight: '4px' }}>
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Cart</span>
          {cartCount > 0 && (
            <span className="grad-bg animate-fade-in" style={{
              position: 'absolute',
              top: '-6px',
              right: '-6px',
              color: 'white',
              fontSize: '0.7rem',
              fontWeight: 800,
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(99, 102, 241, 0.4)'
            }}>
              {cartCount}
            </span>
          )}
        </Link>

        {/* Admin Dashboard (if role is ADMIN) */}
        {user && user.role === 'ADMIN' && (
          <Link to="/admin" className="btn btn-outline" style={{ borderRadius: '10px', padding: '0 1rem', height: '40px', color: 'var(--warning)', borderColor: 'var(--warning)' }}>
            Admin Panel
          </Link>
        )}

        <span style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)', margin: '0 4px' }} />

        {/* Session details */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>@{user.username}</span>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>{user.role}</span>
            </div>
            <button onClick={onLogout} className="btn btn-outline" style={{ borderRadius: '10px', height: '40px', padding: '0 1rem', fontSize: '0.85rem' }}>
              Logout
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to="/login" className="btn btn-secondary" style={{ borderRadius: '10px', height: '40px', padding: '0 1rem', fontSize: '0.85rem' }}>
              Log In
            </Link>
            <Link to="/signup" className="btn btn-primary" style={{ borderRadius: '10px', height: '40px', padding: '0 1rem', fontSize: '0.85rem' }}>
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
