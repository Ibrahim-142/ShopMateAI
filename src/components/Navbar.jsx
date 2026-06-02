import {
  Search,
  ShoppingCart,
  Package,
  Home as HomeIcon,
  LogOut,
  Bot,
} from "lucide-react";

import { useSearch } from "../contexts/SearchContext/useSearch";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useCart } from "../contexts/CartContext/useCart";
import { useAuth } from "../contexts/AuthContext/useAuth";
import Chatbot from "./Chatbot";

const Navbar = () => {
  const { totalItems } = useCart();
  const { logout } = useAuth();

  const { setQuery } = useSearch();

  const [input, setInput] = useState("");
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => setShowChatbot((prev) => !prev);

  // 🔍 Debounced live search
  useEffect(() => {
    const delay = setTimeout(() => {
      setQuery(input);
    }, 400);

    return () => clearTimeout(delay);
  }, [input, setQuery]);

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50 text-slate-800 px-6 py-4 flex items-center gap-4">

        {/* LEFT */}
        <div className="shrink-0 flex items-center">
          <Link
            to="/homepage"
            className="flex items-center gap-2 ml-4 mr-6 font-bold text-lg hover:text-blue-600 transition"
          >
            <HomeIcon size={20} />
            Home
          </Link>

          <button
            onClick={toggleChatbot}
            className="cursor-pointer flex items-center gap-2 hover:text-blue-600 transition"
          >
            <Bot size={24} />
          </button>
        </div>

        {/* MIDDLE (SEARCH) */}
        <div className="flex justify-center w-full px-2">
          <div className="flex w-full max-w-2xl">
            <input
              type="search"
              placeholder="Search products..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 min-w-0 bg-white px-4 py-3 text-slate-600 text-base rounded-l-lg outline-none border border-slate-300 focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={() => setQuery(input)}
              className="flex items-center justify-center px-5 bg-blue-700 rounded-r-lg hover:bg-blue-800 transition"
            >
              <Search size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex gap-6 font-semibold items-center shrink-0">

          <Link
            to="/orders"
            className="flex items-center gap-2 hover:text-blue-600 transition"
          >
            <Package size={22} />
            <span className="hidden sm:inline">Orders</span>
          </Link>

          <Link
            to="/checkout"
            className="relative flex items-center gap-2 hover:text-blue-600 transition"
          >
            <ShoppingCart size={25} />
            <span className="hidden sm:inline">Cart</span>

            <p className="absolute -top-3.5 left-1 font-bold rounded-full flex items-center justify-center text-xs bg-blue-700 text-white w-5 h-5">
              {totalItems || 0}
            </p>
          </Link>

          <button
            onClick={logout}
            className="cursor-pointer flex items-center gap-2 hover:text-red-600 transition"
          >
            <LogOut size={22} />
            <span className="hidden sm:inline">Logout</span>
          </button>

        </div>
      </nav>

      {/* CHATBOT */}
      {showChatbot && (
        <div className="fixed top-20 left-0 z-50">
          <Chatbot onClose={toggleChatbot} />
        </div>
      )}
    </>
  );
};

export default Navbar;