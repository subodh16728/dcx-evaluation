import { createSlice, createAsyncThunk, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { MyData , InitialState } from "../../utils/models";

// Action
export const fetchUserDetails = createAsyncThunk("fetchUserDetails", async (id:string) => {
    const response = await fetch(`http://localhost:4000/api/users/${id}`);
    return (await response.json()) as MyData
})

const initialState:InitialState = {
    isLoading: false,
    data:{},
    isError: false,
} 

const apiSlice = createSlice({
    name: "fetchapi",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchUserDetails
            .pending, (state) => {
                state.isLoading = true;
            });
        builder.addCase(fetchUserDetails
            .fulfilled, (state, action:PayloadAction<MyData>) => {
                state.isLoading = false;
                state.data = action.payload;
                console.log(action.payload);
            });
        builder.addCase(fetchUserDetails
            .rejected, (state) => {
                state.isError = true;
            });
    }
})

export default apiSlice.reducer;