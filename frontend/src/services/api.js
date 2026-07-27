const API_BASE_URL = 'http://localhost:8080/api';

// Helper to get authentication header from storage
const getAuthHeaders = () => {
  const authHeader = localStorage.getItem('authHeader');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (authHeader) {
    headers['Authorization'] = authHeader;
  }
  return headers;
};

export const api = {
  // --- AUTHENTICATION ---
  
  async login(username, password) {
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);
    
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(response.status === 401 ? 'Invalid username or password' : 'Login failed');
    }

    const user = await response.json();
    // Cache auth data locally
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('authHeader', authHeader);
    
    return user;
  },

  async signup(username, password, email, role = 'USER') {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, email, role })
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || 'Failed to sign up');
    }

    return await response.json();
  },

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('authHeader');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // --- PRODUCTS ---

  async getProducts(category = '', query = '') {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (query) params.append('query', query);

    const url = `${API_BASE_URL}/products?${params.toString()}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  },

  async getProductById(id) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Product not found');
    }
    return await response.json();
  },

  async createProduct(product) {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(product)
    });

    if (!response.ok) {
      throw new Error('Unauthorized or failed to create product');
    }
    return await response.json();
  },

  async updateProduct(id, product) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(product)
    });

    if (!response.ok) {
      throw new Error('Unauthorized or failed to update product');
    }
    return await response.json();
  },

  async deleteProduct(id) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Unauthorized or failed to delete product');
    }
    return true;
  },

  // --- REVIEWS ---

  async getProductReviews(productId) {
    const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }
    return await response.json();
  },

  async addReview(productId, rating, comment) {
    const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ rating, comment })
    });

    if (!response.ok) {
      throw new Error('Failed to post review. Please log in first.');
    }
    return await response.json();
  },

  // --- CART ---

  async getCart() {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch shopping cart');
    }
    return await response.json();
  },

  async addToCart(productId, quantity = 1) {
    const response = await fetch(`${API_BASE_URL}/cart/add?productId=${productId}&quantity=${quantity}`, {
      method: 'POST',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to add item to cart. Please log in first.');
    }
    return await response.json();
  },

  async updateCartQuantity(itemId, quantity) {
    const response = await fetch(`${API_BASE_URL}/cart/update/${itemId}?quantity=${quantity}`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to update cart quantity');
    }
    return await response.json();
  },

  async removeFromCart(itemId) {
    const response = await fetch(`${API_BASE_URL}/cart/remove/${itemId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to remove item from cart');
    }
    return true;
  },

  async clearCart() {
    const response = await fetch(`${API_BASE_URL}/cart/clear`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to clear cart');
    }
    return true;
  }
};
