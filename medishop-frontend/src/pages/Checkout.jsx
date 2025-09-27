import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Checkout() {
  const { cart, removeFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    payment: "COD" // Default to Cash on Delivery
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.productId.price * item.qty), 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate order placement (console log for now; could add API call)
    const order = {
      ...formData,
      items: cart,
      total,
      date: new Date().toISOString(),
      status: "Pending"
    };
    console.log("Order Placed:", order);
    // Clear cart
    cart.forEach(item => removeFromCart(item.productId._id));
    setSuccess(true);
    setLoading(false);
    // Redirect to home after 3s
    setTimeout(() => navigate("/"), 3000);
  };

  if (success) {
    return (
      <div className="section">
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your order. Delivery via Cash on Delivery. You'll receive a confirmation soon.</p>
      </div>
    );
  }

  return (
    <div className="section">
      <h2>Checkout</h2>
      <div className="product-detail">
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="side-list">
            {cart.map(item => (
              <div key={item.productId._id} className="item-row">
                <img src={item.productId.image} alt={item.productId.name} />
                <div>
                  <h4>{item.productId.name}</h4>
                  <p>Qty: {item.qty} | ₹{item.productId.price * item.qty}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="total">
            <strong>Total: ₹{total}</strong>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <h3>Delivery Details</h3>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
          <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
          <input type="text" name="city" placeholder="City" onChange={handleChange} required />
          <input type="text" name="state" placeholder="State" onChange={handleChange} required />
          <input type="text" name="zip" placeholder="ZIP Code" onChange={handleChange} required />

          <h3>Payment Method</h3>
          <select name="payment" value={formData.payment} onChange={handleChange} required>
            <option value="COD">Cash on Delivery</option>
            <option value="card">Credit/Debit Card</option>
          </select>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Processing..." : `Place Order - ₹${total}`}
          </button>
        </form>
      </div>
    </div>
  );
}
