import React, { useContext, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { CartContext } from "../context/CartContext.jsx";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart, wishlist } = useContext(CartContext);
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);

  function handleSearch() {
    if (searchTerm.trim()) {
      nav(`/shop?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  function handleLogout() {
    logout();
    nav('/');
  }

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">MediShop</Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="nav-actions">
          {user && (
            <>
              <Link to="/wishlist" className="icon-btn">♡ {wishlist.length}</Link>
              <Link to="/cart" className="icon-btn">🛒 {cart.length}</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="btn small">Admin Panel</Link>
              )}
            </>
          )}
          {user ? (
            <>
              <span style={{ margin: '0 10px' }}>Hi, {user.name.split(' ')[0]}</span>
              <button className="btn small" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn small">Login</Link>
              <Link to="/signup" className="btn small outline">Signup</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
