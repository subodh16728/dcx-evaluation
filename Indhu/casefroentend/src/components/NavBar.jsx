import { NavLink,useLocation ,useNavigate} from "react-router-dom";
import React,{useEffect} from "react";

export default function Nav() {

  const navigate = useNavigate();
  let token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [])

  const location=useLocation();

  const hiddenPaths = [ '/', '/login'];
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
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/myprofile">My Profile</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
