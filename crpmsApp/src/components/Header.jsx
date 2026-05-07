import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const logout = () => {
    
    navigate("/login");
  };

  return (
    <header className="w-full bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

      
        <div className="text-xl font-bold tracking-wide">
          🚗 CRPMS
        </div>

     
        <nav className="flex items-center gap-6 text-sm md:text-base">

          <Link to="/home" className="hover:text-blue-400 transition">
            Home
          </Link>

          <Link to="/cars" className="hover:text-blue-400 transition">
            Cars
          </Link>

          <Link to="/services" className="hover:text-blue-400 transition">
            Services
          </Link>

          <Link to="/bookservice" className="hover:text-blue-400 transition">
            Book Service
          </Link>

          <Link to="/payment" className="hover:text-blue-400 transition">
            Payment
          </Link>

          <Link to="/reports" className="hover:text-blue-400 transition">
            Reports
          </Link>
        </nav>

      
        <div className="flex items-center gap-3">

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm"
          >
            Logout
          </button>

        </div>
      </div>
    </header>
  );
}

export default Header;