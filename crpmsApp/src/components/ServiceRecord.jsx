import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceRecord = () => {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ plate_number: '', service_name: '', amount_charged: '', service_date: new Date().toISOString().split('T')[0] });

  const fetchRecords = async () => {
    const res = await axios.get('http://localhost:5000/api/service-record');
    setRecords(res.data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this record?')) {
      await axios.delete(`http://localhost:5000/api/service-record/${id}`);
      fetchRecords();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/service-record', {
        plate_number: form.plate_number,
        service_name: form.service_name,
        amount_charged: parseFloat(form.amount_charged),
        service_date: form.service_date,
      });
      setForm({ plate_number: '', service_name: '', amount_charged: '', service_date: new Date().toISOString().split('T')[0] });
      fetchRecords();
      alert('Service record created successfully');
    } catch (err) {
      console.error(err);
      alert('Unable to create service record');
    }
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-bold mb-4">Register Repair Service</h2>
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="License Plate"
            className="border p-2 rounded"
            value={form.plate_number}
            onChange={e => setForm({ ...form, plate_number: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Service Name"
            className="border p-2 rounded"
            value={form.service_name}
            onChange={e => setForm({ ...form, service_name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Amount Charged"
            className="border p-2 rounded"
            value={form.amount_charged}
            onChange={e => setForm({ ...form, amount_charged: e.target.value })}
            required
          />
          <input
            type="date"
            className="border p-2 rounded"
            value={form.service_date}
            onChange={e => setForm({ ...form, service_date: e.target.value })}
            required
          />
          <button className="md:col-span-2 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">
            Save Service Record
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Service Record History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-slate-200">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="border p-3 text-left">Record ID</th>
                <th className="border p-3 text-left">Plate Number</th>
                <th className="border p-3 text-left">Service</th>
                <th className="border p-3 text-right">Amount</th>
                <th className="border p-3 text-left">Date</th>
                <th className="border p-3 text-left">Status</th>
                <th className="border p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec.Record_number} className="hover:bg-slate-50">
                  <td className="border p-3">{rec.Record_number}</td>
                  <td className="border p-3 font-mono">{rec.Plate_number}</td>
                  <td className="border p-3">{rec.Service_name}</td>
                  <td className="border p-3 text-right">{rec.Amount_charged}</td>
                  <td className="border p-3">{rec.Service_date}</td>
                  <td className="border p-3">{rec.status || 'PENDING'}</td>
                  <td className="border p-3 text-center">
                    <button onClick={() => handleDelete(rec.Record_number)} className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceRecord;