import { useState, useRef, useEffect } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { useCart } from "../contexts/CartContext/useCart";
import api from "../api/axios.js";
const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const { fetchCart } = useCart();
  const endRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages, isTyping]);

  const addMessage = async (msg) => {
    setMessages((prev) => [...prev, msg]);
    setSuggestions([]);
    setIsTyping(true);

    try {
      const res = await api.post(
        "/api/chatbot",
        { message: msg.message },
        { withCredentials: true }
      );

      const data = res.data;

      // BOT MESSAGE
      setMessages((prev) => [
        ...prev,
        {
          sender: "robot",
          message: data.message,
          products: data.data || [],
        },
      ]);

      // ✅ CART SYNC (Option B)
      if (data.message?.includes("added to cart")) {
        fetchCart();
      }

      // SUGGESTIONS
      setSuggestions(data.suggestions || []);
    } catch (err) {
      console.log(err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "robot",
          message: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-80 h-100 bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
      
      {/* HEADER */}
      <div className="flex justify-between items-center px-4 py-3">
        <span className="text-sm font-medium text-gray-700">
          Assistant
        </span>

        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          ✕
        </button>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3 bg-gray-50">
        {messages.length === 0 && (
          <p className="text-xs text-gray-400 text-center mt-10">
            Ask something like "add shoes" or "show shirts"
          </p>
        )}

        {messages.map((m, i) => (
          <ChatMessage key={i} {...m} />
        ))}

        {isTyping && (
          <p className="text-xs text-gray-400 px-2">
            Assistant is typing...
          </p>
        )}

        <div ref={endRef} />
      </div>

      {/* SUGGESTIONS */}
      {suggestions.length > 0 && (
        <div className="flex gap-2 px-2 py-1  bg-white">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() =>
                addMessage({ sender: "user", message: s })
              }
              className="px-3 py-1 text-xs bg-gray-100 rounded-full whitespace-nowrap hover:bg-gray-200"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* INPUT */}
      <div className="px-2 py-2">
        <ChatInput addMessage={addMessage} />
      </div>
    </div>
  );
};

export default Chatbot;