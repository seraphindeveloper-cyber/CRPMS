import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [serviceRecords, setServiceRecords] = useState([]);
  const [payment, setPayment] = useState({ record_number: '', amount: '', date: new Date().toISOString().split('T')[0] });
  const [bill, setBill] = useState(null);

  const fetchServiceRecords = async () => {
    const res = await axios.get('http://localhost:5000/api/service-record');
    setServiceRecords(res.data);
    const pending = res.data.find(r => r.status === 'PENDING' || !r.status);
    if (pending) {
      setPayment(prev => ({
        ...prev,
        record_number: String(pending.Record_number),
        amount: String(pending.Amount_charged || ''),
      }));
    }
  };

  useEffect(() => {
    fetchServiceRecords();
    
  }, []);

  const handleRecordChange = (e) => {
    const selectedId = e.target.value;
    const selected = serviceRecords.find(record => String(record.Record_number) === selectedId);
    setPayment(prev => ({
      ...prev,
      record_number: selectedId,
      amount: selected ? String(selected.Amount_charged || '') : '',
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/payments', payment);
      const selected = serviceRecords.find(record => String(record.Record_number) === payment.record_number);
      setBill({
        ...payment,
        status: 'PAID',
        plate_number: selected?.Plate_number,
        service_name: selected?.Service_name,
      });
      alert('Payment Recorded Successfully');
      fetchServiceRecords();
    } catch (err) {
      console.error(err);
      alert('Payment failed');
    }
  };

  const pendingRecords = serviceRecords.filter(record => record.status === 'PENDING' || !record.status);

  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="bg-white text-black p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Process Payment</h2>
        <form onSubmit={handlePayment} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Select Pending Service</span>
            <select
              value={payment.record_number}
              onChange={handleRecordChange}
              className="w-full border p-2 rounded mt-1"
              required
            >
              <option value="">Choose a service record</option>
              {pendingRecords.map(record => (
                <option key={record.Record_number} value={record.Record_number}>
                  {record.Record_number} — {record.Plate_number} / {record.Service_name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Amount Paid (FRW)</span>
            <input
              type="number"
              className="w-full border p-2 rounded mt-1"
              value={payment.amount}
              onChange={e => setPayment({ ...payment, amount: e.target.value })}
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Payment Date</span>
            <input
              type="date"
              className="w-full border p-2 rounded mt-1"
              value={payment.date}
              onChange={e => setPayment({ ...payment, date: e.target.value })}
              required
            />
          </label>

          <button className="w-full bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700 transition" disabled={!payment.record_number}>
            Record Payment
          </button>
        </form>
      </div>

      {bill && (
        <div className="bg-gray-50 p-6 border-2 border-dashed border-gray-300 rounded">
          <h2 className="text-center font-bold text-lg underline">SMART PARK OFFICIAL BILL</h2>
          <div className="mt-4 space-y-2">
            <p><strong>Record ID:</strong> {bill.record_number}</p>
            <p><strong>Plate:</strong> {bill.plate_number}</p>
            <p><strong>Service:</strong> {bill.service_name}</p>
            <p><strong>Date:</strong> {bill.date}</p>
            <p><strong>Amount:</strong> {bill.amount} FRW</p>
            <p className="text-green-600 font-bold">Status: {bill.status}</p>
          </div>
          <button onClick={() => window.print()} className="mt-4 text-sm text-blue-600">
            Print Receipt
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;