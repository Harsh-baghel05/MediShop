import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loginType, setLoginType] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { login, loading, logout } = useContext(AuthContext);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const result = await login(email, pass);
    if (result.success) {
      if (result.user.role !== loginType) {
        alert(`Access denied: You do not have ${loginType} permissions.`);
        logout();
        return;
      }
      nav(loginType === 'admin' ? '/admin' : '/shop');
    } else {
      alert(result.error);
    }
  }

  function handleLoginType(type) {
    setLoginType(type);
    setShowForm(true);
  }

  if (!showForm) {
    return (
      <div className="section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <h2>Login as</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn" onClick={() => handleLoginType('user')}>
            User
          </button>
          <button className="btn" onClick={() => handleLoginType('admin')}>
            Admin
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <h2>Login as {loginType}</h2>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ marginBottom: '10px', width: '100%', maxWidth: '300px' }} />
        <input placeholder="Password" type="password" value={pass} onChange={e => setPass(e.target.value)} required style={{ marginBottom: '10px', width: '100%', maxWidth: '300px' }} />
        <button className="btn" type="submit" disabled={loading} style={{ marginBottom: '10px', width: '100%', maxWidth: '300px' }}>
          {loading ? 'Logging in...' : `Login as ${loginType}`}
        </button>
        <button type="button" className="btn" onClick={() => { setShowForm(false); setLoginType(null); }} style={{ width: '100%', maxWidth: '300px' }}>
          Change Type
        </button>
      </form>
    </div>
  );
}
