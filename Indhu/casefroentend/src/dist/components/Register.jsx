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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
require("bootstrap/dist/css/bootstrap.min.css");
const react_router_dom_1 = require("react-router-dom");
function Register() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const [data, setData] = (0, react_1.useState)({
        name: "",
        email: "",
        password: "",
        confirmpassword: ""
    });
    const [errors, setErrors] = (0, react_1.useState)({
        name: '',
        email: '',
        password: '',
        confirmpassword: ''
    });
    const changeHandler = (e) => {
        setData(Object.assign(Object.assign({}, data), { [e.target.name]: e.target.value }));
        setErrors(Object.assign(Object.assign({}, errors), { [e.target.name]: '' }));
    };
    const validateForm = () => {
        const newErrors = {
            name: '',
            email: '',
            password: '',
            confirmpassword: ''
        };
        if (!data.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!data.email.trim()) {
            newErrors.email = 'Email is required';
        }
        else if (!/\S+@\S+\.\S+/.test(data.email.trim())) {
            newErrors.email = 'Invalid email format';
        }
        if (!data.password.trim()) {
            newErrors.password = 'Password is required';
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(data.password.trim())) {
            newErrors.password = 'Password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special symbol';
        }
        if (!data.confirmpassword.trim()) {
            newErrors.confirmpassword = 'Confirm Password is required';
        }
        else if (data.confirmpassword !== data.password) {
            newErrors.confirmpassword = 'Passwords and confirm password must match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const submitHandler = (e) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        e.preventDefault();
        if (validateForm()) {
            try {
                const res = yield axios_1.default.post("http://localhost:3000/api/register", data);
                react_toastify_1.toast.success(res.data);
                // Redirect to login page 
                navigate('/home');
            }
            catch (err) {
                console.error(err);
                const errormessage = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data;
                if (errormessage === "User already exists") {
                    react_toastify_1.toast.error("User already exists");
                }
                else {
                    console.error("Error:", err);
                    react_toastify_1.toast.error("An error occurred. Please try again later.");
                }
            }
        }
    });
    const handleShowPasswordToggle = () => {
        setShowPassword(prevState => !prevState);
    };
    return (<div className="d-flex justify-content-center align-items-center vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input type="text" placeholder="Enter Name" id="name" autoComplete="off" name="name" onChange={changeHandler} className={`form-control rounded-0 ${errors.name && 'is-invalid'}`}/>
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input type="email" placeholder="Enter email Ex: abc@gmail.com" id="email" autoComplete="off" name="email" onChange={changeHandler} className={`form-control rounded-0 ${errors.email && 'is-invalid'}`}/>
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input type={showPassword ? 'text' : 'password'} placeholder="Enter password" id="password" autoComplete="off" name="password" onChange={changeHandler} className={`form-control rounded-0 ${errors.password && 'is-invalid'}`}/>
                        <div>
                            <input type="checkbox" id="showPassword" className="check" onChange={handleShowPasswordToggle}/>
                            <label htmlFor="showPassword" className="form-check-label"> &nbsp; Show Password</label>
                        </div>
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmpassword">
                            <strong>Confirm Password</strong>
                        </label>
                        <input type="password" placeholder="Confirm Password" id="confirmpassword" autoComplete="off" name="confirmpassword" onChange={changeHandler} className={`form-control rounded-0 ${errors.confirmpassword && 'is-invalid'}`}/>
                        {errors.confirmpassword && <div className="invalid-feedback">{errors.confirmpassword}</div>}
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
                    <p>Already Have an Account</p>
                    <react_router_dom_1.NavLink to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Login</react_router_dom_1.NavLink>
                </form>
            </div>
        </div>);
}
exports.default = Register;
