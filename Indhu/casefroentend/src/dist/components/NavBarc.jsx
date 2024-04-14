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
// NavBarc.js
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
function NavBarc() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const token = localStorage.getItem("token");
    const location = (0, react_router_dom_1.useLocation)();
    (0, react_1.useEffect)(() => {
        if (!token) {
            navigate("/login");
        }
    }, []);
    const hiddenPaths = ['/', '/login'];
    if (hiddenPaths.includes(location.pathname)) {
        return null;
    }
    return (<nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#E34C77' }}>
      <div className="container-fluid">
        <b className="navbar-brand ms-2">
          <i className="bi bi-shop-window"></i>
        </b>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <react_router_dom_1.NavLink className="nav-link text-white" to="/home">Home</react_router_dom_1.NavLink>
            </li>
            <li className="nav-item">
              <react_router_dom_1.NavLink className="nav-link text-white" to="/newproduct">Add Product</react_router_dom_1.NavLink>
            </li>
            <li className="nav-item">
              <react_router_dom_1.NavLink className="nav-link text-white" to="/offers">My Offers</react_router_dom_1.NavLink>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              
              <react_router_dom_1.NavLink className="nav-link text-white" to="/wishlist"> <i className="bi bi-heart"></i> Wishlist </react_router_dom_1.NavLink>
            </li>
          </ul>

          
        </div>
      </div>
    </nav>);
}
exports.default = NavBarc;
