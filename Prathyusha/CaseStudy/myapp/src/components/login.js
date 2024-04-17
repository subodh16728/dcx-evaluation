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
const axios_1 = __importDefault(require("axios"));
const App_1 = require("../App");
const react_router_dom_1 = require("react-router-dom");
const jwt_decode_1 = require("jwt-decode");
const react_toastify_1 = require("react-toastify");
const Login = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { token, setToken } = (0, react_1.useContext)(App_1.store);
    const [data, setData] = (0, react_1.useState)({
        email: "",
        password: ""
    });
    const [errors, setErrors] = (0, react_1.useState)({});
    const [loginError, setLoginError] = (0, react_1.useState)(null); // State for login error message
    const changeHandler = e => {
        setData(Object.assign(Object.assign({}, data), { [e.target.name]: e.target.value }));
        setLoginError(null); // Clear previous login error message when user starts typing
    };
    const submitHandler = e => {
        e.preventDefault();
        if (!data.email || !data.password) {
            const newErrors = {};
            if (!data.email) {
                newErrors.email = "Email is required";
            }
            if (!data.password) {
                newErrors.password = "Password is required";
            }
            setErrors(newErrors);
            return;
        }
        axios_1.default.post('http://localhost:4000/api/login', data)
            .then(res => {
            const token = res.data.token;
            localStorage.setItem("token", token);
            const userId = (0, jwt_decode_1.jwtDecode)(token).user.id;
            localStorage.setItem("UserId", userId);
            setToken(token);
            console.log(res.data.token);
            console.log(res.data.userId);
            //  dispatch(fetchUserDetails(userId));
            navigate("/dashboard");
            react_toastify_1.toast.success("Login Successful");
        })
            .catch(err => {
            console.error("login failed:", err);
            if (err.response && err.response.status === 401) {
                setLoginError("User does not exist");
            }
        });
    };
    return (<div className='login-container'> 
            <form onSubmit={submitHandler} className="login-form">
                <h3>Login</h3>
                <div className="form-group">
                    <input type="email" onChange={changeHandler} name="email" placeholder='Email' className="form-control"/>
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="form-group">
                    <input type="password" onChange={changeHandler} name="password" placeholder='Password' className="form-control"/>
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
                {loginError && <div className="text-danger">{loginError}</div>} 
                <button type="submit" className="btn btn-primary btn-block">Login</button>
                <p className="text-center mt-3">Don't have an account? <react_router_dom_1.NavLink to="/register">Register</react_router_dom_1.NavLink></p>
            </form>
        </div>);
};
exports.default = Login;
