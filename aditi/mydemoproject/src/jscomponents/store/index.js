"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const getUserslice_1 = __importDefault(require("./slice/getUserslice"));
const store = (0, toolkit_1.configureStore)({
    reducer: {
        api: getUserslice_1.default
    }
});
exports.default = store;
