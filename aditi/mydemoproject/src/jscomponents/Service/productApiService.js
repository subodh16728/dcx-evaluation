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
exports.getsearchedProducts = exports.getBookmarkedProducts = exports.modifyById = exports.postProduct = exports.getProductById = exports.searchProductsByName = exports.getNewProducts = exports.getproductByCategory = exports.getproducts = void 0;
const axios_1 = __importDefault(require("axios"));
const baseUrl = 'http://localhost:4000/api/product';
const getproducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(baseUrl);
    if (response.status === 200) {
        const products = yield response.data;
        return products;
    }
    else {
        return null;
    }
});
exports.getproducts = getproducts;
const postProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(baseUrl, data);
    if (response.status === 200) {
        const products = yield response.data;
        return products;
    }
    else {
        return null;
    }
});
exports.postProduct = postProduct;
const getproductByCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`${baseUrl}/category?category=${category}`);
    if (response.status === 200) {
        const products = yield response.data;
        return products;
    }
});
exports.getproductByCategory = getproductByCategory;
const getNewProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`${baseUrl}/newproducts`);
    if (response.status === 200) {
        const products = yield response.data;
        return products;
    }
});
exports.getNewProducts = getNewProducts;
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`${baseUrl}/${id}`);
    if (response.status == 200) {
        const products = yield response.data;
        return products;
    }
});
exports.getProductById = getProductById;
const searchProductsByName = (product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${baseUrl}/search?productName=${product}`);
        return response.data;
    }
    catch (error) {
        // throw new Error('Error searching product:', error);
    }
});
exports.searchProductsByName = searchProductsByName;
const modifyById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.put(`${baseUrl}/update/${id}`, data);
        return response.data;
    }
    catch (error) {
        // throw new Error("Error Updating Product:",error);
    }
});
exports.modifyById = modifyById;
const getBookmarkedProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`${baseUrl}/bookmarked`);
    if (response.status === 200) {
        const products = yield response.data;
        return products;
    }
    else {
        return null;
    }
});
exports.getBookmarkedProducts = getBookmarkedProducts;
const getsearchedProducts = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`${baseUrl}/search/getProduct?q=${searchTerm}`);
    if (response.status === 200) {
        const products = yield response.data;
        return products;
    }
    else {
        return null;
    }
});
exports.getsearchedProducts = getsearchedProducts;
