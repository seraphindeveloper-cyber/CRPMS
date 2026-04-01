import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import CarForm from './components/CarForm';
import ServiceRecord from './components/ServiceRecord';
import PaymentForm from './components/PaymentForm';
import Report from './components/Report';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.14),transparent_28%)]">
        {/* Navigation Bar - Responsive [cite: 35] */}
        <nav className="bg-slate-900/90 border-b border-slate-700 backdrop-blur-xl shadow-2xl">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 p-4 md:p-5">
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">SMART PARK CRPMS</h1>
              <p className="text-slate-400 text-sm md:text-base">Digital repair intake, payments, and reporting for SMART PARK garage.</p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm md:text-base">
              <Link to="/" className="hover:text-blue-400 transition">Home</Link>
              <Link to="/car" className="hover:text-blue-400 transition">Car Intake</Link>
              <Link to="/service-record" className="hover:text-blue-400 transition">Service Records</Link>
              <Link to="/payment" className="hover:text-blue-400 transition">Payments</Link>
              <Link to="/report" className="hover:text-blue-400 transition">Reports</Link>
            </div>
          </div>
        </nav>

        {/* Page Container */}
        <main className="container mx-auto p-4 md:p-8">
          <Routes>
            <Route path="/" element={<Home />} />
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