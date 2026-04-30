import React from 'react'
import { Link,Outlet } from 'react-router-dom';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Login() {
const [user_name, setUsername] = useState('');
const [ password, setPassword ] = useState('');
const navigate = useNavigate();

const handleUsernameChange = (event) => {
  setUsername(event.target.value)
};
const handlePasswordChange = (event) => {
  setPassword(event.target.value)
};
const handleSubmit = async (event) => {
  event.preventDefault();
  const res = await fetch('http://localhost:3000/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_name,
      password
    })
  });
  const data = await res.json()
  if (data.success) {
    navigate('/Home')
  }
  else{
    alert(data.message)
  }
}

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="border-2 p-6 rounded shadow -mt-40 w-80 flex flex-col gap-3">
        <h2 className="text-xl font-bold text-center">Login</h2>

        <input
          type="text"
          name="user_name"
          placeholder="Username"
          onChange={handleUsernameChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          required
          className="border p-2 rounded"
        />

        <input type='submit' className="bg-blue-500 text-white py-2 rounded" />
        <Link to="/Registration">
         <span className='text-amber-700'>create an account</span></Link>
      </form>
      <Outlet />
    </div>
  )
}

export default Login
