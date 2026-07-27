import React from 'react';

export default function PriceCompareMeter({ onlinePriceAmazon = 0, onlinePriceFlipkart = 0, offlinePrice = 0, shopName = 'Local Store' }) {
  const prices = [
    { platform: 'Amazon', price: onlinePriceAmazon, icon: '📦', isOnline: true },
    { platform: 'Flipkart', price: onlinePriceFlipkart, icon: '🛍️', isOnline: true },
    { platform: 'Offline (' + shopName + ')', price: offlinePrice, icon: '📍', isOnline: false }
  ];

  // Sort by price to find the cheapest
  const sortedPrices = [...prices].sort((a, b) => a.price - b.price);
  const cheapest = sortedPrices[0];
  const mostExpensive = sortedPrices[2];
  
  const priceDiff = mostExpensive.price - cheapest.price;
  const savingsPct = mostExpensive.price > 0 ? Math.round((priceDiff / mostExpensive.price) * 100) : 0;

  // Aggregate total for percentage gauges
  const total = onlinePriceAmazon + onlinePriceFlipkart + offlinePrice;
  const amazonPct = total > 0 ? (onlinePriceAmazon / total) * 100 : 33.3;
  const flipkartPct = total > 0 ? (onlinePriceFlipkart / total) * 100 : 33.3;
  const offlinePct = total > 0 ? (offlinePrice / total) * 100 : 33.3;

  return (
    <div className="glass-panel" style={{ padding: '1.25rem', margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      
      {/* Title block */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
          Multi-Platform Price Analysis
        </h4>
        {priceDiff > 0 ? (
          <span className="badge badge-success" style={{ animation: 'pulse 2s infinite' }}>
            🎉 Save {savingsPct}% on {cheapest.platform.split(' ')[0]}!
          </span>
        ) : (
          <span className="badge badge-warning">Identical Pricing</span>
        )}
      </div>

      {/* Graphical Scale */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        <div style={{ display: 'flex', height: '12px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          {/* Amazon scale */}
          <div 
            style={{ 
              width: `${amazonPct}%`, 
              backgroundColor: cheapest.platform === 'Amazon' ? 'var(--success)' : (mostExpensive.platform === 'Amazon' ? 'var(--danger)' : 'var(--warning)'), 
              transition: 'width 0.4s' 
            }} 
            title={`Amazon: ₹${onlinePriceAmazon}`}
          />
          {/* Flipkart scale */}
          <div 
            style={{ 
              width: `${flipkartPct}%`, 
              backgroundColor: cheapest.platform === 'Flipkart' ? 'var(--success)' : (mostExpensive.platform === 'Flipkart' ? 'var(--danger)' : 'var(--warning)'), 
              transition: 'width 0.4s' 
            }} 
            title={`Flipkart: ₹${onlinePriceFlipkart}`}
          />
          {/* Offline Store scale */}
          <div 
            style={{ 
              width: `${offlinePct}%`, 
              backgroundColor: cheapest.platform.startsWith('Offline') ? 'var(--success)' : (mostExpensive.platform.startsWith('Offline') ? 'var(--danger)' : 'var(--warning)'), 
              transition: 'width 0.4s' 
            }} 
            title={`Local Shop: ₹${offlinePrice}`}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
          <span>Amazon</span>
          <span>Flipkart</span>
          <span>{shopName}</span>
        </div>
      </div>

      {/* Comparison checklist */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '4px' }}>
        {prices.map((item, i) => {
          const isCheapest = item.platform === cheapest.platform;
          return (
            <div 
              key={i} 
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.65rem 0.85rem',
                borderRadius: '10px',
                backgroundColor: isCheapest ? 'var(--success-light)' : 'var(--bg-tertiary)',
                border: isCheapest ? '1px solid var(--success)' : '1px solid var(--border-color)',
                transition: 'all 0.25s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                <span style={{ fontWeight: isCheapest ? 700 : 600, color: isCheapest ? 'var(--success)' : 'var(--text-secondary)' }}>
                  {item.platform}
                </span>
                {isCheapest && <span className="badge badge-success" style={{ padding: '0.1rem 0.4rem', fontSize: '0.6rem' }}>Cheapest</span>}
              </div>
              <span style={{ fontWeight: 800, color: isCheapest ? 'var(--success)' : 'var(--text-primary)' }}>
                ₹{item.price.toLocaleString('en-IN')}
              </span>
            </div>
          );
        })}
      </div>

      {/* Savings Summary Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg-tertiary)',
        padding: '0.75rem 1rem',
        borderRadius: '10px',
        borderTop: '2px solid var(--success)',
        marginTop: '2px'
      }}>
        <div>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Recommended Channel</p>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--success)', margin: 0 }}>
            {cheapest.platform.split(' ')[0]} @ ₹{cheapest.price.toLocaleString('en-IN')}
          </h3>
        </div>
        {priceDiff > 0 && (
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Maximum Savings</p>
            <p style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--success)', margin: 0 }}>
              Save ₹{priceDiff.toLocaleString('en-IN')}!
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
