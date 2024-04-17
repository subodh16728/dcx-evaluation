"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const getUserSlice_1 = require("../store/slice/getUserSlice");
const Main = () => {
    const [UserId, setUserId] = (0, react_1.useState)({});
    const dispatch = (0, react_redux_1.useDispatch)();
    (0, react_1.useEffect)(() => {
        const UserId = localStorage.getItem("userId");
        setUserId(UserId);
        dispatch((0, getUserSlice_1.fetchUserDetails)(UserId));
    });
    return (<react_router_dom_1.Outlet />);
};
exports.default = Main;
