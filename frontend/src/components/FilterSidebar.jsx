import React from 'react';

const CATEGORIES = [
  { name: 'All', icon: '🛍️' },
  { name: 'Mobiles', icon: '📱' },
  { name: 'Laptops', icon: '💻' },
  { name: 'Headphones', icon: '🎧' },
  { name: 'Watches', icon: '⌚' },
  { name: 'Shoes', icon: '👟' }
];

export default function FilterSidebar({ activeCategory = 'All', onCategoryChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)' }}>
        Categories
      </h3>
      
      {/* Category List */}
      <div className="category-scroll-container" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => onCategoryChange(cat.name)}
              className="btn"
              style={{
                justifyContent: 'flex-start',
                padding: '0.65rem 1rem',
                borderRadius: '10px',
                fontSize: '0.9rem',
                backgroundColor: isActive ? 'var(--accent)' : 'var(--bg-secondary)',
                color: isActive ? 'white' : 'var(--text-secondary)',
                border: isActive ? '1px solid var(--accent)' : '1px solid var(--border-color)',
                boxShadow: isActive ? '0 4px 10px rgba(99, 102, 241, 0.3)' : 'var(--shadow-sm)',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ marginRight: '8px', fontSize: '1.05rem' }}>{cat.icon}</span>
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
