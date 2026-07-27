import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';

export default function Home({ activeCategory, onCategoryChange, searchQuery, onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch Products based on search criteria
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await api.getProducts(activeCategory, searchQuery);
        setProducts(data);
      } catch (err) {
        setError('Could not connect to the backend server. Make sure the Spring Boot application is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeCategory, searchQuery]);

  // Compute Top Savings Deals (biggest price difference)
  const getTopDeals = () => {
    return [...products]
      .filter(p => Math.abs(p.onlinePrice - p.offlinePrice) > 0)
      .sort((a, b) => {
        const diffA = Math.abs(a.onlinePrice - a.offlinePrice);
        const diffB = Math.abs(b.onlinePrice - b.offlinePrice);
        return diffB - diffA; // largest difference first
      })
      .slice(0, 3);
  };

  const topDeals = getTopDeals();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
      
      {/* Hero Banner */}
      <div className="hero-banner">
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
          Smart Shopping Starts Here
        </h1>
        <p style={{ fontSize: '1rem', marginTop: '8px', opacity: 0.9, maxWidth: '600px', lineHeight: 1.5 }}>
          Compare online catalog prices against physical local stores instantly. Find real-time location mappings and discover where to save the most on your favorite electronics and accessories!
        </p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
          <span className="badge badge-success" style={{ backgroundColor: 'white', color: 'var(--accent)', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            ⚡ 30+ Seoded Products Live
          </span>
          <span className="badge badge-success" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            🛡️ Basic Spring Security Configured
          </span>
        </div>
      </div>

      {/* Main Grid Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '240px 1fr',
        gap: '2rem',
        alignItems: 'start',
        marginTop: '1rem'
      }}>
        {/* Sidebar Filters */}
        <aside style={{ position: 'sticky', top: '100px' }}>
          <FilterSidebar activeCategory={activeCategory} onCategoryChange={onCategoryChange} />
        </aside>

        {/* Catalog Feed */}
        <main>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', gap: '1rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '4px solid var(--border-color)',
                borderTop: '4px solid var(--accent)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <p style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Loading active products index...</p>
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
          ) : error ? (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', borderColor: 'var(--danger-light)', backgroundColor: 'var(--danger-light)' }}>
              <h3 style={{ color: 'var(--danger)', fontWeight: 700 }}>Database Connection Error</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.95rem' }}>{error}</p>
            </div>
          ) : (
            <>
              {/* Highlight Top Saving Deals (if category is All and no search query) */}
              {activeCategory === 'All' && !searchQuery && topDeals.length > 0 && (
                <section style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    🔥 Top Price Savings Spotlight
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    These items exhibit the largest price differences between online stores and offline physical outlets.
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {topDeals.map(product => (
                      <ProductCard key={`deal-${product.id}`} product={product} onAddToCart={onAddToCart} />
                    ))}
                  </div>
                </section>
              )}

              {/* General Grid Listing */}
              <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {searchQuery ? `Search Results for "${searchQuery}"` : `${activeCategory} Products`}
                  </h3>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-tertiary)' }}>
                    Showing {products.length} products
                  </span>
                </div>

                {products.length === 0 ? (
                  <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      No products found in this filter profile.
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                      Try adjusting your keywords or clearing the category filter.
                    </p>
                  </div>
                ) : (
                  <div className="product-grid">
                    {products.map(product => (
                      <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </main>
      </div>

    </div>
  );
}
