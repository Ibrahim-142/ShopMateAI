import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { calculateOrderSubtotal } from "../utils/order.js";
import { formatMoney } from "../utils/money.js";
import { useToast } from "../contexts/ToastContext/useToast.js";
import api from "../api/axios.js";
const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { addToast } = useToast();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/api/orders/${id}`, {
          withCredentials: true,
        });
        setOrder(res.data);
      } catch (err) {
        console.error(err);

        if (err.response?.status === 403) {
          addToast("You are not authorized to view this order", "error"); // show toast
          navigate("/orders"); // redirect
        } else if (err.response?.status === 404) {
          setError("Order not found");
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false); // prevent infinite loading
      }
    };

    fetchOrder();
  }, [id, navigate, addToast]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (error) return <p className="text-center py-20">{error}</p>;
  if (!order) return null;

  const subTotal = calculateOrderSubtotal(order.cart || []);

  return (
    <section className="py-24 relative bg-gray-100">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full flex-col justify-start items-start gap-12 inline-flex">
          {/* Header */}
          <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-6 sm:gap-12">
            {/* Order Info */}
            <div className="flex flex-col sm:items-start items-center gap-2">
              <h2 className="text-gray-500 font-semibold font-manrope">
                Order# <span className="text-indigo-600">{order._id.slice(-6).toUpperCase()}</span>
              </h2>
              <p className="text-gray-500 text-base font-medium leading-relaxed">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Shipping Address */}
            <div className="flex flex-col sm:items-start items-center gap-2 max-w-full sm:max-w-xs">
              <h6 className="text-gray-500 text-base font-normal leading-relaxed">Shipping Address</h6>
              <p className="text-gray-900 text-base font-medium leading-relaxed text-center sm:text-left">
                {order.shippingAddress.name}, {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="w-full p-8 bg-white rounded-xl flex-col justify-start items-start gap-5 flex mt-8">
            <h2 className="w-full text-gray-900 text-2xl font-semibold font-manrope leading-9 pb-5 border-b border-gray-200">
              Order Items
            </h2>

            <div className="w-full flex-col justify-start items-start gap-5 flex pb-5 border-b border-gray-200">
              {order.cart.map((item, idx) => (
                <div key={idx} className="w-full justify-start items-center lg:gap-8 gap-4 grid md:grid-cols-12 grid-cols-1">
                  <div className="md:col-span-8 col-span-12 w-full justify-start items-center lg:gap-5 gap-4 flex md:flex-row flex-col">
                    <img
                      className="rounded-md h-40 w-40 object-cover shrink-0"
                      src={item.image}
                      alt={item.name}
                    />
                    <div className="w-full flex-col justify-start md:items-start items-center gap-3 inline-flex">
                      <h4 className="text-gray-900 text-xl font-medium leading-8">{item.name}</h4>
                    </div>
                  </div>
                  <div className="md:col-span-4 col-span-12 justify-between items-center gap-4 flex md:flex-row flex-col">
                    <h4 className="text-gray-500 text-xl font-semibold leading-8">{formatMoney(item.price)} x {item.quantity}</h4>
                    <h4 className="text-gray-900 text-xl font-semibold leading-8">{formatMoney(item.price * item.quantity)}</h4>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="w-full flex-col justify-start items-start gap-5 flex">
              <div className="w-full pb-1.5 flex-col justify-start items-start gap-4 flex">
                <div className="w-full justify-between items-start gap-6 inline-flex">
                  <h6 className="text-gray-500 text-base font-normal leading-relaxed">Subtotal</h6>
                  <h6 className="text-right text-gray-500 text-base font-medium leading-relaxed">{formatMoney(subTotal)}</h6>
                </div>
                <div className="w-full justify-between items-start gap-6 inline-flex">
                  <h6 className="text-gray-500 text-base font-normal leading-relaxed">Shipping Charge</h6>
                  <h6 className="text-right text-gray-500 text-base font-medium leading-relaxed">{formatMoney(order.shippingCost)}</h6>
                </div>
                <div className="w-full justify-between items-start gap-6 inline-flex">
                  <h6 className="text-gray-500 text-base font-normal leading-relaxed">Shipping Type</h6>
                  <h6 className="text-right text-gray-500 text-base font-medium leading-relaxed">
                    {order.shippingType.charAt(0).toUpperCase() + order.shippingType.slice(1)}
                  </h6>
                </div>
              </div>
              <div className="w-full justify-between items-start gap-6 inline-flex">
                <h5 className="text-gray-900 text-lg font-semibold leading-relaxed">Total</h5>
                <h5 className="text-right text-gray-900 text-lg font-semibold leading-relaxed">{formatMoney(order.totalAmount)}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetailsPage;