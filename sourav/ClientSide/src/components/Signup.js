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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_toastify_1 = require("react-toastify");
const react_router_dom_1 = require("react-router-dom");
const react_router_dom_2 = require("react-router-dom");
require("react-toastify/dist/ReactToastify.css");
const Signup = () => {
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_2.useNavigate)();
    const [data, setData] = (0, react_1.useState)({
        name: "",
        email: "",
        gender: "",
        password: "",
        confirmpassword: ""
    });
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => {
            return Object.assign(Object.assign({}, preve), { [name]: value });
        });
    };
    console.log("data", data);
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (data.password !== data.confirmpassword) {
            react_toastify_1.toast.error("Password and confirm password must be same !");
            return;
        }
        try {
            const response = yield fetch("http://localhost:4000/api/user/signup", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const dataResponse = yield response.json();
            if (dataResponse.error) {
                react_toastify_1.toast.error(dataResponse.message);
            }
            if (dataResponse.success) {
                react_toastify_1.toast.success(dataResponse.message);
                setData({
                    name: "",
                    email: "",
                    gender: "",
                    password: "",
                    confirmPassword: ""
                });
                navigate('/login');
            }
        }
        catch (error) {
            console.error("Error during fetch operation:", error);
            react_toastify_1.toast.error("An error occurred while processing your request");
        }
    });
    return (<div className="signup-container shadow">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Email</label>
          <input type="email" value={data.email} name="email" id="email" placeholder='example@gmail.com' onChange={handleOnChange}/>
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="password-input">
            <input type={showPassword ? 'text' : 'password'} name='password' id='password' value={data.password} onChange={handleOnChange} className="form-control" placeholder="Enter your password"/>
            <i className={`password-toggle ${showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}`} onClick={togglePasswordVisibility}></i>
          </div>
          <label>Confirm Password</label>
          <div className="password-input">
            <input type={showPassword ? 'text' : 'password'} name='confirmpassword' id='confirmpassword' value={data.confirmpassword} onChange={handleOnChange} className="form-control" placeholder="Confirm your password"/>

          </div>
        </div>
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={data.name.charAt(0).toUpperCase() + data.name.slice(1)} name="name" id="name" placeholder='Enter your name' onChange={handleOnChange}/>
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={data.gender} onChange={handleOnChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button className="btn-sign">Sign-up</button>
        <p>Already have an account? <react_router_dom_1.NavLink to="/login" className="link"> Login here</react_router_dom_1.NavLink></p>
      </form>
    </div>);
};
exports.default = Signup;
