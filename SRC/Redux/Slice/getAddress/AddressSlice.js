import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../../util/server/Server";




export const getAddress = createAsyncThunk("getAddress", async ({ rejectWithValue }) => {
    try {
        const address = await fetch("https://fakestoreapi.com/products")
        const res = await address.json()
        return res
    } catch (error) {
        rejectWithValue(error)
    }

})


const getAddresSlice = createSlice({
    name: "address",
    initialState: {
        address: [],
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(getAddress.pending, (state) => {
            state.isLoading = true
        }),
            builder.addCase(getAddress.fulfilled, (state, action) => {
                state.isLoading = false
                state.address = action.payload
            }),
            builder.addCase(getAddress.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    }
})


export default getAddresSlice.reducer
