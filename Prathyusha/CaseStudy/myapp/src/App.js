import React, { useState, useContext, createContext, useEffect } from 'react';
import './App.css';
import Main from './components/Main';
import Nav from './components/Nav';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import AddProduct from './components/addProduct';
import BookmarkedList from './components/Bookmarked';
import Profile from './components/myProfile';
import OfferList from './components/offersList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Features from './components/Features';
import ProductDetails from './components/viewProduct';
import EditProduct from './components/editProduct';
import { ToastContainer } from 'react-toastify';


export const store = createContext();

const App = () => {
  const storedToken = localStorage.getItem('token'); // Retrieve token from localStorage

  const [token, setToken] = useState(storedToken); // Initialize token state with stored token value

  useEffect(() => {
    // Store token in localStorage whenever it changes
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <store.Provider value={{ token, setToken }}>
      <ToastContainer />
      <div>
        <Nav />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/bookmark' element={<BookmarkedList />} />
            <Route path='/myprofile' element={<Profile />} />
            <Route path='/offers' element={<OfferList />} />
            <Route path='/fea' element={<Features />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/products/edit/:productId" element={<EditProduct/>} />
          </Route>
        </Routes>
      </div>
    </store.Provider>
  );
}

export default App;
  