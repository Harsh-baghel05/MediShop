import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { login, loading } = useContext(AuthContext);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const result = await login(email, pass);
    if (result.success) {
      nav('/');
    } else {
      alert(result.error);
    }
  }

  return (
    <div className="section">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input placeholder="Password" type="password" value={pass} onChange={e => setPass(e.target.value)} required />
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
