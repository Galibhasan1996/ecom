import { configureStore } from '@reduxjs/toolkit'
import userIdSlice from '../Slice/userId/userIdSlice.js'
import cartSlice from '../Slice/Counter/cartSlice.js'
export const store = configureStore({
    reducer: {
        cart: cartSlice,
        userId: userIdSlice,
    },
})