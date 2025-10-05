import React, { useState } from "react";
import { Link } from "react-router-dom";

const fallbackImage = "https://via.placeholder.com/400x300?text=No+Image";

export default function ProductCard({ product, onAdd, onToggle }) {
  const [imgSrc, setImgSrc] = useState(product.image || fallbackImage);

  const handleError = () => {
    setImgSrc(fallbackImage);
  };

  return (
    <div className="card">
      <Link to={`/product/${product._id}`}>
        <img src={imgSrc} alt={product.name} className="card-img" onError={handleError} />
      </Link>
      <div className="card-body">
        <h4>{product.name}</h4>
        <p className="desc">{product.description}</p>
        <div className="price-row">
          <strong>₹{product.price}</strong>
          <div>
            <button className="btn" onClick={() => onAdd(product._id)}>Add</button>
            <button className="btn outline" onClick={() => onToggle(product._id)}>♡</button>
          </div>
        </div>
      </div>
    </div>
  );
}
