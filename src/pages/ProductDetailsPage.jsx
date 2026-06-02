import React from "react";
import { useCart } from "../contexts/CartContext/useCart";
import CartItem from "../components/CartItem";

const ProductDetailsPage = () => {
  const { cart } = useCart();

  return (
    <div className="flex">
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        cart.map((cartitem) => (
          <CartItem
            key={`${cartitem.product._id}-${cartitem.color}-${cartitem.size}`}
            cartitem={cartitem}
          />
        ))
      )}
    </div>
  );
};

export default ProductDetailsPage;
