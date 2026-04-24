import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import Landing from './components/Landing';

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
          </Routes>
        
      </div>
    </Router>
    
    </>
  );
}

export default App;