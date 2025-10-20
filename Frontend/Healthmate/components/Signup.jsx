// import React, { useState } from "react";

// export default function Signup({ onNavigate }) {
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       console.log("Status:", res.status, "OK:", res.ok);
//       console.log("Response body:", data);

//       if (res.ok && data.user) {
//         localStorage.setItem("user", JSON.stringify(data.user));
//         alert("Signup successful!");
//         onNavigate("dashboard");
//       } else {
//         alert(data.message || "Signup failed. Try again.");
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       alert("Signup failed. Check the console for details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
//           Sign Up
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <button
//             type="submit"
//             className={`w-full py-2 rounded-lg text-white ${
//               loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
//             } transition`}
//             disabled={loading}
//           >
//             {loading ? "Signing up..." : "Sign Up"}
//           </button>
//         </form>
//         <p className="text-sm text-center text-gray-600 mt-4">
//           Already have an account?{" "}
//           <span
//             className="text-blue-500 hover:underline cursor-pointer"
//             onClick={() => onNavigate("login")}
//           >
//             Log in
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }










import React, { useState } from "react";
import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can call your backend API for signup
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-orange-50 flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-2 rounded-full">
            <span className="text-white font-bold text-lg">❤</span>
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-800">HealthMate</h1>
            <p className="text-sm text-gray-500 -mt-1">Sehat ka Smart Dost</p>
          </div>
        </div>

        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <a href="#home" className="hover:text-pink-500 transition">Home</a>
          <a href="#pricing" className="hover:text-pink-500 transition">Pricing</a>
          <a href="#contact" className="hover:text-pink-500 transition">Contact</a>
        </div>

        {/* <Link
          to="/login"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold hover:opacity-90 transition"
        >
          Sign in
        </Link> */}
      </nav>

      {/* Signup Section */}
      <div className="flex flex-col md:flex-row items-start justify-center flex-1 px-6 md:px-20 py-10 gap-10">
        {/* Left Side Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Create your account
          </h2>
          <p className="text-gray-600 mb-6">
            One place for reports, vitals, and AI insights.{" "}
            <span className="text-pink-600 font-semibold">Bilkul asaan.</span>
          </p>

          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-pink-500 mt-1">📄</span>
              <span>Upload PDFs & photos of reports — Gemini explains in EN + Roman Urdu.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">📊</span>
              <span>Track manual <b>Vitals</b> (BP, Sugar, Weight) with reminders.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">🔒</span>
              <span>Privacy-first: encrypted storage, signed links for doctors.</span>
            </li>
          </ul>

          <div className="mt-6 p-4 bg-pink-50 border border-pink-200 rounded-lg flex items-start gap-2">
            <span className="text-pink-500 mt-1">📍</span>
            <p className="text-gray-700 text-sm">
              <strong>We respect your privacy:</strong> HealthMate shares nothing without your permission. You own your data.
            </p>
          </div>
        </motion.div>

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Ayesha Khan"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Strength: <span className="text-pink-500">{formData.password.length >= 8 ? "Good" : "Weak"}</span>
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
                required
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="mt-1"
                required
              />
              <label className="text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-pink-500 font-semibold hover:underline">
                  Terms & Privacy
                </a>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold hover:opacity-90 transition"
            >
              Create account
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-pink-500 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-4 text-sm">
        © 2025 HealthMate
      </footer>
    </div>
  );
}

