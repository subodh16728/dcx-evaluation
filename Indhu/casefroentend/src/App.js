import React,{useState,createContext} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import ProductForm from './components/Addnew';
import Wishlist from './components/Wishlist';
import MyOffers from './components/Myoffers';
import MyProfile from './components/MyProfile';
import ProfileEdit from './components/Edit';
import { ToastContainer } from 'react-toastify';
import Nav from './components/NavBar';
import Header from './components/Header';




export const store=createContext();

function App() {
  const [token,setToken]=useState(null);

  return (
   <store.Provider value={[token,setToken]}>
    <BrowserRouter>
    {/* Conditionally render Header and Nav based on token existence */}
    {token && <Header />}
    {token && <Nav />}
    
   
    <ToastContainer/>
      <Routes>
 
        <Route path='/' element={<Register />} />;
        
        <Route path='/login' element={<Login />} />;
        <Route path='/home' element={<Home />} />;
        <Route path='/newproduct' element={<ProductForm />} />;
        <Route path='/wishlist' element={<Wishlist />} />;
        <Route path="/offers" element={<MyOffers/>}/>;
        <Route path="/myprofile" element={<MyProfile/>}/>
        <Route path="/edit/:id" element={<ProfileEdit/>}/>

      
 
      </Routes>
    </BrowserRouter>
    </store.Provider>
  );
}

export default App;
