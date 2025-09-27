import React, { createContext, useState, useEffect, useContext } from "react";
import { getCart, addToCart as apiAddToCart, removeFromCart, getWishlist, toggleWishlist } from "../api";
import { AuthContext } from "./AuthContext.jsx";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      loadCart();
      loadWishlist();
    } else {
      setCart([]);
      setWishlist([]);
    }
  }, [user]);

  const loadCart = async () => {
    try {
      const data = await getCart();
      setCart(data.items || []);
    } catch (err) {
      console.error('Failed to load cart:', err);
    }
  };

  const loadWishlist = async () => {
    try {
      const data = await getWishlist();
      setWishlist(data.items || []);
    } catch (err) {
      console.error('Failed to load wishlist:', err);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!user) return;
    setLoading(true);
    try {
      await apiAddToCart(productId);
      await loadCart();
    } catch (err) {
      console.error('Failed to add to cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    if (!user) return;
    setLoading(true);
    try {
      await removeFromCart(productId);
      await loadCart();
    } catch (err) {
      console.error('Failed to remove from cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleWishlist = async (productId) => {
    if (!user) return;
    setLoading(true);
    try {
      await toggleWishlist(productId);
      await loadWishlist();
    } catch (err) {
      console.error('Failed to toggle wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      wishlist,
      addToCart: handleAddToCart,
      removeFromCart: handleRemoveFromCart,
      toggleWishlist: handleToggleWishlist,
      loading
    }}>
      {children}
    </CartContext.Provider>
  );
}
