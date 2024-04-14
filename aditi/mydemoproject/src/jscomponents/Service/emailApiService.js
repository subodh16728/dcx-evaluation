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
exports.sendEmailtoUser = void 0;
const axios_1 = __importDefault(require("axios"));
const baseUrl = 'http://localhost:4000/api/email';
const sendEmailtoUser = (email, data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(`${baseUrl}/sendemail`, { email, data });
    if (response.status === 200) {
        const products = yield response.data;
        return products;
    }
    else {
        return null;
    }
});
exports.sendEmailtoUser = sendEmailtoUser;
