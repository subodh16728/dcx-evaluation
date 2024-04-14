
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Wishlist from './components/Wishlist';
import MyOffers from './components/Myoffers';
import MyProfile from './components/MyProfile';
import ProfileEdit from './components/Edit';
import { ToastContainer } from 'react-toastify';

import Main from "./components/Main";

import ProductDetails from './components/ProductDetails';
import NavBar from './components/NavBarc';
import HeaderBar from './components/Header';
import AddModify from './components/Addnew';
import Features from './components/feature';



function App() {


  return (
   <>
    
   
   
    <HeaderBar/>
    <NavBar/>
    
    
    <ToastContainer/>
      <Routes>

        <Route path='/' element={<Register />} />;
        <Route path='/login' element={<Login />} />;
        <Route path='/' element={<Main />} >;
        <Route path='/home' element={<Home />} />;
        <Route path='/newproduct' element={<AddModify />} />;
        <Route path="/update/:id" element={<AddModify />} />

        <Route path="/feature" element={<Features/>}/>
        <Route path='/wishlist' element={<Wishlist />} />;
        <Route path="/offers" element={<MyOffers/>}/>;
        <Route path="/myprofile" element={<MyProfile/>}/>
        <Route path="/edit/:id" element={<ProfileEdit/>}/>
        <Route path="/productdetails/:id" element={<ProductDetails/>}/>
        
        </Route>
   </Routes>     </>
    
  );
}

export default App;
