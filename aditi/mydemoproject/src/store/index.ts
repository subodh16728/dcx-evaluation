import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./slice/getUserslice";

const store = configureStore({
    reducer: {
        api: apiSlice
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch