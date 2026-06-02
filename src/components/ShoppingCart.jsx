import React from "react";
import { Link } from "react-router";
import CartItem from "./CartItem";
import { useCart } from "../contexts/CartContext/useCart";
const ShoppingCart = () => {
  const { cart,totalItems,addToCart } = useCart();
  return (
    <div className="w-full sm:w-3/4 bg-white px-4 sm:px-10 py-6">
      {/* Header */}
      <div className="flex justify-between border-b pb-8">
        <h1 className="font-semibold text-2xl">Shopping Cart</h1>
        <h2 className="font-semibold text-2xl">
          {totalItems}{" "}
          {totalItems === 1 ? "Item" : "Items"}
        </h2>
      </div>
      {cart.map((item,index) => (
        <CartItem key={index} addToCart={addToCart}  cartitem={item} />
      ))}
      {/* Empty Cart State */}
      {cart.length === 0 && (
        <div className="py-10 text-center text-gray-500">
          Your cart is empty.
        </div>
      )}
      {/* Continue Shopping */}
      <Link
        to="/homepage"
        className="flex font-semibold text-indigo-600 text-sm mt-6"
      >
        <svg
          className="fill-current mr-2 w-4"
          viewBox="0 0 448 512"
        >
          <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
        </svg>
        Continue Shopping
      </Link>
    </div>
  );
};

export default ShoppingCart;