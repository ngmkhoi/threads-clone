import { http } from "@/utils/http.js";

export const searchService = {
    /**
     * Combined search - search both topics and users
     * @param {string} query - Search query
     * @param {number} page - Page number
     * @param {number} perPageTopics - Number of topics per page
     * @param {number} perPageUsers - Number of users per page
     */
    search: async (query, page = 1, perPageTopics = 10, perPageUsers = 10) => {
        const response = await http.get(`search`, {
            params: { q: query, page, per_page_topics: perPageTopics, per_page_users: perPageUsers }
        });
        return response.data;
    },

    /**
     * Search topics only
     * @param {string} query - Search query
     */
    searchTopics: async (query) => {
        const response = await http.get(`topics/search`, {
            params: { q: query }
        });
        return response.data;
    },

    /**
     * Get user suggestions
     * @param {number} page - Page number
     * @param {number} perPage - Number of users per page
     */
    getUserSuggestions: async (page = 1, perPage = 10) => {
        const response = await http.get(`users/suggestions`, {
            params: { page, per_page: perPage }
        });
        return response.data;
    },

    /**
     * Follow a user
     * @param {number} userId - User ID to follow
     */
    followUser: async (userId) => {
        const response = await http.post(`users/${userId}/follow`);
        return response.data;
    },

    /**
     * Unfollow a user
     * @param {number} userId - User ID to unfollow
     */
    unfollowUser: async (userId) => {
        const response = await http.post(`users/${userId}/follow`, { _method: 'DELETE' });
        return response.data;
    }
};

export default searchService;
