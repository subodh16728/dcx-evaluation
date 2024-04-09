import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import "../css/NavBar.css"
import { useAppSelector } from '../store/slice/hook';
//import { useSelector } from 'react-redux';



const Navbar:React.FC = () => {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.clear()
        navigate("/login")
    }

    //const data:UserDetails = useSelector((state:any) => state.api.data);
    const data = useAppSelector((state) => state.api.data);

    return (
        <div className="navbar">
            <NavLink to="/" className="logo-link">
                <img src="/flipkart-logo.png" alt="Flipkart" className="logo" />
            </NavLink>

            <div className='link-container'>

                <NavLink to="/" className="product-link">
                    Products
                </NavLink>

                <NavLink to="/wishlist" className="wishlist-link">
                    Wish List
                </NavLink>
                <NavLink to="/offers" className="offer-link">
                    Check Offers
                </NavLink>
                <NavLink to="/addProduct" className="add-product-link">
                    Add Products
                </NavLink>

            </div>

            {
                token ? <div className="dropdown-menus">
                    <button className="dropbtn"> {
                        data && token ? <> Welcome {data.name} !</> : ""
                    }
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <NavLink to="/userdetails" className="edit-profile"><i className="fas fa-user-edit me-2"></i>Edit Profile</NavLink>
                        <button className="logout-button" onClick={handleLogOut}><i className="fa fa-sign-out me-2"></i>Logout</button>
                    </div>
                </div> : <div className="login-btn"> <NavLink to="/login" className="login-buttons">Login</NavLink> </div>    
            }

        </div>
    );
};

export default Navbar;
