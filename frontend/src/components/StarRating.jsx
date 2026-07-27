import React from 'react';

export default function StarRating({ rating = 0, showLabel = true }) {
  const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <div className="star-container">
        {/* Full Stars */}
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>
        ))}
        {/* Half Star */}
        {hasHalfStar && (
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ position: 'relative' }}>
            <defs>
              <linearGradient id="halfGrad">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            <path fill="url(#halfGrad)" d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>
        )}
        {/* Empty Stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={`empty-${i}`} width="16" height="16" fill="#d1d5db" viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957-2.73-2.6 3.945-.56L8 3.148l1.728 3.423 3.945.56-2.73 2.6.694 3.957-3.686-1.894z"/>
          </svg>
        ))}
      </div>
      {showLabel && (
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
