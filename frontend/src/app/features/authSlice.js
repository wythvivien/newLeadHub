import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Set userInfo and save on Local Storage
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        // Clear the userInfo on Local Storage
        clearCredentials: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    }
})

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;