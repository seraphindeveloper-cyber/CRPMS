import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] bg-slate-900/80 border border-slate-700 p-10 shadow-[0_40px_120px_rgba(15,23,42,0.25)] backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row gap-8 lg:items-center">
          <div className="space-y-5 lg:w-2/3">
            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-300 text-sm font-medium">SMART PARK | CRPMS</span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Manage Garage Repairs, Payments and Reports in One Place</h1>
            <p className="text-slate-300 text-lg leading-8">Designed for SMART PARK garage in Rubavu, this interface replaces paper-based repair tracking with a polished digital workflow for car intake, repair services, payments, and daily reporting.</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/car" className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition">Register Car</Link>
              <Link to="/service-record" className="rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-800 transition">Service Records</Link>
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-slate-800/80 border border-slate-700 p-8 shadow-lg">
            <p className="text-slate-400 uppercase tracking-[0.3em] text-xs mb-4">Core Actions</p>
            <div className="grid gap-4">
              <div className="rounded-3xl bg-slate-950/80 border border-cyan-500/20 p-5">
                <h2 className="text-xl font-semibold text-white">Intake New Cars</h2>
                <p className="mt-2 text-slate-400 text-sm">Capture plate, type, model, year, phone, mechanic and service details in one pass.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 border border-emerald-500/20 p-5">
                <h2 className="text-xl font-semibold text-white">Track Repairs</h2>
                <p className="mt-2 text-slate-400 text-sm">Keep service records organized and easy to review.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 border border-violet-500/20 p-5">
                <h2 className="text-xl font-semibold text-white">Record Payments</h2>
                <p className="mt-2 text-slate-400 text-sm">Process payments and generate official garage bills instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-5 mt-10 md:grid-cols-2">
        <div className="rounded-[1.75rem] bg-slate-900/80 border border-slate-700 p-6 shadow-lg hover:-translate-y-1 transition-all">
          <h2 className="text-xl font-semibold text-white mb-3">Car Intake</h2>
          <p className="text-slate-400">Register license plate, type, model, year, driver phone, chief mechanic and requested service.</p>
          <Link to="/car" className="mt-6 inline-flex items-center rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition">Record new car</Link>
        </div>
        <div className="rounded-[1.75rem] bg-slate-900/80 border border-slate-700 p-6 shadow-lg hover:-translate-y-1 transition-all">
          <h2 className="text-xl font-semibold text-white mb-3">Service Management</h2>
          <p className="text-slate-400">View service history, open repair jobs, and keep track of pending work.</p>
          <Link to="/service-record" className="mt-6 inline-flex items-center rounded-full bg-slate-800 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700 transition">Manage service records</Link>
        </div>
        <div className="rounded-[1.75rem] bg-slate-900/80 border border-slate-700 p-6 shadow-lg hover:-translate-y-1 transition-all">
          <h2 className="text-xl font-semibold text-white mb-3">Payment Processing</h2>
          <p className="text-slate-400">Select pending services, pay invoices and issue official receipts.</p>
          <Link to="/payment" className="mt-6 inline-flex items-center rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition">Process payments</Link>
        </div>
        <div className="rounded-[1.75rem] bg-slate-900/80 border border-slate-700 p-6 shadow-lg hover:-translate-y-1 transition-all">
          <h2 className="text-xl font-semibold text-white mb-3">Reports</h2>
          <p className="text-slate-400">Generate daily revenue insights and stay on top of workshop performance.</p>
          <Link to="/report" className="mt-6 inline-flex items-center rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-violet-400 transition">View reports</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
