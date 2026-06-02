import { useState, useRef, useEffect } from "react";
import api from "../api/axios.js";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { useCart } from "../contexts/CartContext/useCart";
import { useAuth } from "../contexts/AuthContext/useAuth";

const Chatbot = ({ onClose }) => {
  const { user } = useAuth();
  const userId = user?.id;

  // ✅ Initialize with empty array, load per user below
  const [messages, setMessages] = useState([]);

  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const { fetchCart } = useCart();
  const endRef = useRef(null);

  // ✅ Load saved messages for this user
  useEffect(() => {
    if (!userId) {
      setMessages([]);
      return;
    }
    const savedMessages = localStorage.getItem(`chatMessages_${userId}`);
    setMessages(savedMessages ? JSON.parse(savedMessages) : []);
  }, [userId]);

  // Auto scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages, isTyping]);

  // ✅ Save messages whenever they change (per user)
  useEffect(() => {
    if (!userId) return;
    localStorage.setItem(
      `chatMessages_${userId}`,
      JSON.stringify(messages)
    );
  }, [messages, userId]);

  // ✅ Optional clear chat button (for this user only)
  const clearChat = () => {
    setMessages([]);
    if (userId) {
      localStorage.removeItem(`chatMessages_${userId}`);
    }
  };

  const addMessage = async (msg) => {
    setMessages((prev) => [...prev, msg]);
    setSuggestions([]);
    setIsTyping(true);

    try {
      const res = await api.post(
        "/api/chatbot/message",
        { message: msg.message },
        { withCredentials: true }
      );

      const data = res.data;

      const botMessage = {
        sender: "robot",
        message: data.reply,
        products: data.products || [],
      };

      setMessages((prev) => [...prev, botMessage]);

      // Sync cart if chatbot performed cart action
      if (
        data.reply?.toLowerCase().includes("cart")
      ) {
        fetchCart();
      }

      setSuggestions(data.suggestions || []);
    } catch (err) {
      console.log(err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "robot",
          message:
            "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-80 h-100 bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
      {/* HEADER */}
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <span className="text-sm font-medium text-gray-700">
          Assistant
        </span>

        <div className="flex items-center gap-3">
          <button
            onClick={clearChat}
            className="text-xs text-red-500 hover:text-red-700"
          >
            Clear
          </button>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            ✕
          </button>
        </div>
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
        <div className="flex gap-2 px-2 py-1 bg-white overflow-x-auto">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() =>
                addMessage({
                  sender: "user",
                  message: s,
                })
              }
              className="px-3 py-1 text-xs bg-gray-100 rounded-full whitespace-nowrap hover:bg-gray-200"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* INPUT */}
      <div className="px-2 py-2 border-t">
        <ChatInput addMessage={addMessage} />
      </div>
    </div>
  );
};

export default Chatbot;