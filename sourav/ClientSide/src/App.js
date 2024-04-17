import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ProductDetails from "./components/ProductDetails";
import NavBar from "./components/NavBar";
import Signup from "./components/Signup";
import Parent from './components/Parent';
import AddProduct from './components/AddProduct';
import UserDetails from './components/UserDetails';
import Offers from './components/Offers';
import WishListProduct from './components/WishlistMarkProduct';
import ProductFeature from './components/ProductFeature';

function App() {

 
  return (
    <>
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Parent />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/addProduct/:id" element={<AddProduct />} />
          <Route path="/userDetails" element={<UserDetails />} />
          <Route path="/wishlist" element={<WishListProduct />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/addProduct/feature" element={<ProductFeature />} />
        </Route>
      </Routes>
    </>

  );
}

export default App;
