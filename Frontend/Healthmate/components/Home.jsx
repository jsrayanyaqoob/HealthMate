import React from "react";

export default function HomePage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-6 py-32 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to Healthcare 🏥
            </h1>
            <p className="text-lg mb-6">
              Your one-stop platform for health information, appointments, and personalized care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => onNavigate("signup")}
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition"
              >
                Try for Free
              </button>
              <button
                onClick={() => onNavigate("login")}
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition"
              >
                Get App
              </button>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
            <div className="w-80 h-80 bg-white   rounded-3xl flex items-center justify-center text-gray-400 font-bold text-2xl">
              <img src="heartImg.png" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-4">
          "Health is wealth – invest in yourself!"
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Our platform helps you track your health, book appointments with doctors, and access reliable health information anytime, anywhere.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition text-center">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600 font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Health</h3>
              <p className="text-gray-500">
                Monitor your vitals, set reminders, and stay on top of your health goals.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition text-center">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600 font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Book Appointments</h3>
              <p className="text-gray-500">
                Schedule consultations with trusted doctors in just a few clicks.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition text-center">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600 font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Reliable Information</h3>
              <p className="text-gray-500">
                Access trusted articles and resources to make informed health decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Get Started Today</h2>
        <p className="mb-8 max-w-xl mx-auto">
          Sign up now and take control of your health journey.
        </p>
        <button
          onClick={() => onNavigate("signup")}
          className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition"
        >
          Try for Free
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        &copy; 2025 Healthcare. All rights reserved.
      </footer>
    </div>
  );
}
