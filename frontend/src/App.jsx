import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { api } from './services/api';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  
  // Search & Category global filters
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Toast / notification state
  const [notification, setNotification] = useState('');

  // Initial Startup Session checks
  useEffect(() => {
    const cachedUser = api.getCurrentUser();
    if (cachedUser) {
      setUser(cachedUser);
    }
  }, []);

  // Sync Cart Counter whenever session logs in / logs out / adds items
  const syncCartCount = async () => {
    const cachedUser = api.getCurrentUser();
    if (!cachedUser) {
      setCartCount(0);
      return;
    }
    try {
      const items = await api.getCart();
      const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalCount);
    } catch (err) {
      console.warn('Failed to sync cart count:', err);
    }
  };

  useEffect(() => {
    syncCartCount();
  }, [user]);

  const handleLoginSuccess = (authenticatedUser) => {
    setUser(authenticatedUser);
    showToast(`Welcome back, @${authenticatedUser.username}! Session authenticated.`);
  };

  const handleLogout = () => {
    api.logout();
    setUser(null);
    setCartCount(0);
    showToast('Signed out successfully. Credentials cleared.');
  };

  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 3500);
  };

  const handleAddToCart = async (productId, quantity = 1) => {
    if (!user) {
      showToast('⚠️ Authenticated account required to modify cart! Please sign in.');
      return;
    }
    try {
      await api.addToCart(productId, quantity);
      await syncCartCount();
      showToast('🛒 Item added to shopping cart successfully!');
    } catch (err) {
      showToast(`⚠️ Error: ${err.message}`);
    }
  };

  const handleGlobalSearch = (query) => {
    setSearchQuery(query);
    // category gets reset when a search query is submitted globally
    setActiveCategory('All');
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    // search query gets reset when a category sidebar item is selected
    setSearchQuery('');
  };

  return (
    <Router>
      <div className="app-container">
        
        {/* Global Floating Toast Alert */}
        {notification && (
          <div className="grad-bg animate-fade-in" style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '0.9rem',
            boxShadow: '0 10px 25px rgba(99, 102, 241, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {notification}
          </div>
        )}

        {/* Dynamic Glass Navbar */}
        <Navbar 
          cartCount={cartCount} 
          onSearch={handleGlobalSearch} 
          user={user} 
          onLogout={handleLogout} 
        />

        {/* Content Feed Router */}
        <div className="main-content" style={{ marginTop: '2rem' }}>
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  activeCategory={activeCategory} 
                  onCategoryChange={handleCategoryChange}
                  searchQuery={searchQuery}
                  onAddToCart={handleAddToCart}
                />
              } 
            />
            <Route 
              path="/product/:id" 
              element={<ProductDetail onAddToCart={handleAddToCart} user={user} />} 
            />
            <Route 
              path="/cart" 
              element={<Cart user={user} onCartUpdate={syncCartCount} />} 
            />
            <Route 
              path="/login" 
              element={<Login onLoginSuccess={handleLoginSuccess} />} 
            />
            <Route 
              path="/signup" 
              element={<Signup />} 
            />
            <Route 
              path="/admin" 
              element={<AdminDashboard user={user} />} 
            />
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Polished Footing */}
        <Footer />
        
      </div>
    </Router>
  );
}
