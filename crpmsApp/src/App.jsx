import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import Landing from './components/Landing';
import Services from './components/Services';
import Bookservice from './components/Bookservice';
import Cars from './components/Cars';
import Steps from './components/Steps';
import UpdateCar from './components/Updatecar';
import Payment from './components/Payment';
import Reports from './components/Reports';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <>
    <Router>
    

    <div>
          <Routes>
            <Route path='/' element={<Landing/>}></Route>
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
            <Route path="/Bookservice" element={<ProtectedRoute><Bookservice /></ProtectedRoute>} />
    
            <Route path="/Cars" element={<ProtectedRoute><Cars /></ProtectedRoute>} />
            <Route path="/Steps" element={<ProtectedRoute><Steps /></ProtectedRoute>} />
            <Route path="/updatecar/:plateNumber" element={<ProtectedRoute><UpdateCar /></ProtectedRoute>} />
            <Route path="/Payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
            <Route path="/Reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />


          </Routes>
        
      </div>
    </Router>
    
    </>
  );
}

export default App;