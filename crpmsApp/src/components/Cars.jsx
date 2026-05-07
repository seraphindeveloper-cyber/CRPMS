import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Cars() {
    const [Cars, setCars] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
        axios.get('http://localhost:3000/cars').then((res) => {
            setCars(res.data);
        }).catch((error) => {
            console.error(error);
        });
    }, []);
    const navigate = useNavigate();
    const fetchCars = async () => {
        try {
            const res = await axios.get("http://localhost:3000/cars");
            setCars(res.data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleDelete = async (plateNumber) => {

        const confirmDelete = window.confirm("Are you sure you want to delete this car?");

        if (confirmDelete) {

            try {
                await axios.delete(`http://localhost:3000/deletecar/${plateNumber}`);

                alert("Car deleted successfully");

                fetchCars();

            } catch (error) {
                console.error(error);
                alert("Delete failed");
            }
        }
    };
    return (
        <>
        <Header />
        <div className="p-6 text-center">
            <label htmlFor="">Search your cars</label><br />
            <input
                type="text"
                placeholder="🔎 Search by plate number, model or type..."
                className="border w-150 p-2 rounded  mb-4"
                onChange={(e) => setSearch(e.target.value)}
            />
            <br /><br />
            <h2 className="text-2xl font-bold mb-4"> List of Cars</h2>
            <table className="w-full border mt-2">
                <thead>
                    <tr className=" text-amber-950 border-2 border-amber-950 bg-gray-500">
                        <th className="p-2">plateNumber</th>
                        <th className="p-2">type</th>
                        <th className="p-2">model</th>
                        <th className="p-2">driver_phone</th>
                        <th className="p-2">manufactured_year</th>
                        <th className="p-2">mechanic_name</th>
                        <th className="p-2">driver_id</th>
                        <th className="p-2">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {Cars.filter((car) => {
                        return (
                            car.plateNumber.toLowerCase().includes(search.toLowerCase()) ||
                            car.model.toLowerCase().includes(search.toLowerCase()) ||
                            car.type.toLowerCase().includes(search.toLowerCase())
                        );
                    }).map((car) => (
                        <tr key={car.plateNumber} className="text-center border-t">
                            <td className="p-2">{car.plateNumber}</td>
                            <td className="p-2">{car.type}</td>
                            <td className="p-2">{car.model}</td>
                            <td className="p-2">{car.driver_phone}</td>
                            <td className="p-2">{car.manufactured_year}</td>
                            <td className="p-2">{car.mechanic_name}</td>
                            <td className="p-2">{car.user_id}</td>
                            <td className='flex gap-1 mt-1 p-2'><button
                                onClick={() => navigate(`/updatecar/${car.plateNumber}`)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
                                Edit
                            </button>
                                <button onClick={() => handleDelete(car.plateNumber)} className='bg-red-500 rounded-lg'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
           
        </div>
        <Footer />
        </>

    )
}

export default Cars
