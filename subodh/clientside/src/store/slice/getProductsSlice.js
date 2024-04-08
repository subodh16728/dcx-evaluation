import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookie from "js-cookie";
import axios from "axios";

// Action
export const fetchProducts = createAsyncThunk("fetchProducts", async (search) => {
    const token = Cookie.get("token")
    const response = await axios.get(`http://localhost:5000/api/products?search=${search}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
});

const apiSlice = createSlice({
    name: "fetchapi",
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts
            .pending, (state) => {
                state.isLoading = true;
            });
        builder.addCase(fetchProducts
            .fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            });
        builder.addCase(fetchProducts
            .rejected, (state, action) => {
                state.isError = true;
            });
    }
})

export default apiSlice.reducer;