
import "./CSS/Header.css";
import React,{useEffect} from "react";
import { NavLink ,useNavigate,useLocation} from "react-router-dom";


export default function Header() {
    const token = localStorage.getItem("token")
 
    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [])
  
    const location=useLocation();
    const navigate=useNavigate();

    const hiddenPaths = [ '/', '/login'];
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
            
              
                <button onClick={handleLogOut} className="nav-link">  Logout</button>
                <NavLink className="nav-link" to="/wishlist">Wishlist</NavLink>
        

            </header>
        </div>

    )
}