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

// register: async (credentials) => {
//     const response = await http.post('/auth/register', credentials)
//     return response.data
// },
//     validateEmail: async (email) => {
//     const response = await http.post(`auth/validate/email`, {email} )
//     return response.data
// }