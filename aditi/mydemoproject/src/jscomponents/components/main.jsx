"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const getUserslice_1 = require("../store/slice/getUserslice");
const hooks_1 = require("../store/slice/hooks");
const Main = () => {
    let userID = localStorage.getItem("userId");
    const dispatch = (0, hooks_1.useAppDispatch)();
    if (userID) {
        dispatch((0, getUserslice_1.fetchUserDetails)(userID));
    }
    return (<react_router_dom_1.Outlet />);
};
exports.default = Main;
