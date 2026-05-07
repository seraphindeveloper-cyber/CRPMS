import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from './Footer';

function Payment() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        amountPaid: "",
        paymentDate: "",
        recordNumber: ""
    });

    const [records, setRecords] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:3000/servicesrecord")
            .then(res => setRecords(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const today = new Date().toISOString().split("T")[0];

            await axios.post("http://localhost:3000/payment", {
                ...form,
                paymentDate: today
            });

            alert("Payment successful 💰");

            setForm({
                amountPaid: "",
                paymentDate: "",
                recordNumber: ""
            });
            navigate("/Reports");

        } catch (err) {
            console.error(err);
            alert("Payment failed");
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gray-800">

                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-gray-900 text-white p-6 rounded-xl shadow-2xl flex flex-col gap-4"
                >

                    <h1 className="text-2xl font-bold text-center">
                        💳 Make Payment
                    </h1>


                    <label>Select Service Record</label>
                    <select
                        name="recordNumber"
                        value={form.recordNumber}
                        onChange={handleChange}
                        className="p-2 rounded bg-gray-700 border"
                        required
                    >
                        <option value="">-- choose service record --</option>

                        {records.map((r) => (
                            <option key={r.recordNumber} value={r.recordNumber}>
                                Record #{r.recordNumber}, serviceCode: {r.serviceCode} -Car {r.plateNumber}
                            </option>
                        ))}
                    </select>


                    <input
                        type="number"
                        name="amountPaid"
                        value={form.amountPaid}
                        onChange={handleChange}
                        placeholder="Amount Paid (RWF)"
                        className="p-2 rounded bg-gray-700 border"
                        required
                    />


                    <input
                        type="date"
                        name="paymentDate"
                        value={form.paymentDate}
                        onChange={handleChange}
                        className="p-2 rounded bg-gray-700 border"
                    />


                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 py-2 rounded font-semibold transition"
                    >
                        Pay Now
                    </button>

                </form>

            </div>
            <Footer />
        </>
    );
}

export default Payment;