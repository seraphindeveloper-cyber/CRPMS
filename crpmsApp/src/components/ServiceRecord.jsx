import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceRecord = () => {
  const [records, setRecords] = useState([]);
  
  // Retrieve operation 
  const getRecords = async () => {
    const res = await axios.get('http://localhost:5000/api/service-record');
    setRecords(res.data);
  };

  useEffect(() => { getRecords(); }, []);

  // Delete operation 
  const handleDelete = async (id) => {
    if(window.confirm("Delete this record?")) {
      await axios.delete(`http://localhost:5000/api/service-record/${id}`);
      getRecords();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Service Record Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-slate-200">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="border p-3 text-left">Record ID</th>
              <th className="border p-3 text-left">Date</th>
              <th className="border p-3 text-left">Plate Number</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec) => (
              <tr key={rec.Record_number} className="hover:bg-slate-50">
                <td className="border p-3">{rec.Record_number}</td>
                <td className="border p-3">{rec.Service_date}</td>
                <td className="border p-3 font-mono">{rec.Plate_number}</td>
                <td className="border p-3 text-center space-x-2">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded text-xs">Update</button>
                  <button onClick={() => handleDelete(rec.Record_number)} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceRecord;