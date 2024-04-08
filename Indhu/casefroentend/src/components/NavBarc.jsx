// NavBarc.js
import React, { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export default function NavBarc() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const hiddenPaths = ['/', '/login'];
  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#E34C77' }}>
      <div className="container-fluid">
        <b className="navbar-brand ms-2">
          <i className="bi bi-shop-window"></i>
        </b>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/newproduct">Add Product</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/offers">My Offers</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              
              <NavLink className="nav-link text-white" to="/wishlist"> <i class="bi bi-heart"></i> Wishlist </NavLink>
            </li>
          </ul>

          
        </div>
      </div>
    </nav>
  );
}
