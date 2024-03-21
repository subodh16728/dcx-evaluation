import "./CSS/Header.css";
import React, { useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux'

export default function Header() {
    const token = localStorage.getItem("token")
    const data = useSelector((state) => state.api.data);
    console.log(data);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [])

    const hiddenPaths = ['/', '/login'];
    if (hiddenPaths.includes(location.pathname)) {
        return null;
    }

    const handleLogOut = () => {
        localStorage.clear()
        navigate("/login")
    }

    return (
        <div className="bodyy">
            <header>
                <div className='headerLogo'>
                    <img src="./mobile.jpg" alt="The Cupcake Maker Logo" />
                    The Mobile Products
                </div>
                {data && (
                    <div className="welcomeMessage"><h4>Welcome {data.name}</h4></div>
                )}
                <button onClick={handleLogOut} className="nav-link">  Logout</button>
                <NavLink className="nav-link" to="/wishlist"><i class="bi bi-heart"></i></NavLink>
            </header>
        </div>
    )
}
