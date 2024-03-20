import { configureStore } from "@reduxjs/toolkit"
import apiSlice from "./slice/getProductsSlice";
import registerUserSlice from "./slice/registerUserSlice";
import userDetailsSlice from "./slice/userDetailsSlice";

const store = configureStore({
    reducer: {
        api: apiSlice,
        registerUser: registerUserSlice,
        userDetails: userDetailsSlice
    }
})

export default store;