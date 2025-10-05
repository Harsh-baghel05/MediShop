import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../api.js";

export default function EditUser() {
  const { id } = useParams();
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(id);
        setUser(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          role: data.role || "user",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, formData);
      alert("User updated successfully");
      nav("/admin");
    } catch (err) {
      alert("Error updating user: " + err.message);
    }
  };

  if (loading) return <div className="section">Loading...</div>;
  if (error) return <div className="section">Error: {error}</div>;

  return (
    <div className="section">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit} className="edit-user-form">
        <label>
          Name:
          <input name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input name="email" type="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Role:
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button className="btn" type="submit">Update User</button>
      </form>
    </div>
  );
}
