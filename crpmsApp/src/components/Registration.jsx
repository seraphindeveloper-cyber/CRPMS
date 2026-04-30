import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import Login from './Login';
import { useState } from 'react';
import axios from 'axios'


  function Registration() {
    const [user_name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate= useNavigate();

    const handleUsername = (event) => {
      setUsername(event.target.value);
    };

    const handlePassword = (event) => {
      setPassword(event.target.value)
    };
    const handleSubmit = async (event) => {
      event.preventDefault();

      try {
        const res = await axios.post('http://localhost:3000/Registration',{
          user_name,
          password
        });
        if (res.data) {
          navigate('/Login');
        }
      }
      catch(error){
        console.error(error);
        alert('failed to register');
      }
      
  };

    return (<>
      <div className="flex justify-center items-center min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 -mt-20 shadow-md rounded-lg w-full border max-w-sm">
          <h2 className="text-xl font-bold text-center mb-2">Registration</h2>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="username">Username</label>
            <input onChange={handleUsername} className="border rounded-md px-3 py-2 outline-blue-500" type="text" id="username" name="user_name" required />
          </div>


          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="password">Password</label>
            <input onChange={handlePassword} className="border rounded-md px-3 py-2 outline-blue-500" type="password" id="password" name="password" required />
          </div>

          <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-black font-semibold py-2 rounded-md transition-colors" type="submit">
            Register
          </button>
          <span>do you have an account?- <Link to="/Login"><span className='text-amber-700'>login</span></Link></span><Outlet />
        </form>
      </div>
    </>
    );
  }

export default Registration
