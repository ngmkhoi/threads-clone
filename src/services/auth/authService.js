import {http} from "@/utils/http.js";

const authService = {
    login: async (credentials) => {
        const payload = {
            login: credentials.identifier,
            password: credentials.password
        }
        const response = await http.post('/auth/login', payload)
        return response.data
    },
    register: async (credentials) => {
        return await http.post('/auth/register', credentials)
    },
    verifyEmail: async (token) => {
        return await http.post(`/auth/verify-email`, {token})
    },
    getCurrentUser: async () => {
        const response = await http.get('/auth/user')
        return response.data
    },
    logout: async () => {
        await http.post('/auth/logout')
        localStorage.clear()
    },
};
export default authService;

