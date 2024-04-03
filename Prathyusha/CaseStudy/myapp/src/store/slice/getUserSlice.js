import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action
export const fetchUserDetails = createAsyncThunk("fetchUserDetails", async (id) => {
    console.log("id :" + id);
    const response = await fetch(`http://localhost:4000/api/users/${id}`)
    // console.log(response)
    return response.json()
})

const apiSlice = createSlice({
    name: "fetchapi",
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserDetails
            .pending, (state) => {
                state.isLoading = true;
            });
        builder.addCase(fetchUserDetails
            .fulfilled, (state, action) => {
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