import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import Nav from './components/Nav';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddProduct from './components/AddProduct';
import BookmarkedList from './components/Bookmarked';
import Profile from './components/MyProfile';
import OfferList from './components/OffersList';
import Features from './components/Features';
import ProductDetails from './components/ViewProduct';
import AddModify from './components/AddProduct';
import { ToastContainer } from 'react-toastify';

export const store = createContext();

const App = () => {
    const storedToken = localStorage.getItem('token');
    const [token, setToken] = useState(storedToken);

    useEffect(() => {
        localStorage.setItem('token', token || '');
    }, [token]);

    return (
        <store.Provider value={{ token, setToken }}>
            <ToastContainer />
            <div>
                <Router>
                    <Nav />
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<Main />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/add" element={<AddProduct />} />
                            <Route path="/bookmark" element={<BookmarkedList />} />
                            <Route path="/myprofile" element={<Profile />} />
                            <Route path="/offers" element={<OfferList />} />
                            <Route path="/features" element={<Features />} />
                            <Route path="/products/:productId" element={<ProductDetails />} />
                            <Route path="/products/edit/:productId" element={<AddModify />} />
                        </Route>
                    </Routes>
                </Router>
            </div>
        </store.Provider>
    );
}

export default App;
