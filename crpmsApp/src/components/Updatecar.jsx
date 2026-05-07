import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateCar() {

  const { plateNumber } = useParams();

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

  // fetch current car data
  useEffect(() => {

    axios.get(`http://localhost:3000/car/${plateNumber}`)
        .then((res) => {

        setForm({
          ...res.data,
          manufactured_year:
            res.data.manufactured_year?.split("T")[0]
        });

      })
      .catch((err) => {
        console.error(err);
      });

  }, []);

  // handle input changes
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  // update car
  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      await axios.put(
        `http://localhost:3000/updatecar/${plateNumber}`,
        form
      );

      alert("Car updated successfully 🚗");

      navigate('/cars');

    } catch (error) {

      console.error(error);

      alert("Update failed");

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">

      <form
        onSubmit={handleUpdate}
        className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-2xl flex flex-col gap-3"
      >

        <h1 className="text-3xl font-bold text-center mb-4">
          Update Car
        </h1>

        <input
          name="plateNumber"
          value={form.plateNumber}
          disabled
          className="border p-2 rounded bg-gray-700"
        />

        <input
          name="type"
          value={form.type}
          onChange={handleChange}
          placeholder="Car Type"
          className="border p-2 rounded bg-gray-900"
        />

        <input
          name="model"
          value={form.model}
          onChange={handleChange}
          placeholder="Model"
          className="border p-2 rounded bg-gray-900"
        />

        <input
          name="driver_phone"
          value={form.driver_phone}
          onChange={handleChange}
          placeholder="Driver Phone"
          className="border p-2 rounded bg-gray-900"
        />

        <label>Manufactured Year</label>

        <input
          name="manufactured_year"
          type="date"
          value={form.manufactured_year}
          onChange={handleChange}
          className="border p-2 rounded bg-gray-900"
        />

        <input
          name="mechanic_name"
          value={form.mechanic_name}
          onChange={handleChange}
          placeholder="Mechanic Name"
          className="border p-2 rounded bg-gray-900"
        />

        <input
          name="user_id"
          value={form.user_id}
          onChange={handleChange}
          placeholder="User ID"
          className="border p-2 rounded bg-gray-900"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 py-2 rounded mt-3 transition"
        >
          Update Car
        </button>

      </form>

    </div>
  );
}

export default UpdateCar;