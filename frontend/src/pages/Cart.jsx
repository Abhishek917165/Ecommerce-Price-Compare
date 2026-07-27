import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

export default function Cart({ user, onCartUpdate }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const fetchCart = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await api.getCart();
      setCartItems(data);
    } catch (err) {
      setError('Failed to fetch shopping cart details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const handleUpdateQuantity = async (itemId, currentQty, amount) => {
    const newQty = currentQty + amount;
    try {
      if (newQty <= 0) {
        await api.removeFromCart(itemId);
      } else {
        await api.updateCartQuantity(itemId, newQty);
      }
      // Re-fetch cart & update count in parent App
      await fetchCart();
      if (onCartUpdate) onCartUpdate();
    } catch (err) {
      setError('Could not update quantity. Please try again.');
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await api.removeFromCart(itemId);
      await fetchCart();
      if (onCartUpdate) onCartUpdate();
    } catch (err) {
      setError('Failed to delete item from cart.');
    }
  };

  const handleClearCart = async () => {
    try {
      await api.clearCart();
      await fetchCart();
      if (onCartUpdate) onCartUpdate();
    } catch (err) {
      setError('Failed to clear cart.');
    }
  };

  const handleCheckout = async () => {
    try {
      await api.clearCart();
      setCheckoutSuccess(true);
      setCartItems([]);
      if (onCartUpdate) onCartUpdate();
    } catch (err) {
      setError('Checkout mock failed.');
    }
  };

  // Compute checkout summary aggregates
  const calculateTotals = () => {
    let amazonTotal = 0;
    let flipkartTotal = 0;
    let offlineTotal = 0;
    let cheapestTotal = 0;

    cartItems.forEach(item => {
      const qty = item.quantity;
      const amazon = item.product.onlinePriceAmazon;
      const flipkart = item.product.onlinePriceFlipkart;
      const offline = item.product.offlinePrice;

      amazonTotal += amazon * qty;
      flipkartTotal += flipkart * qty;
      offlineTotal += offline * qty;
      cheapestTotal += Math.min(amazon, flipkart, offline) * qty;
    });

    const maxVal = Math.max(amazonTotal, flipkartTotal, offlineTotal);
    const totalSavings = maxVal - cheapestTotal;

    return {
      amazonTotal,
      flipkartTotal,
      offlineTotal,
      cheapestTotal,
      totalSavings
    };
  };

  const totals = calculateTotals();

  if (!user) {
    return (
      <div className="glass-panel animate-fade-in" style={{ padding: '3rem', textAlign: 'center', margin: '2rem auto', maxWidth: '550px' }}>
        <h3 style={{ fontWeight: 800, color: 'var(--text-primary)' }}>Shopping Cart Protected</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '1.5rem' }}>
          Please log in to manage your shopping cart and view comparative savings analyses.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <Link to="/login" className="btn btn-primary">Log In</Link>
          <Link to="/signup" className="btn btn-secondary">Create Account</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', gap: '1rem' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid var(--border-color)', borderTop: '4px solid var(--accent)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Loading shopping cart items...</p>
      </div>
    );
  }

  if (checkoutSuccess) {
    return (
      <div className="glass-panel animate-fade-in" style={{ padding: '3rem', textAlign: 'center', margin: '2rem auto', maxWidth: '550px', borderTop: '4px solid var(--success)' }}>
        <div className="grad-bg" style={{ width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem', margin: '0 auto 1rem auto' }}>
          ✓
        </div>
        <h2 style={{ fontWeight: 800, color: 'var(--text-primary)' }}>Mock Order Placed!</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.95rem', lineHeight: 1.5 }}>
          Your purchase simulation has finished successfully! We've simulated routing order channels and cleared your shopping cart.
        </p>
        <p style={{ fontWeight: 700, color: 'var(--success)', marginTop: '10px' }}>
          Thank you for choosing local-smart savings!
        </p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>Your Shopping Cart</h2>

      {error && (
        <div style={{ color: 'var(--danger)', fontSize: '0.85rem', fontWeight: 600, padding: '8px 12px', backgroundColor: 'var(--danger-light)', borderRadius: '8px' }}>
          ⚠️ {error}
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Your cart is empty.</p>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginTop: '4px', marginBottom: '1.5rem' }}>
            Browse our comparative catalog to discover deals offline and online!
          </p>
          <Link to="/" className="btn btn-primary">Discover Seoded Products</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
          
          {/* Cart Item Loops */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                Items ({cartItems.length})
              </span>
              <button onClick={handleClearCart} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '8px', color: 'var(--danger)', borderColor: 'var(--danger-light)' }}>
                🗑️ Clear All
              </button>
            </div>

            {cartItems.map((item) => {
              const { id, product, quantity } = item;
              const cheapest = Math.min(product.onlinePriceAmazon, product.onlinePriceFlipkart, product.offlinePrice);
              return (
                <div key={id} className="glass-panel animate-fade-in" style={{ padding: '1rem', display: 'flex', gap: '1rem', position: 'relative' }}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px', backgroundColor: 'var(--bg-tertiary)' }}
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=60';
                    }}
                  />

                  <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '4px' }}>
                    <span className="badge badge-accent" style={{ alignSelf: 'flex-start', fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>{product.category}</span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, paddingRight: '20px' }}>{product.name}</h4>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                      {/* Quantity Toggles */}
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '6px', overflow: 'hidden', height: '28px' }}>
                        <button onClick={() => handleUpdateQuantity(id, quantity, -1)} style={{ padding: '0 8px', cursor: 'pointer', backgroundColor: 'var(--bg-tertiary)', fontWeight: 'bold' }}>-</button>
                        <span style={{ padding: '0 12px', fontSize: '0.85rem', fontWeight: 700 }}>{quantity}</span>
                        <button onClick={() => handleUpdateQuantity(id, quantity, 1)} style={{ padding: '0 8px', cursor: 'pointer', backgroundColor: 'var(--bg-tertiary)', fontWeight: 'bold' }}>+</button>
                      </div>

                      {/* Item Total Pricing info */}
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.7rem', display: 'block', color: 'var(--text-tertiary)', fontWeight: 600 }}>Best Item Price</span>
                        <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--success)' }}>
                          ₹{(cheapest * quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button onClick={() => handleRemoveItem(id)} style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', color: 'var(--text-tertiary)', background: 'none' }} title="Remove item">
                    ✕
                  </button>
                </div>
              );
            })}
          </div>

          {/* Pricing aggregates summary */}
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
              Comparison Checkout Summary
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Total Amazon Price:</span>
                <span style={{ fontWeight: 700 }}>₹{totals.amazonTotal.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Total Flipkart Price:</span>
                <span style={{ fontWeight: 700 }}>₹{totals.flipkartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Total Local Shop Price:</span>
                <span style={{ fontWeight: 700 }}>₹{totals.offlineTotal.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '4px 0' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'var(--success-light)', padding: '8px 10px', borderRadius: '8px', color: 'var(--success)' }}>
                <span style={{ fontWeight: 700 }}>Best Channel Optimized:</span>
                <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>₹{totals.cheapestTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {totals.totalSavings > 0 && (
              <div className="glass-panel animate-fade-in" style={{ padding: '0.85rem', borderColor: 'var(--success)', borderLeft: '4px solid var(--success)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '1.25rem' }}>💰</span>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>CompareStore Savings</p>
                  <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    You are saving <span style={{ color: 'var(--success)' }}>₹{totals.totalSavings.toLocaleString('en-IN')}</span> by choosing comparison recommendations!
                  </p>
                </div>
              </div>
            )}

            <button onClick={handleCheckout} className="btn btn-primary" style={{ width: '100%', height: '46px', marginTop: '8px' }}>
              Process simulated check out
            </button>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textAlign: 'center', lineHeight: 1.3 }}>
              *This checkout is simulated to showcase the price difference benefits. No actual payments are parsed.
            </p>
          </div>

        </div>
      )}

    </div>
  );
}
