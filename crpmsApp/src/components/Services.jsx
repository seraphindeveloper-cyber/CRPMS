import React, { useEffect, useState } from "react";
import axios from "axios";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/services")
      .then((res) => {
        setServices(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Services List</h2>

      <table className="w-full border">
        <thead>
          <tr className=" text-amber-950 border-2 border-amber-950 bg-gray-500">
            <th className="p-2">serviceCode</th>
            <th className="p-2">serviceName</th>
            <th className="p-2">servicePrice</th>
            <th className="p-2">served Car Plate</th>
          </tr>
        </thead>

        <tbody>
          {services.map((service) => (
            <tr key={service.serviceCode} className="text-center border-t">
              <td className="p-2">{service.serviceCode}</td>
              <td className="p-2">{service.serviceName}</td>
              <td className="p-2">{service.servicePrice}</td>
              <td className="p-2">{service.plateNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Services;