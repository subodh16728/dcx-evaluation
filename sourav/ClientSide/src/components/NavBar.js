"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_router_dom_2 = require("react-router-dom");
const jwt_decode_1 = require("jwt-decode");
const Navbar = () => {
    let token = localStorage.getItem("token");
    const navigate = (0, react_router_dom_2.useNavigate)();
    const handleLogOut = () => {
        localStorage.clear();
        navigate("/login");
    };
    // Decode the token to access its payload
    let decodedToken = null;
    if (token) {
        decodedToken = (0, jwt_decode_1.jwtDecode)(token);
    }
    return (<nav className="navbar">
            <div className="navbar-container">
                <react_router_dom_1.NavLink to="/" className="logo-link">
                    <img src="/flipkart-logo.png" alt="Flipkart" className="logo"/>
                </react_router_dom_1.NavLink>
                <react_router_dom_1.NavLink to="/" className="nav-link ms-5" style={{ textDecoration: 'none' }}>
                    Products
                </react_router_dom_1.NavLink>
                <react_router_dom_1.NavLink to="/addProduct" className="nav-link ms-5" style={{ textDecoration: 'none' }}>
                    Add Products
                </react_router_dom_1.NavLink>

            </div>
            <div className='navbar-container me-2'>
                <ul className="nav-links">
                        <li className="username">
                            {decodedToken && decodedToken.name ? `Welcome ${decodedToken.name}!` : ""}
                        </li>
                        
                        

                    {token ? <button className="login-button logout-button" onClick={handleLogOut}>Logout</button> : <li><react_router_dom_1.NavLink to="/login" className="login-button">Login</react_router_dom_1.NavLink></li>}
                </ul>

            </div>
        </nav>);
};
exports.default = Navbar;
