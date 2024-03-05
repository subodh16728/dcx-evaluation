import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ProductDetails from "./components/ProductDetails";
import NavBar from "./components/NavBar";
import Signup from "./components/Signup";
import AddProduct from './components/AddProduct';

function App() {

  const token = localStorage.getItem("token")
  console.log("local storage token: " + token);
 

  return (
    <>

      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/addProduct" element={<AddProduct/>}/>
      </Routes>
    </>

  );
}

export default App;
