import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Report = () => {
  const [reportData, setReportData] = useState([]);
  const today = new Date().toISOString().split('T')[0];

  const fetchDailyReport = async () => {
    // This endpoint should join CAR, SERVICE, and PAYMENT tables [cite: 49]
    const res = await axios.get(`http://localhost:5000/api/reports/daily?date=${today}`);
    setReportData(res.data);
  };

  useEffect(() => { fetchDailyReport(); }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Daily Sales Report</h2>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">Date: {today}</span>
      </div>
      
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-800 text-white">
            <th className="p-3 text-left">Plate Number</th>
            <th className="p-3 text-left">Service Offered</th>
            <th className="p-3 text-right">Amount Paid</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-3 font-mono">{item.Plate_number}</td>
              <td className="p-3">{item.Service_name}</td>
              <td className="p-3 text-right">{item.Amount_paid} FRW</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-bold bg-gray-100">
            <td colSpan="2" className="p-3 text-right">Total Revenue:</td>
            <td className="p-3 text-right text-green-700">
              {reportData.reduce((acc, curr) => acc + curr.Amount_paid, 0)} FRW
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Report;