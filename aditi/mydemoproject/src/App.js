
import SignIn from './components/signin';
import SignUp from './components/signup';
import ProductDetails from './components/productDetail';
import { Route,Routes } from 'react-router-dom';
import Product from './components/product';
import PageNotFound from './components/pagenotfound';
import AddModify from './components/addmodify';
import WishList from './components/wishlist';
import Offers from './components/offer';
import { ToastContainer,toast } from 'react-toastify';
import Nav from './components/navbar';
import Product from './components/product';

function App() {
  return (
    <>
    <Nav/>
    <ToastContainer/>
    <Routes>
    <Route path = "/" element={<Product/>}/>
    <Route path ="/signup" element={<SignUp />} />
    <Route path ="/signin" element={< SignIn/>} />
    <Route path ="/product/add" element={<AddModify/>}/>
    <Route path ="/product/modify/:id" element={<AddModify/>}/>
    <Route path ="/product/wishlist" element={<WishList/>}/>
    <Route path ="/productDetails/:id" element={<ProductDetails />} />
    <Route path ="/product/offer" element={<Offers/>}/>
    <Route path="*" element={<PageNotFound />} />
    </Routes>

    </>
  );
}

export default App;
