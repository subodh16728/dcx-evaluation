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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const js_cookie_1 = __importDefault(require("js-cookie"));
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
require("../App.css");
const Navbar = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const token = js_cookie_1.default.get("token");
    const handleLogout = () => {
        js_cookie_1.default.remove("token");
        js_cookie_1.default.remove("userID");
        navigate("/");
    };
    const name = (0, react_redux_1.useSelector)((state) => (state.userDetails.name));
    return (<>
            <div className='container-fluid navbar-container'>
                <nav className="navbar navbar-expand-lg bg-body-tertiary mb-3">
                    <div className="container-fluid">
                        {/* <NavLink className="navbar-brand" to="/"><i class="bi bi-shop"></i></NavLink> */}
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <react_router_dom_1.NavLink className="nav-link active" aria-current="page" to="/dashboard"><i class="bi bi-house-fill"></i>&nbsp;Dashboard</react_router_dom_1.NavLink>
                                </li>
                                <li className="nav-item">
                                    <react_router_dom_1.NavLink className="nav-link active" aria-current="page" to="/offers"><i class="fa-solid fa-percent"></i>&nbsp;Offers</react_router_dom_1.NavLink>
                                </li>
                                <li className="nav-item">
                                    <react_router_dom_1.NavLink className="nav-link active" aria-current="page" to="/bookmarks"><i class="bi bi-bookmark-fill"></i>&nbsp;Bookmarks</react_router_dom_1.NavLink>
                                </li>
                            </ul>

                            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                                {token ? (<>
                                        <div class="navbar-collapse dropdown-center" id="navbarNavDarkDropdown">
                                            <ul class="navbar-nav">
                                                <li class="nav-item dropdown">
                                                    <a class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <b>Welcome {name}</b>
                                                    </a>
                                                    <ul class="dropdown-menu dropdown-menu-dark dropdown-button">
                                                        <li><a className="dropdown-item" href='javascript:void(0)'>
                                                            <i class="bi bi-person-fill"></i>&nbsp;&nbsp;Profile
                                                        </a></li>
                                                        <li><react_router_dom_1.NavLink className="dropdown-item" onClick={handleLogout} to="/login">
                                                            <i class="bi bi-box-arrow-right"></i>&nbsp;&nbsp;Logout
                                                        </react_router_dom_1.NavLink></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </>) : (<li className="nav-item">
                                        <react_router_dom_1.NavLink className="nav-link active" activeClassName="active" to="/login">
                                            Login
                                        </react_router_dom_1.NavLink>
                                    </li>)}

                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>);
};
exports.default = Navbar;
