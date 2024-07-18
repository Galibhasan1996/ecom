import { configureStore } from '@reduxjs/toolkit'
import couterReducer from "../Slice/Counter/CounterSlice.js"
export const store = configureStore({
    reducer: {
        couter: couterReducer
    },
})