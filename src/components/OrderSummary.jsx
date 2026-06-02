import { useState } from "react";
import { useCart } from "../contexts/CartContext/useCart";
import ShippingForm from "./ShippingFrom";
import { getTotalItems, getTotalPrice, getShippingCost } from "../utils/cart";
import { formatMoney, totalPriceWithShipping } from "../utils/money";
import { useNavigate } from "react-router";
import api from "../api/axios.js";
const OrderSummary = () => {
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const [shippingType, setShippingType] = useState("standard");
  const { cart, setCart, fetchCart } = useCart();
  const navigate = useNavigate();

  const totalPriceCent = getTotalPrice(cart);
  const totalItems = getTotalItems(cart);
  let totalPrice = totalPriceWithShipping(totalPriceCent, shippingType);

  const [processing, setProcessing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: ""
  });

  const [errors, setErrors] = useState({});

  const cities = ["Lahore", "Karachi", "Islamabad", "Faisalabad", "Multan"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.postalCode) newErrors.postalCode = "Postal code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsAddressSaved(true);
      console.log("Saved Address:", formData);
    }
  };

  const handleShipping = (e) => {
    setShippingType(e.target.value);
  };

  // 🔥 FINAL CHECKOUT FIX
  const handleCheckout = async () => {
    if (processing) return;

    if (!formData.name || !formData.address || !formData.city || !formData.postalCode) {
      return alert("Please save your shipping address first");
    }

    setProcessing(true);

    // 🔥 Optimistic UI
    const previousCart = cart;
    setCart([]);

    try {
      const formattedCart = previousCart.map((item) => ({
        name: item.product.name,
        price: item.product.price,
        image: item.product.image,
        quantity: item.count,
      }));

      const totalAmount = totalPrice;
      const shippingCost = getShippingCost(shippingType);

      // ✅ Place order
      await api.post(
        "/api/orders/placeOrder",
        {
          cart: formattedCart,
          shippingAddress: formData,
          totalAmount,
          shippingCost,
          shippingType,
        },
        { withCredentials: true }
      );

      // ✅ Clear backend cart
      await api.post(
        "/api/cart/clearcart",
        {},
        { withCredentials: true }
      );

      // ✅ Navigate
      navigate("/orders");

    } catch (error) {
      console.error("Checkout error:", error);

      // ❌ rollback if failed
      setCart(previousCart);
    } finally {
      setProcessing(false);

      // 🔄 background sync (keeps things 100% correct)
      fetchCart();
    }
  };

  return (
    <div id="summary" className="w-full sm:w-1/4 md:w-1/2 px-4 py-6">
      <h1 className="font-semibold text-2xl border-b pb-8">Shipping Address</h1>

      {isAddressSaved ? (
        <div className="mt-6 border p-4 text-sm">
          <p className="font-semibold">{formData.name}</p>
          <p>{formData.address}</p>
          <p>{formData.city}</p>
          <p>{formData.postalCode}</p>
          <button
            onClick={() => setIsAddressSaved(false)}
            className="mt-4 bg-gray-500 hover:bg-gray-600 px-4 py-2 text-white text-xs uppercase"
          >
            Change Address
          </button>
        </div>
      ) : (
        <ShippingForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          errors={errors}
          cities={cities}
        />
      )}

      <h1 className="font-semibold text-2xl border-b pb-8 mt-6">
        Order Summary
      </h1>

      <div className="flex justify-between mt-10 mb-5">
        <span className="font-semibold text-sm uppercase">
          Items {totalItems}
        </span>
        <span className="font-semibold text-sm">
          {formatMoney(totalPriceCent)}
        </span>
      </div>

      <div>
        <label className="font-medium inline-block mb-3 text-sm uppercase">
          Shipping
        </label>
        <select
          value={shippingType}
          onChange={handleShipping}
          className="block p-2 text-gray-600 w-full text-sm"
        >
          <option value="standard">Standard shipping - $10.00</option>
          <option value="express">Express shipping - $20.00</option>
        </select>
      </div>

 

   

      <div className="border-t mt-8">
        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
          <span>Total cost</span>
          <span>{formatMoney(totalPrice)}</span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={processing}
          className="bg-indigo-500 disabled:bg-gray-400 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full cursor-pointer"
        >
          {processing ? "Processing..." : "Checkout"}
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;