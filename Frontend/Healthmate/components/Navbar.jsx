import { Link } from "react-router-dom"

export default function Navbar({ place, btnText }) {
  return (
  <>
    {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-1 rounded-full">
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

          <Link
            to={place}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold hover:opacity-90 transition"
          >
            {btnText}
          </Link>
        </nav>
        </>
      )
}
