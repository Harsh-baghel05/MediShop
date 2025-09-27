import React, { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";

export default function Wishlist() {
  const { wishlist, toggleWishlist, loading } = useContext(CartContext);

  return (
    <div className="section">
      <h2>Your Wishlist</h2>
      <div className="side-list">
        {wishlist.map(it => (
          <div className="item-row" key={it.productId._id}>
            <img src={it.productId.image} alt="" />
            <div style={{ flex: 1 }}>
              <h4>{it.productId.name}</h4>
              <p>₹{it.productId.price}</p>
            </div>
            <div><button className="btn" onClick={() => toggleWishlist(it.productId._id)} disabled={loading}>Remove</button></div>
          </div>
        ))}
        {wishlist.length === 0 && <p>No items</p>}
      </div>
    </div>
  );
}
