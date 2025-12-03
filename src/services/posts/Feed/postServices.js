import {createAsyncThunk} from "@reduxjs/toolkit";
import {http} from "@/utils/http.js";

const getFeed = createAsyncThunk(
    'posts/getFeed',
    async ({ page = 1, feedType = 'for_you' } = {}) => {
        const params = {
            page,
            per_page: 15
        };

        if (localStorage.getItem('accessToken')) {
            params.type = feedType;
        }

        return await http.get('/posts/feed', {params})
    }
)

const postServices = {
    getFeed,
    getSinglePost: async (id) => {
        return await http.get(`/posts/${id}`)
    }
}

export default postServices;