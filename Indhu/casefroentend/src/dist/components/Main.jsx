"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const getUserSlice_1 = require("../store/slice/getUserSlice");
const react_2 = __importDefault(require("react"));
const hooks_1 = require("../store/slice/hooks");
const Main = () => {
    // const [UserId,setUserId]=useState({});
    const dispatch = (0, hooks_1.useAppDispatch)();
    (0, react_1.useEffect)(() => {
        const UserId = localStorage.getItem("userId");
        // setUserId(UserId);
        if (UserId) {
            dispatch((0, getUserSlice_1.fetchUserDetails)(UserId));
        }
    });
    return (<react_router_dom_1.Outlet />);
};
exports.default = Main;
