import { useState } from "react";
import { useCart } from "../contexts/CartContext/useCart.js";
import { formatMoney } from "../utils/money.js";

export default function Card({ product }) {
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 800);
  }

  return (
    <div
      className={`flex flex-col h-full bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden transition hover:shadow-md ${
        !product.inStock ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Top Section */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-slate-800 font-semibold text-base line-clamp-1">
              {product.name}
            </h3>
            <p className="text-cyan-600 font-semibold text-base whitespace-nowrap">
              {formatMoney(product.price)}
            </p>
          </div>

          <p className="text-slate-600 text-sm line-clamp-2 min-h-10">
            {product.description}
          </p>

          {/* Stock Status */}
          {product.inStock !== undefined && (
            <div className="text-sm min-h-5">
              {product.inStock ? (
                <span className="text-green-600 font-medium">
                  ✓ In Stock 
                </span>
              ) : (
                <span className="text-red-600 font-medium">
                  ✕ Out of Stock
                </span>
              )}
            </div>
          )}
        </div>

        {/* Button */}
        <button
          onClick={handleAddToCart}
          className="cursor-pointer mt-4 w-full py-2 px-3 bg-blue-600 text-white text-sm rounded-lg hover:bg-cyan-700 transition active:scale-95"
          type="button"
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}