import "./CSS/Header.css";
import React, { useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux'

export default function HeaderBar() {
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
                <div className="welcomeMessage">
                {data && (
                    <div class="dropdown">
                    <button
                  class="btn btn-outline-dark dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <b>
                    <span className="text-white">Welcome {data.name}!</span>
                  </b>
                </button>
                <ul class="dropDownItemmenu dropdown-menu">
                  <li>
                    <a class="dropDownItem dropdown-item" href="#" onClick={handleLogOut}>
                      Logout <i class="bi bi-box-arrow-right"></i>
                    </a>
                  </li>
                  <li>
                    <a class="dropDownItem dropdown-item" href="/myprofile">
                    <i class="bi bi-person"></i>  User Profile
                    </a>
                  </li>
                </ul>
                </div>
         
                )}</div>
               
                
            </header>
        </div>
    )
}
