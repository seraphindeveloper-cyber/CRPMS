import React, { useState } from 'react';
import axios from 'axios';

const CarForm = () => {
  const [entry, setEntry] = useState({
    plate: '', type: '', model: '', year: '', phone: '', mechanic: '',
    service_name: '', amount_charged: '', service_date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/cars', {
        plate: entry.plate,
        type: entry.type,
        model: entry.model,
        year: Number(entry.year),
        phone: entry.phone,
        mechanic: entry.mechanic,
      });

      await axios.post('http://localhost:5000/api/service-record', {
        service_name: entry.service_name,
        amount_charged: parseFloat(entry.amount_charged),
        service_date: entry.service_date,
        plate_number: entry.plate,
      });

      alert('Car intake and service details recorded successfully!');
      setEntry({ plate: '', type: '', model: '', year: '', phone: '', mechanic: '', service_name: '', amount_charged: '', service_date: new Date().toISOString().split('T')[0] });
    } catch (err) {
      console.error(err);
      alert('Error saving intake data');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-slate-900/80 border border-slate-700 rounded-[2rem] p-8 shadow-[0_30px_80px_rgba(15,23,42,0.3)]">
      <div className="mb-8">
        <p className="text-cyan-300 uppercase tracking-[0.36em] text-xs font-semibold mb-3">New Car Intake</p>
        <h2 className="text-3xl font-extrabold text-white">Register incoming car and service details</h2>
        <p className="text-slate-400 mt-3">Capture all service information in one smooth flow.</p>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="License Plate"
          className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          value={entry.plate}
          onChange={e => setEntry({ ...entry, plate: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Car Type"
          className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          value={entry.type}
          onChange={e => setEntry({ ...entry, type: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Model"
          className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          value={entry.model}
          onChange={e => setEntry({ ...entry, model: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Year"
          className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          value={entry.year}
          onChange={e => setEntry({ ...entry, year: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Driver Phone"
          className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          value={entry.phone}
          onChange={e => setEntry({ ...entry, phone: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Chief Mechanic"
          className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          value={entry.mechanic}
          onChange={e => setEntry({ ...entry, mechanic: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Service Name"
          className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          value={entry.service_name}
          onChange={e => setEntry({ ...entry, service_name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Amount Charged"
          className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          value={entry.amount_charged}
          onChange={e => setEntry({ ...entry, amount_charged: e.target.value })}
          required
        />
        <input
          type="date"
          className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          value={entry.service_date}
          onChange={e => setEntry({ ...entry, service_date: e.target.value })}
          required
        />
        <button className="md:col-span-2 rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-950 transition hover:bg-cyan-400">
          Record Intake
        </button>
      </form>
    </div>
  );
};

export default CarForm;