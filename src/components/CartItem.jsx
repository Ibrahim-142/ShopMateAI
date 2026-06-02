import { formatMoney } from "../utils/money";
import { useCart } from "../contexts/CartContext/useCart";

const CartItem = ({ cartitem }) => {
  const { addToCart, removeFromCart } = useCart();
  const { product } = cartitem;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleRemove = () => {
    removeFromCart(product._id);
  };

  return (
    <div className="flex gap-6 py-8 border-t border-gray-200 hover:bg-gray-50 transition rounded-lg px-4">
      <div className="shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col grow justify-between">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {product.name} ({cartitem.count})
          </h3>
          {product.longDescription && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {product.longDescription}
            </p>
          )}
          {product.inStock !== undefined && (
            <p className="text-sm">
              {product.inStock ? (
                <span className="text-green-600 font-medium">
                  ✓ In Stock ({product.stockCount})
                </span>
              ) : (
                <span className="text-red-600 font-medium">
                  ✕ Out of Stock
                </span>
              )}
            </p>
          )}
          {product.rating !== undefined && (
            <p className="text-sm text-gray-600">
              ⭐ {product.rating} ({product.reviewCount} reviews)
            </p>
          )}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4 text-sm">
            <button
              onClick={handleAddToCart}
              className="text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer"
            >
              Add one
            </button>

            <button
              onClick={handleRemove}
              className="text-red-500 hover:text-red-600 font-medium cursor-pointer"
            >
              Remove
            </button>
          </div>
          <p className="text-lg font-bold text-gray-900">
            {formatMoney(product.price * cartitem.count)}
          </p>

        </div>

      </div>
    </div>
  );
};

export default CartItem;