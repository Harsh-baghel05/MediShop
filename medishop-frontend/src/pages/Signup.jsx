import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { signup, loading } = useContext(AuthContext);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const result = await signup(name, email, pass);
    if (result.success) {
      nav('/');
    } else {
      alert(result.error);
    }
  }

  return (
    <div className="section">
      <h2>Signup</h2>
      <form onSubmit={submit}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input placeholder="Password" type="password" value={pass} onChange={e => setPass(e.target.value)} required />
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
    </div>
  );
}
