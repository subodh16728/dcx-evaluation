import React,{useState,createContext} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

import ProductForm from './components/Addnew';


export const store=createContext();

function App() {
  const [token,setToken]=useState(null);

  return (
   <store.Provider value={[token,setToken]}>
    <BrowserRouter>
   
    
      
      <Routes>
 
        <Route path='/' element={<Register />} />;
        <Route path='/login' element={<Login />} />;
        <Route path='/home' element={<Home />} />;
        <Route path='/newproduct' element={<ProductForm />} />;
      
 
      </Routes>
    </BrowserRouter>
    </store.Provider>
  );
}

export default App;
