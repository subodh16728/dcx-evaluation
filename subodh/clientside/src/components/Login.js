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
const react_1 = __importStar(require("react"));
const react_2 = require("react");
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
const joi_1 = __importDefault(require("joi"));
const js_cookie_1 = __importDefault(require("js-cookie"));
const react_toastify_1 = require("react-toastify");
const react_redux_1 = require("react-redux");
require("react-toastify/dist/ReactToastify.css");
const registerUserSlice_1 = require("../store/slice/registerUserSlice");
const Login = () => {
    const [loading, setLoading] = (0, react_2.useState)(false);
    const [errors, setErrors] = (0, react_2.useState)({});
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const token = js_cookie_1.default.get("token");
    (0, react_1.useEffect)(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, []);
    // Form validation
    const loginSchema = joi_1.default.object({
        email: joi_1.default.string().email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] }
        }).required(),
        password: joi_1.default.string().min(3).max(12).required()
    });
    const [data, setData] = (0, react_2.useState)({
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => {
            return Object.assign(Object.assign({}, preve), { [name]: value });
        });
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const { error } = loginSchema.validate(data, { abortEarly: true });
        if (error) {
            const valErr = {};
            error.details.forEach((err) => {
                valErr[err.path[0]] = err.message;
            });
            setErrors(valErr);
            return;
        }
        setLoading(true);
        if (!token) {
            const response = yield dispatch((0, registerUserSlice_1.loginUser)(data));
            if (response.payload && response.payload.success === true) {
                js_cookie_1.default.set("token", response.payload.token);
                js_cookie_1.default.set("userID", response.payload.userID);
                react_toastify_1.toast.success(response.payload.message);
                navigate("/dashboard");
            }
            else {
                react_toastify_1.toast.error(`Check your credentials`);
            }
        }
        else {
            react_toastify_1.toast.info(`Already logged in`);
            navigate("/dashboard");
        }
        setLoading(false);
        setErrors({});
    });
    return (<>
            <div className="container mt-5 w-50">
                <form className='w-50 mx-auto p-4 shadow-lg border' onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={data.email} onChange={handleChange}/>
                        <small className="text-danger">{errors.email}</small>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" name='password' value={data.password} onChange={handleChange}/>
                        <small className="text-danger">{errors.password}</small>
                    </div>
                    <p>New User?<span><react_router_dom_1.NavLink to="/register" className="text-decoration-none"> Register</react_router_dom_1.NavLink></span></p>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
                </form>
            </div>

        </>);
};
exports.default = Login;
