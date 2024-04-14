"use strict";
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
const react_1 = require("react");
const joi_1 = __importDefault(require("joi"));
const react_router_dom_1 = require("react-router-dom");
const userApiService_1 = require("../Service/userApiService");
require("../css/signup.css");
const SignUp = () => {
    const [user, setUser] = (0, react_1.useState)({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const signUpUserInfo = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let receivedInfo = yield (0, userApiService_1.signUpUser)(user);
            navigate("/signin");
        }
        catch (err) {
            console.log(err);
            setErrRes(err);
        }
    });
    const [errors, setErrors] = (0, react_1.useState)(null);
    const [errRes, setErrRes] = (0, react_1.useState)(null);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const schema = joi_1.default.object({
        username: joi_1.default.string().alphanum().min(3).max(30).required(),
        email: joi_1.default.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "in"] } })
            .required(),
        password: joi_1.default.string().regex(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
        confirmPassword: joi_1.default.string()
            .valid(joi_1.default.ref("password"))
            .required()
            .messages({ "any.only": "Passwords must match" }),
    });
    const validate = () => {
        const errors = {};
        const { error } = schema.validate(user, {
            abortEarly: false,
        });
        console.log("Error", error);
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
    const handleSubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        // Validate the form
        const validationErrors = validate();
        // Set the errors state after the validation
        setErrors(validationErrors);
        // Check if there are validation errors
        if (validationErrors)
            return;
        // Proceed with form submission
        yield signUpUserInfo();
    });
    return (<>
        <div className="signupmain">
          {errRes && (<div className="alert alert-danger" role="alert">
              {errRes.response.data.message}
            </div>)}
          <div className="signupformContainer">
            <p className="h4 text-white bg-secondary p-2 text-center">
              Register
            </p>

            <form onSubmit={handleSubmit} className=" border border-secondary p-3 ">
              <div className="mb-2">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input name="username" value={user.username} onChange={handleChange} placeholder="Enter your username" id="username" type="username" className="form-control"/>
                {errors && (<small className="text-danger">{errors.username}</small>)}
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input name="email" value={user.email} onChange={handleChange} placeholder="Enter your email" id="email" type="email" className="form-control"/>
                {errors && (<small className="text-danger">{errors.email}</small>)}
              </div>
              <div className="mb-2">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input name="password" value={user.password} onChange={handleChange} placeholder="Enter your password" id="password" type="password" className="form-control"/>
                {errors && (<small className="text-danger">{errors.password}</small>)}
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input type="password" placeholder="Re-Enter your password" className="form-control" id="confirmPassword" name="confirmPassword" value={user.confirmPassword} onChange={handleChange}/>
                {errors && (<small className="text-danger">
                    {errors.confirmPassword}
                  </small>)}
              </div>
              <div className="d-grid gap-2">
                <input type="submit" className="btn btn-secondary"/>
              </div>
            </form>
          </div>
        </div>
    </>);
};
exports.default = SignUp;
