import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext/useAuth";
import { Link } from "react-router";

export default function Login() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false); // ✅ local UI state

  const { login } = useAuth(); // ✅ no longer using global loading

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSubmitting(true);

    try {
      await login(form);
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            ShopMate
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            A helpful Chatbot that assists shopping
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Welcome back
          </h2>

          <p className="text-center text-sm text-gray-500 mt-1 mb-6">
            Login to continue shopping
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="identifier"
              placeholder="Username or Email"
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white p-3 rounded-lg font-semibold tracking-wide transition disabled:opacity-50 flex items-center justify-center shadow-md"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>

            {message && (
              <p className="text-center text-sm text-red-500">{message}</p>
            )}
          </form>

          <div className="mt-4 text-center text-xs text-gray-500">
            💬 Need help? Our shopping assistant is available after login
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm">
            <p className="font-semibold text-blue-700 mb-2 text-center">
              Demo Accounts
            </p>

            <div className="space-y-2 text-gray-700 text-sm">
              <div className="flex justify-between">
                <span>Email:</span>
                <span className="font-mono">user1@prod.com</span>
              </div>

              <div className="flex justify-between">
                <span>Username:</span>
                <span className="font-mono">user1</span>
              </div>

              <div className="flex justify-between">
                <span>Password:</span>
                <span className="font-mono">a1234</span>
              </div>

              <hr className="my-4 border-gray-400" />

              <div className="flex justify-between">
                <span>Email:</span>
                <span className="font-mono">user2@prod.com</span>
              </div>

              <div className="flex justify-between">
                <span>Username:</span>
                <span className="font-mono">user2</span>
              </div>

              <div className="flex justify-between">
                <span>Password:</span>
                <span className="font-mono">a1234</span>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}