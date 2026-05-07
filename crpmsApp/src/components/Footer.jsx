import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-10 border-t border-slate-700">
      
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

      
        <div>
          <h2 className="text-white text-lg font-bold mb-3">
            🚗 CRPMS System
          </h2>
          <p className="text-sm leading-6">
            Car Repair Payment Management System helps garages manage
            car repairs, service records, payments, and reports in one place.
          </p>
        </div>

       
        <div>
          <h2 className="text-white text-lg font-bold mb-3">
            Quick Links
          </h2>

          <ul className="space-y-2 text-sm">
            <li><Link to="/home" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/cars" className="hover:text-blue-400">Cars</Link></li>
            <li><Link to="/services" className="hover:text-blue-400">Services</Link></li>
            <li><Link to="/payment" className="hover:text-blue-400">Payment</Link></li>
            <li><Link to="/reports" className="hover:text-blue-400">Reports</Link></li>
          </ul>
        </div>

      
        <div>
          <h2 className="text-white text-lg font-bold mb-3">
            Contact
          </h2>

          <p className="text-sm">📍 Kigali, Rwanda</p>
          <p className="text-sm">📞 +250 794 954 648</p>
          <p className="text-sm">📧 seraphindeveloper@gmail.com</p>
        </div>

      </div>

     
      <div className="border-t border-slate-700 text-center py-4 text-sm text-slate-500">
        © {new Date().getFullYear()} CRPMS. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;