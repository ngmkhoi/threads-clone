import {http} from "@/utils/http.js";

export const interactionsService = {
    like: async (id) => {
        const response = await http.post(`posts/${id}/like`)
        return response.data
    },
    repost: async (id) => {
        const response = await http.post(`posts/${id}/repost`)
        return response.data
    },
    quote: async (id) => {
        const response = await http.post(`posts/${id}/quote`)
        return response.data
    },
    reply: async (id) => {
        const response = await http.post(`posts/${id}/reply`)
        return response.data
    },
    save: async (id) => {
        const response = await http.post(`posts/${id}/save`)
        return response.data
    },
    hide: async (id) => {
        const response = await http.post(`posts/${id}/hide`)
        return response.data
    },
    report: async ({ reason, description, id}) => {
        const response = await http.post(`posts/${id}/report`, {reason, description})
        return response.data
    }
}