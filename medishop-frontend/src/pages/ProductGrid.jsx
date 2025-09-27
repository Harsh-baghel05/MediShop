import React, { useEffect, useState, useContext } from "react";
import { getProducts } from "../api.js";
import ProductCard from "../components/ProductCard.jsx";
import { CartContext } from "../context/CartContext.jsx";

export default function ProductGrid({ products, limit, query }) {
  const [list, setList] = useState([]);
  const { addToCart, toggleWishlist } = useContext(CartContext);

  useEffect(() => {
    if (products) {
      setList(products);
    } else {
      fetchProducts();
    }
  }, [products]);

  async function fetchProducts() {
    try {
      const data = await getProducts();
      setList(data);
    } catch (e) {
      console.error('Fetch products error', e);
    }
  }

  let filtered = list;
  if (query) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  }

  const shown = limit ? filtered.slice(0, limit) : filtered;
  return (
    <div className="grid">
      {shown.length === 0 ? <p>No products found</p> : shown.map(p => <ProductCard key={p._id} product={p} onAdd={addToCart} onToggle={toggleWishlist} />)}
    </div>
  );
}
