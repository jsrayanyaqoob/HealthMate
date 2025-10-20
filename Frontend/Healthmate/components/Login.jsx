import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Login() {
  const navigate = useNavigate();


  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    navigate("/dashboard");
  }
}, []);


  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Check the console.");
    }
  };

  return (

    <>
    {/* <body className="overflow-hidden"> */}

    <Navbar place="/signup" btnText="Create account"  />

    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-white to-gray-100 px-4 pb-25">
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center rounded-2xl shadow-lg">
        {/* Left Section */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back</h1>
          <p className="text-gray-600 mb-6">
            Sign in to manage your reports, vitals, and AI insights.{" "}
            <span className="text-pink-500 font-semibold">Phir se shuru karein.</span>
          </p>

          <div className="p-4 border rounded-lg flex items-start gap-2 bg-pink-50">
            <span className="text-pink-600 text-xl">🛡</span>
            <div>
              <h3 className="font-semibold text-pink-600">Your data stays yours</h3>
              <p className="text-sm text-gray-600">
                Encrypted storage and doctor-only links. Privacy pe full focus.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8 bg-gray-50">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <div className="flex items-center border rounded-lg px-3">
                <span className="text-gray-400 mr-2">📧</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full py-2 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <div className="flex items-center border rounded-lg px-3">
                <span className="text-gray-400 mr-2">🔒</span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  required
                  className="w-full py-2 outline-none"
                />
              </div>
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="accent-pink-500"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-pink-500 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-medium rounded-lg hover:opacity-90 transition"
            >
              Sign in →
            </button>

            {/* Signup Link */}
            <p className="text-center text-sm text-gray-600">
              New here?{" "}
              <Link to="/signup" className="text-pink-500 hover:underline font-medium">
                Create account
              </Link>
            </p>
          </form>
          </div>
        </div>
      </div>
      {/* </body> */}
      </>
  );
}
