import { Link, Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Home = () => {
  const navigate = useNavigate();
const logout = () => {
  localStorage.removeItem("user");
  navigate("/login", { replace: true });
};

  return (
    <div className="w-full h-screen bg-[url('/repair.png')] bg-cover bg-center">


      <div className="p-5 text-white bg-gray-700/70">
        <header className="flex items-center justify-between">


          <div>
            <span className="text-3xl">Car 🚘</span>
            <br />
            <span>repair services</span>
          </div>


          <nav className="flex gap-6 ml-100 text-xl">
            <Link to="/Cars" className="hover:text-blue-300">Cars</Link>
            <Link to="/Services" className="hover:text-blue-300">Services</Link>
            <Link to="/Payment" className="hover:text-blue-300">Payment</Link>
            <Link to="/Reports" className="hover:text-blue-300">Reports</Link>
          </nav>


          <div>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm"
            >
              Logout
            </button>
          </div>

        </header>
      </div>


      <div className="flex items-center justify-center min-h-[70vh] px-4">

        <div className="bg-gray-900/70 text-center p-10 rounded-lg max-w-screen ">

          <h1 className="text-4xl text-white md:text-5xl font-bold mb-4">
            Reliable Car Repair & Payment Management
          </h1>

          <p className="text-gray-200 mb-6 text-lg">
            We provide high-quality repair services for your car while helping you
            track service records, manage payments, and stay organized—all in one place.
          </p>

          <div className="flex gap-4 justify-center">
            <Link to="/Bookservice">
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white">
                Book Service
              </button>
            </Link>
            <Link to="/Cars">
              <button className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded">
                View cars
              </button></Link>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
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

      <Outlet />
      <Footer />
    </div>
  );
};

export default Home;