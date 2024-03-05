import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
    let token = localStorage.getItem("token");
    const navigate = useNavigate()

    const handleLogOut = () => {
        localStorage.clear()
        navigate("/login")
    }

    // Decode the token to access its payload
    let decodedToken = null;
    if (token) {
        decodedToken = jwtDecode(token);
    }



    return (
        <nav className="navbar">
            <div className="navbar-container">
                <NavLink to="/" className="logo-link">
                    <img src="/flipkart-logo.png" alt="Flipkart" className="logo" />
                </NavLink>
                <NavLink to="/" className="nav-link ms-5" style={{ textDecoration: 'none' }}>
                    Products
                </NavLink>
                <NavLink to="/addProduct" className="nav-link ms-5" style={{ textDecoration: 'none' }}>
                    Add Products
                </NavLink>

            </div>
            <div className='navbar-container me-2'>
                <ul className="nav-links">
                        <li className="username">
                            {
                                decodedToken && decodedToken.name ? `Welcome ${decodedToken.name}!` : ""
                            }
                        </li>
                        
                        

                    {
                        token ? <button className="login-button logout-button" onClick={handleLogOut}>Logout</button> : <li><NavLink to="/login" className="login-button">Login</NavLink></li>
                    }
                </ul>

            </div>
        </nav>
    );
};

export default Navbar;
