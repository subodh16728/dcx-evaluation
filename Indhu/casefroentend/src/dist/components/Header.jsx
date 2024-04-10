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
require("./CSS/Header.css");
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const hooks_1 = require("../store/slice/hooks");
function HeaderBar() {
    const token = localStorage.getItem("token");
    const data = (0, hooks_1.useAppSelector)((state) => state.api.data);
    console.log(data);
    const location = (0, react_router_dom_1.useLocation)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        if (!token) {
            navigate("/login");
        }
    }, []);
    const hiddenPaths = ['/', '/login'];
    if (hiddenPaths.includes(location.pathname)) {
        return null;
    }
    const handleLogOut = () => {
        localStorage.clear();
        navigate("/login");
    };
    return (<div className="bodyy">
            <header>
                <div className='headerLogo'>
                    <img src="./mobile.jpg" alt="The Cupcake Maker Logo"/>
                    The Mobile Products
                </div>
                <div className="welcomeMessage">
                {data && (<div className="dropdown">
                    <button className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <b>
                    <span className="text-white">Welcome {data.name}!</span>
                  </b>
                </button>
                <ul className="dropDownItemmenu dropdown-menu">
                  <li>
                    <a className="dropDownItem dropdown-item" href="#" onClick={handleLogOut}>
                      Logout <i className="bi bi-box-arrow-right"></i>
                    </a>
                  </li>
                  <li>
                    <a className="dropDownItem dropdown-item" href="/myprofile">
                    <i className="bi bi-person"></i>  User Profile
                    </a>
                  </li>
                </ul>
                </div>)}</div>
               
                
            </header>
        </div>);
}
exports.default = HeaderBar;
