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
const react_router_dom_1 = require("react-router-dom");
const react_1 = __importStar(require("react"));
const joi_1 = __importDefault(require("joi"));
const react_router_dom_2 = require("react-router-dom");
const userApiService_1 = require("../Service/userApiService");
const react_toastify_1 = require("react-toastify");
require("../css/signin.css");
function SignIn() {
    const [user, setUser] = (0, react_1.useState)({
        email: "",
        password: "",
    });
    const signInUserInfo = () => __awaiter(this, void 0, void 0, function* () {
        try {
            let receivedInfo = yield (0, userApiService_1.signInUser)(user);
            if (receivedInfo.success) {
                if (localStorage.getItem("token")) {
                    react_toastify_1.toast.success(localStorage.getItem("name") + " already logged in");
                    navigate("/");
                }
                else {
                    react_toastify_1.toast.success(receivedInfo.message);
                    localStorage.setItem("token", receivedInfo.token);
                    localStorage.setItem("userId", receivedInfo.id);
                    localStorage.setItem("name", receivedInfo.name);
                    navigate("/");
                }
            }
        }
        catch (err) {
            setErrRes(err);
        }
    });
    const [errors, setErrors] = (0, react_1.useState)(null);
    const [errRes, setErrRes] = (0, react_1.useState)(null);
    const navigate = (0, react_router_dom_2.useNavigate)();
    const schema = joi_1.default.object({
        email: joi_1.default.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "in"] } })
            .required(),
        password: joi_1.default.string().regex(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    });
    const validate = () => {
        const errors = {};
        const { error } = schema.validate(user, {
            abortEarly: false,
        });
        if (error) {
            let valError = {};
            for (let item of error.details) {
                valError[item.path[0]] = item.message;
            }
        }
        return Object.keys(errors).length === 0 ? null : errors;
    };
    const handleChange = (event) => {
        let tempUser = Object.assign({}, user);
        tempUser[event.target.name] = event.target.value;
        setUser(tempUser);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (validationErrors)
            return;
        signInUserInfo();
    };
    return (<>
        <div className="signinmain">
          {errRes && (<div className="alert alert-danger" role="alert">
              {errRes.response.data.message}
            </div>)}
          <div className="signinformContainer">
            <p className="h4 text-white bg-secondary p-2 text-center">Login</p>
            <form className=" border border-secondary p-3  " onSubmit={handleSubmit}>
              <div className="mb-2">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input name="email" value={user.email} onChange={handleChange} placeholder="Enter your email" id="email" type="email" className="form-control"/>
                {errors && (<small className="text-danger">{errors.email}</small>)}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input name="password" value={user.password} onChange={handleChange} placeholder="Enter your password" id="password" type="password" className="form-control" autoComplete="current-password"/>
                {errors && (<small className="text-danger">{errors.password}</small>)}
              </div>
              <div className="d-grid gap-2">
                <input type="submit" className="btn btn-secondary"/>
              </div>
              <div className="m-2">
                <p>
                  <small> Don't have an account? </small>
                  <react_router_dom_1.Link to="/signup" className="link">
                    <b>Signup</b>
                  </react_router_dom_1.Link>
                </p>
              </div>
            </form>
          </div>
        </div>
    </>);
}
exports.default = SignIn;
