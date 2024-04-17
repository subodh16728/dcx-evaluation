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
require("bootstrap/dist/css/bootstrap.min.css");
const react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
const react_router_dom_1 = require("react-router-dom");
const react_router_dom_2 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
const jwt_decode_1 = require("jwt-decode");
function Login() {
    const [token, setToken] = (0, react_1.useState)();
    const [data, setData] = (0, react_1.useState)({
        email: "",
        password: "",
    });
    const changeHandler = e => {
        setData(Object.assign(Object.assign({}, data), { [e.target.name]: e.target.value }));
    };
    const submitHandler = e => {
        e.preventDefault();
        axios_1.default.post("http://localhost:3000/api/login", data)
            .then(res => {
            react_toastify_1.toast.success("Logged in Successfully");
            const token = res.data.token;
            localStorage.setItem("token", token);
            const UserId = (0, jwt_decode_1.jwtDecode)(token).user.id;
            // console.log(UserId);
            localStorage.setItem("userId", UserId);
            setToken(token);
        })
            .catch(err => {
            console.log(err);
            react_toastify_1.toast.error("Incorrect Email or Password");
        });
    };
    if (token) {
        return <react_router_dom_1.Navigate to="/home"/>;
    }
    return (<div className="d-flex justify-content-center align-items-center  vh-100">
        <div className="bg-white p-3 rounded w-25">
            <h2>Login</h2>
            <form onSubmit={submitHandler}>
                
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <input type="email" placeholder="Enter email" id="email" autoComplete="off" name="email" className="form-control rounded-0" required onChange={changeHandler}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password">
                        <strong>Password</strong>
                    </label>
                    <input type="password" placeholder="Enter Password" id="password" autoComplete="off" name="password" className="form-control rounded-0" required onChange={changeHandler}/>
                </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">Login</button>
                <p>New User Please Create Account</p>

                <react_router_dom_2.NavLink to="/" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Register</react_router_dom_2.NavLink>
            </form>

        </div>

    </div>);
}
exports.default = Login;
