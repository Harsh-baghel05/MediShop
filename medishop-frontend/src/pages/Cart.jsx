import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";

export default function Cart() {
  const { cart, removeFromCart, loading } = useContext(CartContext);

  const total = cart.reduce((s, it) => s + (it.productId.price * it.qty), 0);

  return (
    <div className="section">
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        <>
          <div className="side-list">
            {cart.map(it => (
              <div className="item-row" key={it.productId._id}>
                <img src={it.productId.image} alt={it.productId.name} />
                <div style={{ flex: 1 }}>
                  <h4>{it.productId.name}</h4>
                  <p>Qty: {it.qty}</p>
                </div>
                <div>
                  <strong>₹{it.productId.price * it.qty}</strong>
                  <div><button className="btn outline" onClick={() => removeFromCart(it.productId._id)} disabled={loading}>Remove</button></div>
                </div>
              </div>
            ))}
          </div>
          <div className="total-row">
            <h3>Total: ₹{total}</h3>
            <p>Payment option: Cash on Delivery (COD) available</p>
            <Link to="/checkout" className="btn">Proceed to Checkout</Link>
          </div>
        </>
      )}
    </div>
  );
}
