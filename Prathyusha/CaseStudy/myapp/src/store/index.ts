import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./slice/getUserSlice";

const store = configureStore({
    reducer: {
        api: apiSlice
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;