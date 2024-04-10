import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserDetails,ApiState } from "../../utils/model";
// Action
export const fetchUserDetails = createAsyncThunk("fetchUserDetails", async (id:string) => {
    console.log("id :" + id);
    const response = await fetch(`http://localhost:3000/api/${id}`);
    // const data = await response.json(); // Convert response to JSON
     console.log(response.json); // Log the JSON data
    return response.json(); // Return the JSON data
});

const initialState:ApiState={
    isLoading: false,
    data: null,
    isError: false
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
            .fulfilled, (state, action:PayloadAction<UserDetails>) => {
                state.isLoading = false;
                state.data = action.payload;
            });
        builder.addCase(fetchUserDetails
            .rejected, (state, action) => {
                state.isError = true;
                console.log("Error: ", action.payload);
            });
    }
})

export default apiSlice.reducer;