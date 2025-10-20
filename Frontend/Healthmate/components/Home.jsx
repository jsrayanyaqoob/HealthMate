import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-orange-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5">
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
          <a href="#features" className="hover:text-pink-500 transition">Features</a>
          <a href="#how" className="hover:text-pink-500 transition">How it works</a>
          <a href="#faq" className="hover:text-pink-500 transition">FAQ</a>
          <a href="#start" className="hover:text-pink-500 transition">Get started</a>
        </div>

        <div className="flex space-x-3">
          <button
            className="px-4 py-2 rounded-lg border border-pink-500 text-pink-500 font-semibold hover:bg-pink-50 transition"
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold hover:opacity-90 transition"
            onClick={() => navigate("/signup")}
          >
            Create account
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center mt-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block mb-4 px-4 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-medium">
            🌟 AI-powered Health Companion
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight mb-4">
            Manage your <span className="text-pink-500">health, reports</span> &{" "}
            <span className="text-orange-500"> <br /> vitals</span> — beautifully
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Upload your medical reports, get AI-powered explanations, and track your vitals — 
            all in one colorful, easy <br /> experience.
          </p>

          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold hover:opacity-90 transition">
              Start free
            </button>
            <button className="px-6 py-3 rounded-lg border border-pink-500 text-pink-500 font-semibold hover:bg-pink-50 transition">
              View live demo
            </button>
          </div>
        </motion.div>
      </section>

      {/* Why You'll Love Section */}
      <section id="features" className="mt-24 px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Why you'll love HealthMate
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-12">
          Simple, vibrant, and secure — designed for families and caregivers.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center"
          >
            <div className="bg-pink-100 text-pink-500 p-3 rounded-full mb-4">
              📄
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Report Upload</h3>
            <p className="text-gray-600 text-center">
              Upload PDFs & photos of reports — Gemini explains in EN + Roman Urdu.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center"
          >
            <div className="bg-green-100 text-green-500 p-3 rounded-full mb-4">
              📊
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Vitals</h3>
            <p className="text-gray-600 text-center">
              Track BP, Sugar, Weight with reminders and insights to stay healthy.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center"
          >
            <div className="bg-orange-100 text-orange-500 p-3 rounded-full mb-4">
              🔒
            </div>
            <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
            <p className="text-gray-600 text-center">
              Encrypted storage, signed links for doctors — your data stays yours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="how" className="mt-24 px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          How HealthMate Works
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl shadow-lg p-6">
            <div className="bg-pink-100 text-pink-500 p-3 rounded-full mb-4 w-max mx-auto">
              1️⃣
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload Reports</h3>
            <p className="text-gray-600 text-center">
              Take photos or upload PDFs of your medical reports.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl shadow-lg p-6">
            <div className="bg-orange-100 text-orange-500 p-3 rounded-full mb-4 w-max mx-auto">
              2️⃣
            </div>
            <h3 className="text-xl font-semibold mb-2">Get AI Insights</h3>
            <p className="text-gray-600 text-center">
              Our AI explains results in simple English & Roman Urdu.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl shadow-lg p-6">
            <div className="bg-green-100 text-green-500 p-3 rounded-full mb-4 w-max mx-auto">
              3️⃣
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Vitals</h3>
            <p className="text-gray-600 text-center">
              Monitor your vitals and get reminders to stay on track.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="mt-24 px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Frequently Asked Questions
        </h2>

        <div className="max-w-4xl mx-auto space-y-6 text-left">
          <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="font-semibold text-lg mb-2">Is HealthMate secure?</h3>
            <p className="text-gray-600">
              Yes! All your data is encrypted and private. You control what you share.
            </p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="font-semibold text-lg mb-2">Can I track multiple vitals?</h3>
            <p className="text-gray-600">
              Absolutely. Track BP, sugar, and weight easily with reminders.
            </p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="font-semibold text-lg mb-2">How does AI explain reports?</h3>
            <p className="text-gray-600">
              Our AI provides clear explanations in English and Roman Urdu.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Get Started / Call to Action */}
      <section id="start" className="mt-24 px-8 text-center mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Ready to take control of your health?
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          Sign up now and start tracking your reports and vitals effortlessly.
        </p>

        <button
          onClick={() => navigate("/signup")}
          className="px-8 py-4 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold hover:opacity-90 transition"
        >
          Create Account
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-6 text-sm border-t border-gray-200">
        © 2025 HealthMate. All rights reserved.
      </footer>
    </div>
  );
}
