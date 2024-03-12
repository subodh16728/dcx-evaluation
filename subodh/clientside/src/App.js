import './App.css';
import Navbar from './components/Navbar';
import Login from "./components/Login";
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Bookmarks from './components/Bookmarks';
import Offers from './components/Offers';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products/add' element={<Products />} />
        <Route path='/bookmarks' element={<Bookmarks />} />
        <Route path='/offers' element={<Offers />} />
        <Route path='/products/edit/:id' element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
