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
exports.getWishlistedProducts = exports.modifyById = exports.getUserById = exports.signInUser = exports.signUpUser = void 0;
const axios_1 = __importDefault(require("axios"));
const baseUrl = 'http://localhost:4000/api/users';
const signUpUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(`${baseUrl}/signup`, user);
    if (response.status == 200) {
        const users = yield response.data;
        return users;
    }
});
exports.signUpUser = signUpUser;
const signInUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(`${baseUrl}/signin`, user);
    if (response.status == 200) {
        const users = yield response.data;
        return users;
    }
});
exports.signInUser = signInUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const response = yield axios_1.default.get(`${baseUrl}/${id}`);
    if (response.status == 200) {
        const users = yield response.data;
        return users;
    }
});
exports.getUserById = getUserById;
const modifyById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.put(`${baseUrl}/wishlist/${id}`, data);
        return response.data;
    }
    catch (error) {
        // throw new Error("Error wishlisting Product:",error);
    }
});
exports.modifyById = modifyById;
const getWishlistedProducts = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`${baseUrl}/wishlist/${id}`);
    if (response.status == 200) {
        const users = yield response.data;
        return users;
    }
});
exports.getWishlistedProducts = getWishlistedProducts;
