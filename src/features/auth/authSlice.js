import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    isAuthenticated: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload
            state.isAuthenticated = true
        },
        clearUser: (state) => {
            state.currentUser = null
            state.isAuthenticated = false
        }
    }
})
export const {setUser, clearUser} = authSlice.actions
export default authSlice