import React,{useContext} from "react";
import "./CSS/Header.css";
import { NavLink } from "react-router-dom";
import { store } from "../App";
export default function Header() {
    const [token,setToken]=useContext(store);
    return (

        <div className="bodyy">
            <header>
                <div className='headerLogo'>
                    <img src="./mobile.jpg" alt="The Cupcake Maker Logo" />
                    The Mobile Products
                </div>
            
                {/* <NavLink className="nav-link" to="/myprofile">Logout</NavLink> */}
                <button onClick={()=>setToken(null)} className="nav-link">  Logout</button>
                <NavLink className="nav-link" to="/wishlist">Wishlist</NavLink>
                {/* <NavLink className="nav-link" to="/offers">My Offers</NavLink> */}

            </header>
        </div>

    )
}