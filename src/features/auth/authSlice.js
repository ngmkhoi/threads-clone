import {createSlice} from "@reduxjs/toolkit";
import authService from "@/services/auth/authService.js";

const initialState = {
    currentUser: null,
    fetching: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.currentUser = null;
            state.fetching = false;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        },
        setUser: (state, action) => {
            state.currentUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        // get current user
        builder.addCase(authService.getCurrentUser.pending, (state) => {
            state.fetching = true;
        })
        builder.addCase(authService.getCurrentUser.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.fetching = false;
        })
        builder.addCase(authService.getCurrentUser.rejected, (state) => {
            state.currentUser = null;
            state.fetching = false;
        })

        //login
        builder.addCase(authService.login.pending, (state) => {
            state.fetching = true;
        })
        builder.addCase(authService.login.fulfilled, (state) => {
            state.fetching = false;
        })
        builder.addCase(authService.login.rejected, (state) => {
            state.fetching = false;
        })
    }
})
export const { logout, setUser } = authSlice.actions
export default authSlice