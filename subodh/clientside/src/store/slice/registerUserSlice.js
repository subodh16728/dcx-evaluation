import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Action for register
export const registerUser = createAsyncThunk("registerUser", async (data) => {
    const response = await axios.post(`http://localhost:5000/api/register`, data);
    return response.data;
});

// Action for login
export const loginUser = createAsyncThunk("loginUser", async (data) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/login`, data);
        return response.data;
    } catch (error) {
        console.log(error)
    }

});

const registerUserSlice = createSlice({
    name: "registerUser",
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
        name: null
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser
            .pending, (state) => {
                state.isLoading = true;
            });
        builder.addCase(registerUser
            .fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                if (state.data.success === true) {
                    state.name = action.payload.data.name;
                }

            });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            if (action.payload && action.payload.name) {
                state.name = action.payload.name;
            }
        });
        builder.addCase(registerUser
            .rejected, (state, action) => {
                state.isError = true;
            });
    }
})

export default registerUserSlice.reducer;