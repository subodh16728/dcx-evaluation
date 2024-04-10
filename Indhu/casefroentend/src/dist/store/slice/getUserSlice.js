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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUserDetails = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
// Action
exports.fetchUserDetails = (0, toolkit_1.createAsyncThunk)("fetchUserDetails", (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("id :" + id);
    const response = yield fetch(`http://localhost:3000/api/${id}`);
    // const data = await response.json(); // Convert response to JSON
    console.log(response.json); // Log the JSON data
    return response.json(); // Return the JSON data
}));
const initialState = {
    isLoading: false,
    data: null,
    isError: false
};
const apiSlice = (0, toolkit_1.createSlice)({
    name: "fetchapi",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(exports.fetchUserDetails
            .pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(exports.fetchUserDetails
            .fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(exports.fetchUserDetails
            .rejected, (state, action) => {
            state.isError = true;
            console.log("Error: ", action.payload);
        });
    }
});
exports.default = apiSlice.reducer;
