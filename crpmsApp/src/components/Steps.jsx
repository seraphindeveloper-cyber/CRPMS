import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Steps() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const [data, setData] = useState({
        plateNumber: "",
        type: "",
        model: "",
        driver_phone: "",
        manufactured_year: "",
        mechanic_name: "",
        user_id: "",
        serviceCode: ""
    });

    const [services, setServices] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/services")
            .then(res => setServices(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const next = () => setStep(step + 1);
    const back = () => setStep(step - 1);

    const saveCar = async () => {
        try {
            await axios.post("http://localhost:3000/addcar", data);
            next();
        } catch (err) {
            console.error(err);
            alert("Failed to save car");
        }
    };

    const finish = async () => {
        try {
            const today = new Date().toISOString().split('T')[0];
            await axios.post("http://localhost:3000/servicesrecord", {
                serviceDate: today,
                serviceCode: data.serviceCode,
                plateNumber: data.plateNumber
            });
            alert("Service booked successfully 🚗");
            navigate("/Payment");
        } catch (err) {
            console.error(err);
            alert("Booking failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">

            <div className="w-full max-w-md rounded-xl text-white border-2 w-full shadow-2xl p-6">


                <h2 className="text-2xl font-bold text-center mb-2">
                    Book Car Service 🚗
                </h2>

                {/* STEP INDICATOR */}
                <div className="flex justify-between mb-6 text-sm font-medium">
                    <span className={step >= 1 ? "text-blue-600" : "text-gray-400"}>Car <hr className="w-38" /></span>
                    <span className={step >= 2 ? "text-blue-600" : "text-gray-400"}>Service <hr className="w-30" /></span>
                    <span className={step === 3 ? "text-blue-600" : "text-gray-400"}>Confirm<hr className="w-30" /></span>
                </div>

                {/* STEP 1 */}
                {step === 1 && (
                    <div className="flex   flex-col gap-3">
                        <input name="plateNumber" placeholder="Plate Number" onChange={handleChange} className="border p-1.5 rounded focus:ring-2 bg-gray-900 focus:ring-blue-400" />
                        <input name="type" placeholder="Car Type" onChange={handleChange} className="border p-2 rounded focus:ring-2 bg-gray-900 focus:ring-blue-400" />
                        <input name="model" placeholder="Model" onChange={handleChange} className="border p-2 rounded focus:ring-2 bg-gray-900 focus:ring-blue-400" />
                        <input name="driver_phone" placeholder="Driver Phone" onChange={handleChange} className="border p-2 rounded focus:ring-2 bg-gray-900 focus:ring-blue-400" />
                        <label htmlFor="">manufactured_year:</label>
                        <input placeholder="" name="manufactured_year" type="date" onChange={handleChange} className="border p-1.5 rounded focus:ring-2 bg-gray-900 focus:ring-blue-400" />
                        <input name="mechanic_name" placeholder="Mechanic Name" onChange={handleChange} className="border p-2 rounded focus:ring-2 bg-gray-900 focus:ring-blue-400" />
                        <input name="user_id" placeholder="Driver ID" onChange={handleChange} className="border p-2 rounded focus:ring-2 bg-gray-900 focus:ring-blue-400" />

                        <button onClick={saveCar} className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-2 transition">
                            Save Car & Continue →
                        </button>
                    </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <div className="flex flex-col gap-3">

                        <label className="text-sm font-semibold text-gray-600">
                            Select Service
                        </label>

                        <select
                            name="serviceCode"
                            value={data.serviceCode}
                            onChange={handleChange}
                            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select Service</option>
                            {services.map((s) => (
                                <option className="text-black" key={s.serviceCode} value={s.serviceCode}>
                                    {s.serviceName} - {s.servicePrice} RWF
                                </option>
                            ))}
                        </select>

                        <div className="flex justify-between mt-4">
                            <button onClick={back} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
                                ← Back
                            </button>

                            <button onClick={next} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                                Next →
                            </button>
                        </div>
                    </div>
                )}

                
                {step === 3 && (
                    <div className="flex flex-col gap-3 text-center">

                        <h3 className="font-bold text-lg">Confirm Booking</h3>

                        <div className="bg-gray-700 text-white p-4 rounded text-left text-sm">
                            <p><strong>Plate:</strong> {data.plateNumber}</p>
                            <p><strong>Model:</strong> {data.model}</p>
                            <p><strong>Service Code:</strong> {data.serviceCode}</p>
                        </div>

                        <div className="flex justify-between mt-4">
                            <button onClick={back} className="bg-gray-700 text-white hover:bg-gray-400 px-4 py-2 rounded">
                                ← Back
                            </button>

                            <button onClick={finish} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                                ✔ Finish Booking
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Steps;