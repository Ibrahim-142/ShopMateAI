import React, { useState, useEffect,useCallback } from "react";
import api from "../../api/axios.js"
import { CartContext } from "./CartContext.js";
import { useAuth} from "../AuthContext/useAuth.js";

export const CartProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Deduplicate cart items by product ID
  const deduplicateCart = (cartArray) => {
    const map = new Map();
    cartArray.forEach((item) => {
      const id = item.product._id;
      if (map.has(id)) {
        map.get(id).count += item.count; // merge counts
      } else {
        map.set(id, { ...item });
      }
    });
    return Array.from(map.values());
  };

  // 🔹 Fetch cart from backend
  const fetchCart = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await api.get("/api/cart", { withCredentials: true });
      setCart(deduplicateCart(res.data)); // ✅ replace & deduplicate
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // 🔹 Fetch cart when user is loaded
  useEffect(() => {
    if (!authLoading && user) {
      fetchCart();
    }
  }, [authLoading, user, fetchCart]);

  // 🔹 Clear cart on logout
  useEffect(() => {
    if (!user) setCart([]);
  }, [user]);

  // 🔹 Total items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.count, 0);

  // 🔹 Add product to cart (optimistic)
  const addToCart = async (product, count = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product._id === product._id);
      if (existing) {
        return prev.map((i) =>
          i.product._id === product._id
            ? { ...i, count: i.count + count }
            : i
        );
      }
      return [...prev, { product, count }];
    });

    try {
      await api.post(
        "/api/cart/addtocart",
        { product: product._id, count },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Add failed, syncing cart...", error);
      fetchCart(); // rollback
    }
  };

  // 🔹 Remove product from cart (optimistic)
  const removeFromCart = async (productId, count = 1) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.product._id === productId
            ? { ...i, count: i.count - count }
            : i
        )
        .filter((i) => i.count > 0)
    );

    try {
      await api.post(
        "/api/cart/removefromcart",
        { productId },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Remove failed, syncing cart...", error);
      fetchCart(); // rollback
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        totalItems,
        loading,
        addToCart,
        removeFromCart,
        fetchCart, // optional for manual refresh
      }}
    >
      {children}
    </CartContext.Provider>
  );
};