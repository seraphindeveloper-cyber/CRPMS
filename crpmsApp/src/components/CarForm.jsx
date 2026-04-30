import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Addcar(){
    const navigate = useNavigate();

  const [form, setForm] = useState({
    plateNumber: "",
    type: "",
    model: "",
    driver_phone: "",
    manufactured_year: "",
    mechanic_name: "",
    user_id: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
    await  axios.post('http://localhost:3000/addcar',form);
      alert('car registered well...');
    }
    catch(error){
      console.error(error);
      alert('failed to register car 🙈🙈');
    }
    
  }
  return (
    <div className="flex justify-center  items-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-6 w-96 shadow-lg rounded-t-3xl border-2  flex flex-col gap-3">

        <h2 className="text-xl font-bold text-center">Car Registration form</h2>

        <input onChange={handleChange} name="plateNumber" placeholder="Plate Number"  required className="border p-2" />

        <input onChange={handleChange} name="type" placeholder="Car Type"  required className="border p-2" />

        <input onChange={handleChange} name="model" placeholder="Model"  required className="border p-2" />

        <input onChange={handleChange} name="driver_phone" placeholder="Driver Phone"  required className="border p-2" />

        <input onChange={handleChange} name="manufactured_year" type="date"  required className="border p-2" />

        <input onChange={handleChange} name="mechanic_name" placeholder="Mechanic Name"  required className="border p-2" />

        <input onChange={handleChange} name="user_id" placeholder="User ID" required className="border p-2" />

        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          Save Car
        </button>

      </form>
    </div>
  );
}

export default Addcar;