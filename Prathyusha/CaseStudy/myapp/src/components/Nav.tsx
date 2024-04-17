import React, { useContext, useState } from 'react';
import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { store } from '../App';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

interface RootState {
    api: {
        data: {
            username: string; 
        };
    };
}

const Nav = () => {
    const { token, setToken } = useContext(store);
    const navigate = useNavigate();
    const user = useSelector((state:RootState) => state.api.data);
    const location = useLocation();
    const [loggedOut, setLoggedOut] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false); 

    const handleLogout = () => {
        navigate("/login");
        localStorage.clear();
        setLoggedOut(true);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // Function to check if current route is register or login
    const isAuthRoute = () => {
        return location.pathname === '/register' || location.pathname === '/login';
    };

    return (
        // Render navbar only if not on register or login page
        !isAuthRoute() && (
            <nav className="navbar">
                <div className="navbar-links">
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to="/add">Add Product</NavLink>
                    <NavLink to="/bookmark">Bookmarked</NavLink>
                    <NavLink to="/offers">Offers</NavLink>
                </div>
                <div className="navbar-user">
                    {user && (
                        <div className='dropdown-container'>
                            <div className='username' onClick={toggleDropdown}>
                                <strong>Welcome {user.username}!</strong>
                                <FontAwesomeIcon icon={faAngleDown} className="dropdown-icon" />
                            </div>
                            {showDropdown && (
                                <div className='dropdown-content'>
                                    <button onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
                                    Logout</button><br />
                                    <div className="navbar-links">
                                    <NavLink to="/myprofile">My Profile</NavLink>
                                    </div>
                                    
                                </div>                       
                            )}
                        </div>
                    )}                  
                </div>
                {loggedOut && <Navigate to ="/login" />}
            </nav>
        )
    );
}

export default Nav;


