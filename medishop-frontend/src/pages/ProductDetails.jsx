import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api.js";
import { CartContext } from "../context/CartContext.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, toggleWishlist } = useContext(CartContext);

  useEffect(() => {
    (async () => {
      try {
        const p = await getProduct(id);
        setProduct(p);
      } catch (e) { console.error(e); }
    })();
  }, [id]);

  if (!product) return <div className="section"><p className="loading">Loading...</p></div>;

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="desc">{product.description}</p>
        <div className="price-row">
          <span className="price">₹{product.price}</span>
          <span>Stock: {product.stock}</span>
        </div>
        <div className="price-row">
          <button className="btn" onClick={() => addToCart(id)}>Add to Cart</button>
          <button className="btn outline" onClick={() => toggleWishlist(id)}>Add to Wishlist</button>
        </div>
      </div>
    </div>
  );
}
