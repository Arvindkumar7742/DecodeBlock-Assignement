import { useEffect } from 'react';
import './App.css';
import { createMockServer } from "./mirage"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import HomePage from './pages/HomePage';
import SignUp from './pages/Signup';
import Login from './pages/Login';

function App() {
  useEffect(() => {
    createMockServer();
  }, []);

  return (
    <div className="text-center">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
