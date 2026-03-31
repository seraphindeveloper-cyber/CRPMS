import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CarForm from './components/CarForm';
import ServiceRecord from './components/ServiceRecord';
import PaymentForm from './components/PaymentForm';
import Report from './components/Report';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bar - Responsive [cite: 35] */}
        <nav className="bg-slate-800 p-4 text-white shadow-md">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-xl font-bold tracking-tight">SMART PARK garage</h1>
            <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
              <Link to="/car" className="hover:text-blue-400 transition">Car</Link>
              <Link to="/service-record" className="hover:text-blue-400 transition">Service Record</Link>
              <Link to="/payment" className="hover:text-blue-400 transition">Payment</Link>
              <Link to="/report" className="hover:text-blue-400 transition">Report</Link>
              <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition">Logout</button>
            </div>
          </div>
        </nav>

        {/* Page Container */}
        <main className="container mx-auto p-4 md:p-8">
          <Routes>
            <Route path="/car" element={<CarForm />} />
            <Route path="/service-record" element={<ServiceRecord />} />
            <Route path="/payment" element={<PaymentForm />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;