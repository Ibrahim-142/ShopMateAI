import { useState, useEffect } from "react";
import { formatMoney } from "../utils/money";
import { useNavigate } from "react-router";
import api from "../api/axios.js";
const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/api/orders", { withCredentials: true })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pre-order":
        return "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300";
      case "Processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Delivered":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "";
    }
  };

  // 🔥 Filter logic
  const filteredOrders =
    selectedStatus === "All"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-7xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              My orders
            </h2>

            <div className="mt-6 sm:mt-0">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="block w-full min-w-40 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              >
                <option value="All">All orders</option>
                <option value="Processing">Processing</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flow-root sm:mt-8">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.length === 0 && (
                <p className="py-6 text-center text-gray-500">
                  No orders found.
                </p>
              )}

              {filteredOrders.map((order, index) => (
                <div
                  key={index}
                  className="flex flex-wrap items-center gap-y-4 py-6"
                >
                  <dl className="w-1/2 sm:w-1/4 lg:flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                      Order ID:
                    </dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                      {order._id.slice(-6).toUpperCase()}
                    </dd>
                  </dl>

                  <dl className="w-1/2 sm:w-1/4 lg:flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                      Date:
                    </dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </dd>
                  </dl>

                  <dl className="w-1/2 sm:w-1/4 lg:flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                      Price:
                    </dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                      {formatMoney(order.totalAmount)}
                    </dd>
                  </dl>

                  <dl className="w-1/2 sm:w-1/4 lg:flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                      Status:
                    </dt>
                    <dd
                      className={`me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </dd>
                  </dl>

                  <div className="w-full lg:flex lg:w-40 lg:items-center lg:justify-center">
                    <button
                      onClick={() => navigate(`/orders/${order._id}`)}
                      className="w-full inline-flex cursor-pointer justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 lg:w-auto"
                    >
                      View details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrdersPage;