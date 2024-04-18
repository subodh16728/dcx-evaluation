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
const react_router_dom_1 = require("react-router-dom");
const userDetailsSlice_1 = require("../store/slice/userDetailsSlice");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const Login_1 = __importDefault(require("../components/Login"));
const js_cookie_1 = __importDefault(require("js-cookie"));
const Main = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const token = js_cookie_1.default.get("token");
    (0, react_1.useEffect)(() => {
        if (token) {
            fetchUserDetails();
        }
    });
    const fetchUserDetails = () => __awaiter(void 0, void 0, void 0, function* () {
        yield dispatch((0, userDetailsSlice_1.userDetails)());
    });
    return (<>
            {token ? <react_router_dom_1.Outlet /> : <Login_1.default />}
        </>);
};
exports.default = Main;
