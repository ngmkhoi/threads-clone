import {http} from "@/utils/http.js";
import {createAsyncThunk} from "@reduxjs/toolkit";

const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async () => {
        const response = await http.get('/auth/user')
        return response.data
    }
)

const login = createAsyncThunk(
    '/auth/login',
    async (credentials) => {
        const payload = {
            login: credentials.identifier,
            password: credentials.password
        }
        const response = await http.post('/auth/login', payload)
        return response.data
    }
)

const authService = {
    login,
    register: async (credentials) => {
        return await http.post('/auth/register', credentials)
    },
    refreshToken: async () => {
        const response = await http.post('/auth/refresh')
        return response.data    
    },
    validateUsername: async (username) => {
        return await http.post('/auth/validate/username', {username})
    },
    validateEmail: async (email) => {
        return await http.post('/auth/validate/email', {email})
    },
    forgotPassword: async (email) => {
        return await http.post('/auth/forgot-password', {email})
    },
    validateResetToken: async (token) => {
        const response = await http.get(`/auth/reset-password/validate`, {params: {token}})
        return response.data
    },
    resetPassword: async (token, email, password, password_confirmation) => {
        return await http.post(`/auth/reset-password`, {token, email, password, password_confirmation})
    },
    verifyEmail: async (token) => {
        return await http.post(`/auth/verify-email`, {token})
    },
    resendVerificationEmail: async () => {
        return await http.post(`/auth/resend-verification-email`)
    },
    getCurrentUser,
    logout: async () => {
        await http.post('/auth/logout')
    },
};
export default authService;

