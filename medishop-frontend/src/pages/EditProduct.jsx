import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../api.js";

export default function EditProduct() {
  const { id } = useParams();
  const nav = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    featured: false,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setFormData({
          name: data.name || "",
          price: data.price || "",
          description: data.description || "",
          category: data.category || "",
          stock: data.stock || "",
          featured: data.featured || false,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, formData);
      alert("Product updated successfully");
      nav("/admin");
    } catch (err) {
      alert("Error updating product: " + err.message);
    }
  };

  if (loading) return <div className="section">Loading...</div>;
  if (error) return <div className="section">Error: {error}</div>;

  return (
    <div className="section">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} className="edit-product-form">
        <label>
          Name:
          <input name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Price:
          <input name="price" type="number" value={formData.price} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <label>
          Category:
          <input name="category" value={formData.category} onChange={handleChange} />
        </label>
        <label>
          Stock:
          <input name="stock" type="number" value={formData.stock} onChange={handleChange} />
        </label>
        <label>
          Featured:
          <input name="featured" type="checkbox" checked={formData.featured} onChange={handleChange} />
        </label>
        <button className="btn" type="submit">Update Product</button>
      </form>
    </div>
  );
}
