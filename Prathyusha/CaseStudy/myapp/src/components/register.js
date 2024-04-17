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
const react_router_dom_1 = require("react-router-dom");
const react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
const Register = () => {
    const [data, setData] = (0, react_1.useState)({
        username: "",
        email: "",
        password: "",
        confirmpassword: ""
    });
    const [errors, setErrors] = (0, react_1.useState)({});
    const navigate = (0, react_router_dom_1.useNavigate)(); // Using useNavigate hook
    const changeHandler = e => {
        setData(Object.assign(Object.assign({}, data), { [e.target.name]: e.target.value }));
        // Clear validation error when user starts typing
        setErrors(Object.assign(Object.assign({}, errors), { [e.target.name]: '' }));
    };
    const validateForm = () => {
        const errors = {};
        if (!data.username.trim()) {
            errors.username = "Username is required";
        }
        if (!data.email.trim()) {
            errors.email = "Email is required";
        }
        else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = "Invalid email address";
        }
        if (!data.password.trim()) {
            errors.password = "Password is required";
        }
        else if (data.password.trim().length < 6) {
            errors.password = "Password must be at least 6 characters";
        }
        if (!data.confirmpassword.trim()) {
            errors.confirmpassword = "Confirm Password is required";
        }
        else if (data.confirmpassword.trim() !== data.password.trim()) {
            errors.confirmpassword = "Passwords do not match";
        }
        return errors;
    };
    const submitHandler = e => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            axios_1.default.post('http://localhost:4000/api/register', data)
                .then(res => {
                console.log(res.data);
                if (res.data.error) {
                    react_toastify_1.toast.error("User already exists"); // user already exists
                }
                else {
                    react_toastify_1.toast.success("Registration successful"); // registration successful
                    // Redirect to login page using useNavigate
                    navigate('/login');
                }
            })
                .catch(err => console.error(err));
        }
        else {
            setErrors(errors);
        }
    };
    return (<div className='register-form'>
            <react_toastify_1.ToastContainer />
            <form onSubmit={submitHandler}>
                <h3>Register</h3>
                <div className="form-group">
                    <input type="text" onChange={changeHandler} name="username" placeholder='Username' className="form-control"/>
                    {errors.username && <div className="text-danger">{errors.username}</div>}
                </div>
                <div className="form-group">
                    <input type="email" onChange={changeHandler} name="email" placeholder='Email' className="form-control"/>
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="form-group">
                    <input type="password" onChange={changeHandler} name="password" placeholder='Password' className="form-control"/>
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
                <div className="form-group">
                    <input type="password" onChange={changeHandler} name="confirmpassword" placeholder='Confirm Password' className="form-control"/>
                    {errors.confirmpassword && <div className="text-danger">{errors.confirmpassword}</div>}
                </div>
                <button type="submit" className="btn btn-primary btn-block">Register</button>
                <p className="text-center mt-3">Already have an account? <react_router_dom_1.NavLink to="/login">Login</react_router_dom_1.NavLink></p>
            </form>
        </div>);
};
exports.default = Register;
