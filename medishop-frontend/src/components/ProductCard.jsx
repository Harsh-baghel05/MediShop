import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAdd, onToggle }) {
  return (
    <div className="card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="card-img" />
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
