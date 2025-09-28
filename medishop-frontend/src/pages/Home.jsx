import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import ProductGrid from "./ProductGrid.jsx";
import { CartContext } from "../context/CartContext.jsx";
import { api } from "../api.js";
import { dummyProducts } from "../dummyData.js";

export default function Home() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const f = await api('/products/featured');
        setFeatured(f);
      } catch (e) {
        console.error(e);
        setFeatured(dummyProducts.filter(p => p.featured));
      }
    })();
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1>Leading Online Pharmacy</h1>
          <p>Order your medicine online with us</p>
          <Link to="/shop" className="btn">Get Fast Delivery</Link>
        </div>
        <div className="hero-image">
          <img src="https://picsum.photos/seed/hero/600/400" alt="health" style={{width:360,borderRadius:12}}/>
        </div>
      </section>

      <section className="categories">
        <div className="category-item">
          <div className="category-icon">💊</div>
          <h3>Medicines</h3>
          <Link to="/shop?category=Tablets">Shop Now</Link>
        </div>
        <div className="category-item">
          <div className="category-icon">🥛</div>
          <h3>Vitamins</h3>
          <Link to="/shop?category=Personal Care">Shop Now</Link>
        </div>
        <div className="category-item">
          <div className="category-icon">🩹</div>
          <h3>First Aid</h3>
          <Link to="/shop?category=Devices">Shop Now</Link>
        </div>
        <div className="category-item">
          <div className="category-icon">💊</div>
          <h3>Supplements</h3>
          <Link to="/shop?category=Syrups">Shop Now</Link>
        </div>
      </section>

      <section className="section">
        <h2 style={{ textAlign: 'center' }}>Featured Products</h2>
        <ProductGrid products={featured} />
      </section>

      <section className="section">
        <h2 style={{textAlign:'center'}}>All Products</h2>
        <ProductGrid query={query} />
      </section>
    </>
  );
}
