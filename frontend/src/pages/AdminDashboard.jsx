import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const INITIAL_FORM = {
  name: '',
  category: 'Mobiles',
  description: '',
  imageUrl: '',
  onlinePriceAmazon: '',
  onlinePriceFlipkart: '',
  offlinePrice: '',
  shopName: '',
  shopAddress: ''
};

export default function AdminDashboard({ user }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formSubmitLoading, setFormSubmitLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await api.getProducts('All');
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch catalog list for administration.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Access Guard
    if (!user || user.role !== 'ADMIN') {
      return;
    }
    fetchProducts();
  }, [user]);

  // If unauthorized user accesses page
  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="glass-panel animate-fade-in" style={{ padding: '3rem', textAlign: 'center', margin: '3rem auto', maxWidth: '550px', borderTop: '4px solid var(--danger)' }}>
        <div style={{ fontSize: '3rem', margin: '0 auto 1rem auto' }}>🚫</div>
        <h2 style={{ fontWeight: 800, color: 'var(--text-primary)' }}>Access Forbidden</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.95rem' }}>
          This sector is reserved for account profiles registered with Administrative privileges.
        </p>
        <button onClick={() => navigate('/')} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Return to Catalog
        </button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.onlinePriceAmazon || !formData.onlinePriceFlipkart || !formData.offlinePrice || !formData.shopName) {
      setError('Please fill in all required product fields.');
      return;
    }

    setFormSubmitLoading(true);
    setError('');
    setSuccess('');

    // Pre-fill image if blank
    let finalImageUrl = formData.imageUrl.trim();
    if (!finalImageUrl) {
      if (formData.category === 'Mobiles') finalImageUrl = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60';
      else if (formData.category === 'Laptops') finalImageUrl = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60';
      else if (formData.category === 'Headphones') finalImageUrl = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60';
      else if (formData.category === 'Watches') finalImageUrl = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60';
      else finalImageUrl = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60';
    }

    const submission = {
      name: formData.name.trim(),
      category: formData.category,
      description: formData.description.trim(),
      imageUrl: finalImageUrl,
      onlinePriceAmazon: parseFloat(formData.onlinePriceAmazon),
      onlinePriceFlipkart: parseFloat(formData.onlinePriceFlipkart),
      offlinePrice: parseFloat(formData.offlinePrice),
      shopName: formData.shopName.trim(),
      shopAddress: formData.shopAddress.trim(),
      rating: isEditing ? undefined : 5.0 // default rating for new products
    };

    try {
      if (isEditing) {
        await api.updateProduct(editId, submission);
        setSuccess('Product updated successfully inside the database.');
      } else {
        await api.createProduct(submission);
        setSuccess('New comparative product pre-seeded successfully.');
      }
      setFormData(INITIAL_FORM);
      setIsEditing(false);
      setEditId(null);
      await fetchProducts();
    } catch (err) {
      setError(err.message || 'Failed to submit product details.');
    } finally {
      setFormSubmitLoading(false);
    }
  };

  const handleEditClick = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description || '',
      imageUrl: product.imageUrl || '',
      onlinePriceAmazon: product.onlinePriceAmazon,
      onlinePriceFlipkart: product.onlinePriceFlipkart,
      offlinePrice: product.offlinePrice,
      shopName: product.shopName,
      shopAddress: product.shopAddress || ''
    });
    setIsEditing(true);
    setEditId(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm('Are you absolutely sure you want to delete this product from the comparison database?')) {
      return;
    }
    setError('');
    setSuccess('');
    try {
      await api.deleteProduct(id);
      setSuccess('Product deleted successfully.');
      await fetchProducts();
    } catch (err) {
      setError(err.message || 'Failed to delete product.');
    }
  };

  const handleCancelEdit = () => {
    setFormData(INITIAL_FORM);
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>Admin Catalog Control Panel</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>
          Add, update, or remove online/offline products in real time
        </p>
      </div>

      {success && (
        <div style={{ color: 'var(--success)', fontSize: '0.85rem', fontWeight: 600, padding: '10px 12px', backgroundColor: 'var(--success-light)', borderRadius: '8px' }}>
          ✅ {success}
        </div>
      )}
      {error && (
        <div style={{ color: 'var(--danger)', fontSize: '0.85rem', fontWeight: 600, padding: '10px 12px', backgroundColor: 'var(--danger-light)', borderRadius: '8px' }}>
          ⚠️ {error}
        </div>
      )}

      {/* Main Admin Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
        
        {/* Left Side: Product Entry Form */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
            {isEditing ? '✏️ Edit Product Details' : '➕ Add New Comparison Product'}
          </h3>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g. Sony WH-1000XM5"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-input"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="Mobiles">Mobiles</option>
                  <option value="Laptops">Laptops</option>
                  <option value="Headphones">Headphones</option>
                  <option value="Watches">Watches</option>
                  <option value="Shoes">Shoes</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Leave blank for auto-placeholder"
                />
              </div>
            </div>

            {/* Platform Specific Prices */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Amazon Price (₹) *</label>
                <input
                  type="number"
                  name="onlinePriceAmazon"
                  value={formData.onlinePriceAmazon}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g. 29990"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Flipkart Price (₹) *</label>
                <input
                  type="number"
                  name="onlinePriceFlipkart"
                  value={formData.onlinePriceFlipkart}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g. 29499"
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Local Shop Price (₹) *</label>
                <input
                  type="number"
                  name="offlinePrice"
                  value={formData.offlinePrice}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g. 28500"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Local Shop Name *</label>
              <input
                type="text"
                name="shopName"
                value={formData.shopName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g. Reliance Digital Connaught Place"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Local Shop Address</label>
              <input
                type="text"
                name="shopAddress"
                value={formData.shopAddress}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Full physical street address..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-input"
                style={{ minHeight: '80px', resize: 'vertical' }}
                placeholder="Brief summary of item highlights and features..."
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '4px' }}>
              {isEditing && (
                <button type="button" onClick={handleCancelEdit} className="btn btn-secondary" style={{ flexGrow: 1, height: '42px' }}>
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={formSubmitLoading}
                className="btn btn-primary"
                style={{ flexGrow: 1, height: '42px' }}
              >
                {formSubmitLoading ? 'Saving data...' : isEditing ? 'Update Product' : 'Register Product'}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Product Catalog List Table */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '400px' }}>
          <h3 style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
            📋 Catalog Database ({products.length} Items)
          </h3>

          {loading ? (
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', textAlign: 'center', marginTop: '2rem' }}>Refreshing administration feed...</p>
          ) : products.length === 0 ? (
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', textAlign: 'center', marginTop: '2rem' }}>No products registered in the database.</p>
          ) : (
            <div style={{ overflowX: 'auto', maxHeight: '480px', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontWeight: 800 }}>
                    <th style={{ padding: '6px' }}>Product</th>
                    <th style={{ padding: '6px' }}>Category</th>
                    <th style={{ padding: '6px' }}>Amazon</th>
                    <th style={{ padding: '6px' }}>Flipkart</th>
                    <th style={{ padding: '6px' }}>Local Shop</th>
                    <th style={{ padding: '6px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }} className="admin-table-row">
                      <td style={{ padding: '6px', fontWeight: 600, color: 'var(--text-primary)', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {p.name}
                      </td>
                      <td style={{ padding: '6px', color: 'var(--text-secondary)' }}>{p.category}</td>
                      <td style={{ padding: '6px', color: 'var(--text-primary)' }}>₹{p.onlinePriceAmazon.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '6px', color: 'var(--text-primary)' }}>₹{p.onlinePriceFlipkart.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '6px', color: 'var(--text-primary)' }}>₹{p.offlinePrice.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '6px', textAlign: 'right', display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                        <button onClick={() => handleEditClick(p)} style={{ padding: '3px 6px', fontSize: '0.7rem', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                          Edit
                        </button>
                        <button onClick={() => handleDeleteClick(p.id)} style={{ padding: '3px 6px', fontSize: '0.7rem', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'var(--danger-light)', color: 'var(--danger)', border: '1px solid var(--danger-light)' }}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <style>{`
                .admin-table-row:hover {
                  background-color: var(--bg-tertiary);
                }
              `}</style>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
