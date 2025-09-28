import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { getUsers, getProducts, deleteProduct } from "../api.js";

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
                {/* Add edit/delete if needed */}
              </div>
            ))}
          </div>
        </div>
        <div className="admin-section">
          <h3>Manage Products ({products.length})</h3>
          <div className="product-list">
            {products.map(p => (
              <div key={p._id} className="product-item">
                <span>{p.name} - ${p.price}</span>
                <button className="btn small" onClick={() => nav(`/product/${p._id}`)}>View</button>
                <button className="btn small outline" onClick={() => {/* Edit logic: nav to edit form */}}>Edit</button>
                <button className="btn small danger" onClick={() => handleDeleteProduct(p._id)}>Delete</button>
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
