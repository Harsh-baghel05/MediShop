import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { getUsers, getProducts, deleteProduct, deleteUser } from "../api.js";
import ProductCard from "../components/ProductCard.jsx";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const nav = useNavigate();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      nav('/shop');
      return;
    }

    const fetchData = async () => {
      try {
        const [usersData, productsData] = await Promise.all([getUsers(), getProducts()]);
        setUsers(usersData);
        setProducts(productsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, nav]);

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(p => p._id !== id));
      } catch (err) {
        alert('Error deleting product: ' + err.message);
      }
    }
  };

  if (loading) return <div className="section">Loading...</div>;
  if (error) return <div className="section">Error: {error}</div>;

  return (
    <div className="section">
      <h2>Admin Dashboard</h2>
      <div className="admin-sections">
        <div className="admin-section">
          <h3>Manage Users ({users.length})</h3>
<div className="user-list">
  {users.map(u => (
    <div key={u._id} className="user-item">
      <span>{u.name} - {u.email} ({u.role})</span>
      <button className="btn small" onClick={() => nav(`/admin/edit-user/${u._id}`)}>Edit</button>
      <button className="btn small danger" onClick={async () => {
        if (window.confirm('Delete this user?')) {
          try {
            await deleteUser(u._id);
            setUsers(users.filter(user => user._id !== u._id));
          } catch (err) {
            alert('Error deleting user: ' + err.message);
          }
        }
      }}>Delete</button>
    </div>
  ))}
</div>
        </div>
        <div className="admin-section">
          <h3>Manage Products ({products.length})</h3>
          <div className="product-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: '16px' }}>
            {products.map(p => (
              <div key={p._id} className="product-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ProductCard product={p} onAdd={() => {}} onToggle={() => {}} />
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '8px', width: '100%' }}>
                  <button className="btn small" onClick={() => nav(`/product/${p._id}`)} style={{ marginBottom: '8px' }}>View</button>
                  <button className="btn small outline" onClick={() => nav(`/admin/edit-product/${p._id}`)} style={{ marginBottom: '8px' }}>Edit</button>
                  <button className="btn small danger" onClick={() => handleDeleteProduct(p._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          <button className="btn" onClick={() => nav('/admin/create-product')}>Add New Product</button>
          {/* Note: Create product form can be added as a modal or separate page */}
        </div>
      </div>
    </div>
  );
}
