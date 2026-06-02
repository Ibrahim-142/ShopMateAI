import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext/useAuth";
import { Link } from "react-router";

function Register() {
  const { register } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await register(form);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 px-4">

      <div className="w-full max-w-md">

        {/* Brand Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            ShopMate
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create your account to start shopping
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-gray-100 space-y-4"
        >

          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Create account
          </h2>

          <p className="text-center text-sm text-gray-500 mb-4">
            Our shopping asssistant is available after registration
          </p>

          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 bg-white/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
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
            disabled={loading}
            className="w-full bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white p-3 rounded-lg font-semibold tracking-wide transition disabled:opacity-50 flex items-center justify-center shadow-md"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Creating account...
              </span>
            ) : (
              "Create account"
            )}
          </button>

          {message && (
            <p className="text-center text-sm text-red-500">{message}</p>
          )}

          {/* Login Redirect */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Register;