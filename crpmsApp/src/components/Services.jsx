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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Services List</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 text-black">
            <th className="p-2">Code</th>
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Car Plate</th>
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