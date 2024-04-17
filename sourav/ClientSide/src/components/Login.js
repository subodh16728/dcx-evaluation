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
const react_router_dom_1 = require("react-router-dom");
const react_router_dom_2 = require("react-router-dom");
const react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
const Login = () => {
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_2.useNavigate)();
    const [data, setData] = (0, react_1.useState)({
        email: "",
        password: ""
    });
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => {
            return Object.assign(Object.assign({}, preve), { [name]: value });
        });
    };
    console.log("data", data);
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            const response = yield fetch('http://localhost:4000/api/user/login', {
                method: 'post',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify(data)
            });
            const dataResponse = yield response.json();
            console.log(dataResponse);
            if (dataResponse.error) {
                react_toastify_1.toast.error(dataResponse.message);
            }
            if (!dataResponse.success) {
                react_toastify_1.toast.error(dataResponse.message);
            }
            if (dataResponse.success) {
                react_toastify_1.toast.success(dataResponse.message);
                console.log(dataResponse.token);
                localStorage.setItem('token', dataResponse.token);
                navigate('/');
            }
        }
        catch (error) {
            console.error('An error occurred:', error);
            react_toastify_1.toast.error('An error occurred while processing your request.');
        }
    });
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (<div className="login-container shadow">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={data.email} placeholder="Enter your Email" onChange={handleOnChange}/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="password-input">
            <input type={showPassword ? 'text' : 'password'} name="password" value={data.password} placeholder="Enter your password" onChange={handleOnChange}/>
            <i className={`password-toggle ${showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}`} onClick={togglePasswordVisibility}></i>
          </div>
        </div>
        <button type="submit" className="btn-sign">Login</button>
        <p>Don't have an account?<a href="#"> <react_router_dom_1.NavLink to="/signup" className="link"> Sign up here</react_router_dom_1.NavLink></a></p>
      </form>
    </div>);
};
exports.default = Login;
