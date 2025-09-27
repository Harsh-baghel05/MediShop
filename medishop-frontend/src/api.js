const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function api(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || 'API error');
  }
  return res.json();
}

// Auth
export async function login(email, password) {
  return api('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
}

export async function signup(name, email, password) {
  return api('/auth/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) });
}

// Products
export async function getProducts() {
  return api('/products');
}

export async function getFeaturedProducts() {
  return api('/products/featured');
}

export async function getProduct(id) {
  return api(`/products/${id}`);
}

// Cart
export async function getCart() {
  return api('/cart');
}

export async function addToCart(productId) {
  return api('/cart/add', { method: 'POST', body: JSON.stringify({ productId }) });
}

export async function removeFromCart(productId) {
  return api('/cart/remove', { method: 'POST', body: JSON.stringify({ productId }) });
}

// Wishlist
export async function getWishlist() {
  return api('/wishlist');
}

export async function toggleWishlist(productId) {
  return api('/wishlist/toggle', { method: 'POST', body: JSON.stringify({ productId }) });
}
