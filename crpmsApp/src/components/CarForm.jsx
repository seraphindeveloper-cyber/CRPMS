import React, { useState } from 'react';
import axios from 'axios';

const CarForm = () => {
  const [car, setCar] = useState({
    plate: '', type: '', model: '', year: '', phone: '', mechanic: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/cars', car);
      alert("Car details recorded successfully!");
    } catch (err) { alert("Error saving car data"); }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-slate-700 border-b pb-2">Register Incoming Car</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="License Plate" className="border p-2 rounded" onChange={e => setCar({...car, plate: e.target.value})} required />
        <input type="text" placeholder="Car Type" className="border p-2 rounded" onChange={e => setCar({...car, type: e.target.value})} required />
        <input type="text" placeholder="Model" className="border p-2 rounded" onChange={e => setCar({...car, model: e.target.value})} required />
        <input type="number" placeholder="Year" className="border p-2 rounded" onChange={e => setCar({...car, year: e.target.value})} required />
        <input type="text" placeholder="Driver Phone" className="border p-2 rounded" onChange={e => setCar({...car, phone: e.target.value})} required />
        <input type="text" placeholder="Chief Mechanic" className="border p-2 rounded" onChange={e => setCar({...car, mechanic: e.target.value})} required />
        <button className="md:col-span-2 bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition">Save Car Details</button>
      </form>
    </div>
  );
};

export default CarForm;