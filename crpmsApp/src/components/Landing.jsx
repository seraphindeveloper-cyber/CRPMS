import React from 'react'
import { Link } from "react-router-dom";

function Landing() {
  return (<>
     <div className="min-h-screen bg-slate-950 text-slate-100 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.14),transparent_28%)]">
        <nav className="bg-slate-900/90 border-b border-slate-700 backdrop-blur-xl shadow-2xl">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 p-4 md:p-5">
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">SMART PARK CRPMS</h1>
              <p className="text-slate-400 text-sm md:text-base">Digital repair intake, payments, and reporting for SMART PARK garage.</p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm md:text-base">
             
            
              <Link to="/registration" className="hover:text-blue-400 transition">registration</Link>
               <Link to="/Login" className="hover:text-blue-400 transition">Login</Link>
            </div>
          </div>
        </nav>

        <main className="container mx-auto p-4 md:p-8">
           <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">

      <h1 className="text-3xl font-bold mb-4">
        🚗 CRPMS - Car Repair Payment Management System
      </h1>

      <p className="text-gray-600 mb-6 max-w-md">
        Manage your car repairs and payments بسهولة. Track service records,
        monitor expenses, and stay organized—all in one place.
      </p>

      <div className="flex gap-4">
        <Link to="/registration">
          <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
            Get Started
          </button>
        </Link>

        <Link to="/login">
          <button className="bg-gray-300 text-black px-5 py-2 rounded hover:bg-gray-400">
            Login
          </button>
        </Link>
      </div>

      <div className="mt-10 text-sm text-gray-500">
        <p>✔ Track repairs</p>
        <p>✔ Manage payments</p>
        <p>✔ Stay organized</p>
      </div>

    </div>
     </main>
    </div>
   
    </>
  )
}

export default Landing
