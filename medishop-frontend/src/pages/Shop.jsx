import React, { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { getProducts } from "../api.js";
import { CartContext } from "../context/CartContext.jsx";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");
  const { addToCart, toggleWishlist } = useContext(CartContext);
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'All';

  useEffect(() => { fetchProducts(); }, []);

  useEffect(() => {
    if (category !== 'All') {
      setFilter(category);
    }
  }, [category]);

  async function fetchProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (e) { console.error(e); }
  }

  const list = products.filter(p => {
    if (filter !== 'All' && p.category !== filter) return false;
    if (query.trim() && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="section">
      <div className="shop-controls">
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid">
        {list.length === 0 ? <p>No products found</p> : list.map(p => (
          <ProductCard key={p._id} product={p} onAdd={addToCart} onToggle={toggleWishlist} />
        ))}
      </div>
    </div>
  );
}
