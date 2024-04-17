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
const react_router_dom_1 = require("react-router-dom");
const joi_1 = __importDefault(require("joi"));
const axios_1 = __importDefault(require("axios"));
const js_cookie_1 = __importDefault(require("js-cookie"));
const react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
const react_redux_1 = require("react-redux");
const registerUserSlice_1 = require("../store/slice/registerUserSlice");
const Register = () => {
    const [loading, setLoading] = (0, react_1.useState)(false); // loading state
    const [errors, setErrors] = (0, react_1.useState)({}); // joi errors
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const token = js_cookie_1.default.get("token");
    (0, react_1.useEffect)(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, []);
    // Form validation
    const registerSchema = joi_1.default.object({
        name: joi_1.default.string().required(),
        email: joi_1.default.string().email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] }
        }).required(),
        password: joi_1.default.string().min(3).max(12).required(),
        confirmPassword: joi_1.default.string().valid(joi_1.default.ref('password')).required().messages({ 'any.only': 'Passwords must match', })
    });
    const [data, setData] = (0, react_1.useState)({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => {
            return Object.assign(Object.assign({}, preve), { [name]: value });
        });
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const { error } = registerSchema.validate(data, { abortEarly: true });
        // getting the errors in valErr
        if (error) {
            const valErr = {};
            error.details.map((err) => {
                valErr[err.path[0]] = err.message;
            });
            setErrors(valErr);
            return;
        }
        setLoading(true);
        const response = yield dispatch((0, registerUserSlice_1.registerUser)(data));
        if (response.payload.success === true) {
            react_toastify_1.toast.success(response.payload.message);
            navigate("/login");
        }
        else {
            react_toastify_1.toast.error(response.payload.message);
        }
        setLoading(false);
        setErrors({});
    });
    return (<div className="container mt-5 w-50">
            <form className='w-50 p-4 shadow-lg border mx-auto' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={data.name} onChange={handleChange}/>
                    <small className="text-danger">{errors.name}</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={data.email} onChange={handleChange}/>
                    <small className="text-danger">{errors.email}</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={data.password} onChange={handleChange}/>
                    <small className="text-danger">{errors.password}</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={data.confirmPassword} onChange={handleChange}/>
                    <small className="text-danger">{errors.confirmPassword}</small>
                </div>
                <p>Already have an account?<span><react_router_dom_1.NavLink to="/login" className="text-decoration-none"> Login</react_router_dom_1.NavLink></span></p>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? 'Loading...' : 'Register'}</button>
            </form>
        </div>);
};
exports.default = Register;
