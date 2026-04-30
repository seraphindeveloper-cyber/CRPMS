import { Link,Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-300 via-gray-950 to-blue-900">
      <div className='p-5 bg-gray-700 text-white'>
        <header>
          <span className='text-3xl'>Car 🚘 </span><br />
          <span>repair services</span>
          <nav className='flex gap-5 text-2xl flex-row-reverse'>
            <Link to="#">Contact</Link>
            <Link to="/Services">Services</Link>
            <Link to="#">Car</Link>
          </nav>
          <Outlet />
        </header>
      </div>
<div className="flex flex-col r items-center justify-center text-center min-h-[70vh] px-4">

  <h1 className="text-4xl text-white md:text-5xl font-bold mb-4">
    Reliable Car Repair & Payment Management 
  </h1>

  <p className="text-gray-800 text-white max-w-xl mb-6 text-lg">
    We provide high-quality repair services for your car while helping you 
    easily track service records, manage payments, and stay organized—all in one place.
  </p>

  <div className="flex gap-4"><Link to="/Bookservice">
    <button className="bg-gray-600 hover:bg-gray-800 text-white px-6 py-2 rounded transition">
      Book Service
    </button></Link>

    <button className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded transition">
      View Records
    </button>
  </div>

  <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-400">
    <div>
      <h3 className="font-semibold text-white">🔧 Expert Repairs</h3>
      <p>Certified technicians ensure quality service</p>
    </div>

    <div>
      <h3 className="font-semibold text-white">💳 Easy Payments</h3>
      <p>Track and manage all your transactions</p>
    </div>

    <div>
      <h3 className="font-semibold text-white">📊 Smart Tracking</h3>
      <p>Monitor your car history and service records</p>
    </div>
  </div>

</div>

    </div>
  );
};

export default Home;
