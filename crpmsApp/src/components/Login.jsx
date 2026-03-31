import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setAuth }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', credentials);
      if (res.data.success) {
        setAuth(true);
      }
    } catch (err) { alert("Invalid Credentials"); }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-200">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">CRPMS Login</h2>
        <input type="text" placeholder="Username" className="w-full border p-2 mb-4 rounded"
          onChange={e => setCredentials({...credentials, username: e.target.value})} required />
        <input type="password" placeholder="Password" className="w-full border p-2 mb-6 rounded"
          onChange={e => setCredentials({...credentials, password: e.target.value})} required />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
};

export default Login;