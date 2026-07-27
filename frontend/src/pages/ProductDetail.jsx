import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import StarRating from '../components/StarRating';
import PriceCompareMeter from '../components/PriceCompareMeter';

export default function ProductDetail({ onAddToCart, user }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Review Form States
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSubmitLoading, setReviewSubmitLoading] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');

  // Routing simulation
  const [routingStatus, setRoutingStatus] = useState('');

  const fetchProductAndReviews = async () => {
    setLoading(true);
    setError('');
    try {
      const prodData = await api.getProductById(id);
      setProduct(prodData);
      
      const revData = await api.getProductReviews(id);
      setReviews(revData);
    } catch (err) {
      setError('Failed to load product details. It may not exist in the database.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductAndReviews();
  }, [id]);

  const handleSimulateRouting = () => {
    if (!product) return;
    setRoutingStatus('Calculating fastest route...');
    setTimeout(() => {
      setRoutingStatus(`Optimal path found to "${product.shopName}"! Estimated travel time: 24 mins via main bypass road.`);
    }, 1500);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setReviewError('You must log in to submit a review.');
      return;
    }
    if (!comment.trim()) {
      setReviewError('Please provide a comment for your review.');
      return;
    }

    setReviewSubmitLoading(true);
    setReviewError('');
    setReviewSuccess('');

    try {
      const newReview = await api.addReview(id, parseFloat(rating), comment);
      setReviewSuccess('Review posted successfully! Product aggregate rating updated.');
      setComment('');
      setRating(5);
      
      // Refresh product details & reviews to update rating averages
      const updatedProd = await api.getProductById(id);
      setProduct(updatedProd);
      const updatedRevs = await api.getProductReviews(id);
      setReviews(updatedRevs);
    } catch (err) {
      setReviewError(err.message || 'Failed to submit review.');
    } finally {
      setReviewSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '400px', gap: '1rem' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid var(--border-color)', borderTop: '4px solid var(--accent)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Loading comparison analysis...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="glass-panel animate-fade-in" style={{ padding: '3rem', textAlign: 'center', margin: '2rem auto', maxWidth: '600px' }}>
        <h3 style={{ color: 'var(--danger)', fontWeight: 700 }}>Data Fetch Failure</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>{error || 'The requested product could not be loaded.'}</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Back to Home</Link>
      </div>
    );
  }

  // Calculate prices logic
  const prices = [
    { platform: 'Amazon', price: product.onlinePriceAmazon },
    { platform: 'Flipkart', price: product.onlinePriceFlipkart },
    { platform: 'Local Shop', price: product.offlinePrice }
  ];
  const sorted = [...prices].sort((a, b) => a.price - b.price);
  const cheapest = sorted[0];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Navigation breadcrumbs */}
      <div style={{ display: 'flex', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
        <Link to="/" style={{ color: 'var(--accent)' }}>Catalog</Link>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span style={{ color: 'var(--text-primary)' }}>{product.name}</span>
      </div>

      {/* Main Panel Details */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2.5rem',
        alignItems: 'start'
      }}>
        
        {/* Left Hand: Product Image and actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="glass-panel" style={{ width: '100%', padding: '1rem', borderRadius: 'var(--border-radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-secondary)' }}>
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              style={{ maxWidth: '100%', maxHeight: '420px', borderRadius: 'var(--border-radius-md)', objectFit: 'contain' }}
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=60';
              }}
            />
          </div>

          {/* Pricing Quick Display */}
          <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <h4 style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Quick Price Index</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>📦 Amazon Price:</span>
                <span style={{ fontWeight: 700, color: cheapest.platform === 'Amazon' ? 'var(--success)' : 'var(--text-primary)' }}>
                  ₹{product.onlinePriceAmazon.toLocaleString('en-IN')}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>🛍️ Flipkart Price:</span>
                <span style={{ fontWeight: 700, color: cheapest.platform === 'Flipkart' ? 'var(--success)' : 'var(--text-primary)' }}>
                  ₹{product.onlinePriceFlipkart.toLocaleString('en-IN')}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>📍 Local Shop:</span>
                <span style={{ fontWeight: 700, color: cheapest.platform === 'Local Shop' ? 'var(--success)' : 'var(--text-primary)' }}>
                  ₹{product.offlinePrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button onClick={() => onAddToCart(product.id)} className="btn btn-primary" style={{ width: '100%', gap: '0.5rem', height: '48px' }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Add to Shopping Cart
            </button>
          </div>
        </div>

        {/* Right Hand: Product Description, Comparison, and Map Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <span className="badge badge-accent" style={{ marginBottom: '6px' }}>{product.category}</span>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>{product.name}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
              <StarRating rating={product.rating} showLabel={true} />
              <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>•</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                {reviews.length} Customer Reviews
              </span>
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Description</h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{product.description}</p>
          </div>

          {/* Integrated Price Comparison Meter */}
          <PriceCompareMeter 
            onlinePriceAmazon={product.onlinePriceAmazon} 
            onlinePriceFlipkart={product.onlinePriceFlipkart} 
            offlinePrice={product.offlinePrice} 
            shopName={product.shopName}
          />

          {/* Offline Location Panel */}
          <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid var(--accent)' }}>
            <h4 style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              📍 Local Dealer Store Locator
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h5 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{product.shopName}</h5>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{product.shopAddress}</p>
            </div>

            <div style={{ marginTop: '12px' }}>
              <button onClick={handleSimulateRouting} className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
                🚘 Simulate Route GPS
              </button>
              {routingStatus && (
                <p className="animate-fade-in" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', marginTop: '8px', padding: '6px 10px', backgroundColor: 'var(--accent-light)', borderRadius: '6px' }}>
                  {routingStatus}
                </p>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Product Reviews Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '2.5rem',
        marginTop: '2rem',
        borderTop: '1px solid var(--border-color)',
        paddingTop: '2.5rem'
      }}>
        
        {/* Customer Feedbacks */}
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
            Customer Reviews ({reviews.length})
          </h3>

          {reviews.length === 0 ? (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>No reviews yet for this product.</p>
              <p style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', marginTop: '4px' }}>Be the first to submit your shopping experience!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {reviews.map((rev) => (
                <div key={rev.id} className="glass-panel animate-fade-in" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>@{rev.reviewerName}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>{rev.date}</span>
                    </div>
                    <StarRating rating={rev.rating} showLabel={false} />
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Review Form */}
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
            Submit Your Feedback
          </h3>

          {user ? (
            <form onSubmit={handleReviewSubmit} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {reviewError && (
                <div style={{ color: 'var(--danger)', fontSize: '0.85rem', fontWeight: 600, padding: '8px 12px', backgroundColor: 'var(--danger-light)', borderRadius: '8px' }}>
                  ⚠️ {reviewError}
                </div>
              )}
              {reviewSuccess && (
                <div style={{ color: 'var(--success)', fontSize: '0.85rem', fontWeight: 600, padding: '8px 12px', backgroundColor: 'var(--success-light)', borderRadius: '8px' }}>
                  ✅ {reviewSuccess}
                </div>
              )}

              {/* Rating Star Selection */}
              <div className="form-group">
                <label className="form-label">Product Rating</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      style={{ cursor: 'pointer', color: star <= rating ? '#f59e0b' : '#d1d5db', fontSize: '1.5rem' }}
                    >
                      ★
                    </button>
                  ))}
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-secondary)', marginLeft: '6px' }}>
                    {rating} out of 5 stars
                  </span>
                </div>
              </div>

              {/* Comment text */}
              <div className="form-group">
                <label className="form-label">Review Comment</label>
                <textarea
                  placeholder="Share your experience comparing this product online and offline..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="form-input"
                  style={{ minHeight: '100px', resize: 'vertical' }}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={reviewSubmitLoading}
                className="btn btn-primary"
                style={{ width: '100%', height: '42px', marginTop: '4px' }}
              >
                {reviewSubmitLoading ? 'Submitting feedback...' : 'Submit Customer Review'}
              </button>
            </form>
          ) : (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Submit feedback form protected.</p>
              <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginTop: '4px', marginBottom: '1.25rem' }}>
                You must be logged in with a secure account to write reviews.
              </p>
              <Link to="/login" className="btn btn-secondary">Log In Now</Link>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
