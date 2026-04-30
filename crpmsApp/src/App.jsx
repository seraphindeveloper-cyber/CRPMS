import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import Landing from './components/Landing';
import Services from './components/Services';
import Bookservice from './components/Bookservice';
import CarForm from './components/CarForm'


function App() {
  return (
    <>
    <Router>
    

    <div>
          <Routes>
            <Route path='/' element={<Landing/>}></Route>
            <Route path="/home" element={<Home />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/Bookservice" element={<Bookservice />} />
            <Route path="/CarForm" element={<CarForm />} />

          </Routes>
        
      </div>
    </Router>
    
    </>
  );
}

export default App;