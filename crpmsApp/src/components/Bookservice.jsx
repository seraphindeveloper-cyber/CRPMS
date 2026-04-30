import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link,Outlet } from 'react-router-dom';

function Bookservice() {
    

    return (
        <div className="min-h-screen bg-gray-400 flex flex-col items-center justify-center text-center px-4  text-black">


            <header className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    🚗 Book Car Repair Services
                </h1>
                <p className="text-gray-900 max-w-lg">
                    Easily book repair services for your car, track progress, and manage payments in one place.
                </p>
            </header>


            <div className="mb-6">
                <p className="text-lg text-gray-700">
                    Follow these simple steps to get your car serviced:
                </p>
            </div>


            <div className="grid grid-cols-1 rounded-full  bg-white w-full mb-8 text-center">

                <div className="bg-gray-100 p-1 rounded shadow">
                    <span className="font-semibold">1️⃣ Register your Car</span>
                    <p className="text-gray-400 text-sm">Please share your vehicle’s specific make, model, and year to help us tailor our service to your ca</p>
                </div>

                <div className="bg-gray-100 p-1 rounded shadow">
                    <span className="font-semibold">2️⃣ Select Service</span>
                    <p className="text-gray-400 text-sm">Select the specific maintenance or repair service your vehicle requires from our comprehensive menu. Our expert team is ready to provide the professional care your car deserves to stay in peak condition.</p>
                </div>

                <div className="bg-gray-100 p-1 rounded shadow">
                    <span className="font-semibold">3️⃣ Review Summary</span>
                    <p className="text-gray-400 text-sm">Please take a moment to carefully review your service selection and vehicle information to ensure everything is correct. Once you’ve verified the summary, proceed to confirm your booking and secure your appointment.
                    </p>
                </div>

                <div className="bg-gray-100 p-1 rounded shadow">
                    <span className="font-semibold">4️⃣ Finish Booking</span>
                    <p className="text-gray-400 text-sm">Submit and save your booking</p>
                </div>

            </div>


            <div><span>follow steps <span className='text-xl text-amber-800'>➡️start to </span></span>
            <Link to="/CarForm">
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold"
                >
                    Register Your Car
                </button></Link><Outlet />
            </div>

        </div>
    );
}

export default Bookservice;