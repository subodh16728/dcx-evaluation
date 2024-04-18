// NavBarc.js
import React, { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/slice/hooks";

export default function NavBarc() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const data = useAppSelector((state) => state.api.data);
  console.log(data);
  
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  const handleLogOut = () => {
    localStorage.clear()
    navigate("/login")
}

  // const hiddenPaths = ['/', '/login'];
  // if (hiddenPaths.includes(location.pathname)) {
  //   return null;
  // }

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#E34C77' }}>
      <div className="container-fluid">
      <NavLink to="/" className="logo-link">
                    <img src="/Myntra1.jpg" alt="Flipkart" className="logo" />
                </NavLink>       
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/newproduct">Add Product</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/offers">My Offers</NavLink>
            </li>
          </ul>
          <div className="welcomeMessage">
                {data && (
                    <div className="dropdown">
                    <button
                  className="btn btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <b>
                    <span className="text-white">Welcome {data.name}!</span>
                  </b>
                </button>
                <ul className="dropDownItemmenu dropdown-menu">
                  <li>
                    <a className="dropDownItem dropdown-item" href="#" onClick={handleLogOut}>
                    <i className="bi bi-box-arrow-right"></i> Logout 
                    </a>
                  </li>
                  <li>
                    <a className="dropDownItem dropdown-item" href="/myprofile">
                    <i className="bi bi-person"></i> My Profile
                    </a>
                  </li>
                 
                  
                </ul>
                </div>
         
                )}</div>

          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              
              <NavLink className="nav-link text-white" to="/wishlist"> <i className="bi bi-heart"></i> </NavLink>
            </li>
            
            <li className="nav-item">
              
              <NavLink className="nav-link text-white" to="/login"> Login </NavLink>
            </li>

          </ul>

          
        </div>
      </div>
    </nav>
  );
}
