import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [payment, setPayment] = useState({
    record_number: '', amount: '', date: new Date().toISOString().split('T')[0]
  });
  const [bill, setBill] = useState(null);

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/payments', payment [cite: 42]);
      setBill({ ...payment, status: "PAID" });
      alert("Payment Recorded Successfully");
    } catch (err) { alert("Payment failed"); }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Record Payment</h2>
        <form onSubmit={handlePayment} className="space-y-4">
          <input type="number" placeholder="Service Record Number" className="w-full border p-2 rounded" 
            onChange={e => setPayment({...payment, record_number: e.target.value})} required />
          <input type="number" placeholder="Amount Paid (FRW)" className="w-full border p-2 rounded" 
            onChange={e => setPayment({...payment, amount: e.target.value})} required />
          <input type="date" className="w-full border p-2 rounded" value={payment.date}
            onChange={e => setPayment({...payment, date: e.target.value})} required />
          <button className="w-full bg-green-600 text-white py-2 rounded font-bold">Process Payment</button>
        </form>
      </div>

      {/* Bill Generation Section  */}
      {bill && (
        <div className="bg-gray-50 p-6 border-2 border-dashed border-gray-300 rounded">
          <h2 className="text-center font-bold text-lg underline">SMART PARK OFFICIAL BILL</h2>
          <div className="mt-4 space-y-2">
            <p><strong>Record ID:</strong> {bill.record_number}</p>
            <p><strong>Date:</strong> {bill.date}</p>
            <p><strong>Amount:</strong> {bill.amount} FRW</p>
            <p className="text-green-600 font-bold">Status: {bill.status}</p>
          </div>
          <button onClick={() => window.print()} className="mt-4 text-sm text-blue-600">Print Receipt</button>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;