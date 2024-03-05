
import SignIn from './components/signin';
import SignUp from './components/signup';
import ProductDetails from './components/productDetail';
import { Route,Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Product from './components/product';
import PageNotFound from './components/pagenotfound';
import AddProduct from './components/addproduct';

function App() {
  return (
    <>
    <Routes>
    <Route path = "/" element={<Dashboard/>}/>
    <Route path ="/signup" element={<SignUp />} />
    <Route path ="/signin" element={< SignIn/>} />
    <Route path ="/product" element={<Product/>}/>
    <Route path ="/product/add" element={<AddProduct/>}/>
    <Route path ="/productDetails/:id" element={<ProductDetails />} />
    <Route path="*" element={<PageNotFound />} />
    </Routes>

    
    </>
  );
}

export default App;
