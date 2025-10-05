import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api.js";
import { CartContext } from "../context/CartContext.jsx";

const fallbackImage = "https://via.placeholder.com/400x400?text=No+Image";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [imgSrc, setImgSrc] = useState(fallbackImage);
  const { addToCart, toggleWishlist } = useContext(CartContext);

  useEffect(() => {
    (async () => {
      try {
        const p = await getProduct(id);
        setProduct(p);
        setImgSrc(p.image || fallbackImage);
      } catch (e) { console.error(e); }
    })();
  }, [id]);

  const handleError = () => {
    setImgSrc(fallbackImage);
  };

  if (!product) return <div className="section"><p className="loading">Loading...</p></div>;

  return (
    <div className="product-detail">
      <img src={imgSrc} alt={product.name} onError={handleError} />
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
