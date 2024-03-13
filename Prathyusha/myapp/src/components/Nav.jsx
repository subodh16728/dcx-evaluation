import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div>Navbar</div>
            <div className="navbar-links">
                <NavLink to="/register">Register</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/add">Add Product</NavLink>
                
            </div>
        </nav>
    );
}

export default Navbar;
