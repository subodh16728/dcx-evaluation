// App.js
import React, {useState, useContext, createContext} from 'react';
import './App.css';
import Nav from './components/Nav';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProduct from './components/addProduct';
import 'bootstrap/dist/css/bootstrap.min.css';

export const store =createContext();

const App = () => {
  const [token, setToken] = useState(null);
  return (
    <div>
    <store.Provider value={[token,setToken]}>
    <Router >
    <Nav />
      <Routes>
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/dashboard" element={<Dashboard />} />     
        <Route path='/add' element={<AddProduct />} />
      </Routes>
    </Router>
    </store.Provider>
    </div>
  );
}

export default App;
