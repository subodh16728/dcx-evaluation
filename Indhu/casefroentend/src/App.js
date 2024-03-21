
import './App.css';
import { Routes, Route } from 'react-router-dom';
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
import Main from './components/Main';



function App() {


  return (
   <>
    
    <Header/>
    <Nav/>
    
    <ToastContainer/>
      <Routes>

        <Route path='/' element={<Register />} />;
        <Route path='/login' element={<Login />} />;
        <Route path='/' element={<Main />} >;
        <Route path='/home' element={<Home />} />;
        <Route path='/newproduct' element={<ProductForm />} />;
        <Route path='/wishlist' element={<Wishlist />} />;
        <Route path="/offers" element={<MyOffers/>}/>;
        <Route path="/myprofile" element={<MyProfile/>}/>
        <Route path="/edit/:id" element={<ProfileEdit/>}/>
        </Route>
   </Routes>     </>
    
  );
}

export default App;
