import React from 'react';

export default function Footer() {
  return (
    <footer className="glass-panel" style={{
      marginTop: 'auto',
      borderRadius: 'var(--border-radius-md) var(--border-radius-md) 0 0',
      padding: '2rem 1.5rem 1.5rem 1.5rem',
      maxWidth: '1300px',
      width: '100%',
      margin: '4rem auto 0 auto',
      borderBottom: 'none'
    }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '2rem',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ maxWidth: '400px' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Compare<span className="grad-text">Store</span>
          </span>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.6 }}>
            A state-of-the-art secure and scalable price comparison web application. Saving users time and money by providing transparent online and offline product pricing indexes in real time.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '4rem' }}>
          <div>
            <h5 style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '8px' }}>Project</h5>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>CS miniproject</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>B.Tech CSE 2026</p>
          </div>
          <div>
            <h5 style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '8px' }}>Tech Stack</h5>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>React & Spring Boot</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>Spring Security 6.x</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>MySQL / H2 Database</p>
          </div>
        </div>
      </div>

      <div style={{
        paddingTop: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center',
        fontSize: '0.8rem',
        color: 'var(--text-tertiary)'
      }}>
        <p>© 2026 E-commerce Comparison Website. All rights reserved.</p>
        <p style={{ fontWeight: 600 }}>
          Designed for: <span style={{ color: 'var(--text-primary)' }}>“Design and Development of Secure and Scalable E-commerce Website”</span>
        </p>
      </div>
    </footer>
  );
}
