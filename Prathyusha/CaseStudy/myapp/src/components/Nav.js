"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const App_1 = require("../App");
const react_redux_1 = require("react-redux");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const free_solid_svg_icons_2 = require("@fortawesome/free-solid-svg-icons");
const Navbar = () => {
    const { token, setToken } = (0, react_1.useContext)(App_1.store);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const user = (0, react_redux_1.useSelector)((state) => state.api.data);
    const location = (0, react_router_dom_1.useLocation)();
    const [loggedOut, setLoggedOut] = (0, react_1.useState)(false);
    const [showDropdown, setShowDropdown] = (0, react_1.useState)(false);
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
    !isAuthRoute() && (<nav className="navbar">
                <div className="navbar-links">
                    <react_router_dom_1.NavLink to="/dashboard">Dashboard</react_router_dom_1.NavLink>
                    <react_router_dom_1.NavLink to="/add">Add Product</react_router_dom_1.NavLink>
                    <react_router_dom_1.NavLink to="/bookmark">Bookmarked</react_router_dom_1.NavLink>
                    <react_router_dom_1.NavLink to="/offers">Offers</react_router_dom_1.NavLink>
                </div>
                <div className="navbar-user">
                    {user && (<div className='dropdown-container'>
                            <div className='username' onClick={toggleDropdown}>
                                <strong>Welcome {user.username}!</strong>
                                <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faAngleDown} className="dropdown-icon"/>
                            </div>
                            {showDropdown && (<div className='dropdown-content'>
                                    <button onClick={handleLogout}>
                                    <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_2.faSignOutAlt} className="logout-icon"/>
                                    Logout</button><br />
                                    <div className="navbar-links">
                                    <react_router_dom_1.NavLink to="/myprofile">My Profile</react_router_dom_1.NavLink>
                                    </div>
                                    
                                </div>)}
                        </div>)}                  
                </div>
                {loggedOut && <react_router_dom_1.Navigate to="/login"/>}
            </nav>));
};
exports.default = Navbar;
