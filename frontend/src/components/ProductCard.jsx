import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

export default function ProductCard({ product, onAddToCart }) {
  const { id, name, category, imageUrl, onlinePriceAmazon = 0, onlinePriceFlipkart = 0, offlinePrice = 0, rating, shopName } = product;

  // Compare all three prices
  const prices = [
    { platform: 'Amazon', price: onlinePriceAmazon },
    { platform: 'Flipkart', price: onlinePriceFlipkart },
    { platform: 'Offline', price: offlinePrice }
  ];
  
  const sorted = [...prices].sort((a, b) => a.price - b.price);
  const cheapest = sorted[0];
  const mostExpensive = sorted[2];
  const priceDiff = mostExpensive.price - cheapest.price;
  const savingsPct = Math.round((priceDiff / mostExpensive.price) * 100);

  return (
    <div className="glass-panel glass-panel-hover animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      
      {/* Product Image */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '75%', overflow: 'hidden', backgroundColor: 'var(--bg-tertiary)' }}>
        <img 
          src={imageUrl} 
          alt={name} 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=60';
          }}
        />
        <span className="badge badge-accent" style={{ position: 'absolute', top: '10px', left: '10px', backdropFilter: 'blur(8px)', background: 'rgba(99, 102, 241, 0.8)', color: 'white' }}>
          {category}
        </span>
        
        {priceDiff > 0 && (
          <span className="badge badge-success" style={{ position: 'absolute', top: '10px', right: '10px', backdropFilter: 'blur(8px)' }}>
            Save {savingsPct}%
          </span>
        )}
      </div>

      {/* Card Body */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '0.65rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <StarRating rating={rating} showLabel={true} />
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '4px 0 0 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', height: '2.85rem', color: 'var(--text-primary)' }}>
            {name}
          </h4>
        </div>

        {/* Pricing Layout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', backgroundColor: 'var(--bg-tertiary)', padding: '0.65rem 0.85rem', borderRadius: '10px', margin: '4px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600 }}>
            <span style={{ color: 'var(--text-secondary)' }}>Amazon:</span>
            <span style={{ color: cheapest.platform === 'Amazon' ? 'var(--success)' : 'var(--text-primary)' }}>
              ₹{onlinePriceAmazon.toLocaleString('en-IN')}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600 }}>
            <span style={{ color: 'var(--text-secondary)' }}>Flipkart:</span>
            <span style={{ color: cheapest.platform === 'Flipkart' ? 'var(--success)' : 'var(--text-primary)' }}>
              ₹{onlinePriceFlipkart.toLocaleString('en-IN')}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600 }}>
            <span style={{ color: 'var(--text-secondary)' }}>Local Shop:</span>
            <span style={{ color: cheapest.platform === 'Offline' ? 'var(--success)' : 'var(--text-primary)' }}>
              ₹{offlinePrice.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Best Price Highlight */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '4px' }}>
          <div>
            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Cheapest channel</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--success)', margin: 0 }}>
              ₹{cheapest.price.toLocaleString('en-IN')}
            </h3>
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textAlign: 'right' }}>
            Buy {cheapest.platform}
          </span>
        </div>

        {/* Card Actions */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '8px' }}>
          <Link 
            to={`/product/${id}`} 
            className="btn btn-outline" 
            style={{ flexGrow: 1, padding: '0.55rem', fontSize: '0.85rem' }}
          >
            Compare
          </Link>
          <button 
            onClick={() => onAddToCart(id)} 
            className="btn btn-primary" 
            style={{ flexGrow: 1, padding: '0.55rem', fontSize: '0.85rem' }}
          >
            Add to Cart
          </button>
        </div>
      </div>
      
    </div>
  );
}
