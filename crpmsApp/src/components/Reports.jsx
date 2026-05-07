import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";

function CarReport() {

  const [data, setData] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3000/report")
      .then(res => setData(res.data))
      .catch(err => console.error(err));

  }, []);

  return (
    <div className="">
      <Header />
       <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        🚗 Cars Service & Payment Report
      </h1>

      <table className="w-full border shadow-lg">

        <thead className="bg-gray-900 text-white">
          <tr>
            <th>Plate</th>
            <th>Type</th>
            <th>Model</th>
            <th>Service Date</th>
            <th>Service Code</th>
            <th>Amount Paid</th>
            <th>Payment Date</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-t text-center">

              <td>{item.plateNumber}</td>
              <td>{item.type}</td>
              <td>{item.model}</td>
              <td>{item.serviceDate}</td>
              <td>{item.serviceCode}</td>
              <td>{item.amountPaid || "Not Paid"}</td>
              <td>{item.paymentDate || "Pending"}</td>

            </tr>
          ))}
        </tbody>

      </table>
</div>
    </div>
  );
}

export default CarReport;