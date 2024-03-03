import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/authSlice.js';
import { apiSlice } from "./api/apiSlice.js";

// Configuration of Store
const store = configureStore({
    // Reducers
    reducer: {
        auth: authReducer, // Auth Slide Reducer
        [apiSlice.reducerPath]: apiSlice.reducer, // Api Slice Reducer
    },
    // Middleware Configuration
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    // DevTools Configuration
    devTools: true,
})

export default store;
