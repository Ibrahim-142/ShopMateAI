import { useEffect, useState } from "react";
import api from "./api/axios";

import { Routes, Route, useLocation, matchPath } from "react-router";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSearch } from "./contexts/SearchContext/useSearch";
import { useAuth } from "./contexts/AuthContext/useAuth";

import HomePage from "./pages/Homepage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import Chatbot from "./components/Chatbot";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { query } = useSearch();
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const url = query
          ? `/api/products/search?q=${query}`
          : `/api/products`;

        const res = await api.get(url);
        setProducts(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);



  const routes = [
    { path: "/", element: <LoginPage />, public: true },
    { path: "/register", element: <RegisterPage />, public: true },
    {
      path: "/homepage",
      element: <HomePage products={products} loading={loading} />,
      public: false,
    },
    { path: "/checkout", element: <CheckoutPage />, public: false },
    { path: "/orders", element: <OrdersPage />, public: false },
    { path: "/orders/:id", element: <OrderDetailsPage />, public: false },
    { path: "/product/:id", element: <ProductDetailsPage />, public: false },
    { path: "/chatbot", element: <Chatbot />, public: false },
  ];

  const currentRoute = routes.find((r) =>
    matchPath({ path: r.path, end: true }, location.pathname)
  );

  const showNavbar = !!user && currentRoute && !currentRoute.public;

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        {routes.map((r) => {
          const element = r.public ? (
            r.element
          ) : (
            <ProtectedRoute>{r.element}</ProtectedRoute>
          );

          return <Route key={r.path} path={r.path} element={element} />;
        })}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;