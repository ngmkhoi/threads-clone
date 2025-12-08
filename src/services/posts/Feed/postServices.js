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
    },
    getReplies: async (id) => {
        return await http.get(`/posts/${id}/replies`)
    },
    createPost: async (data) => {
        const formData = new FormData();
        formData.append('content', data.content);
        if (data.media) {
            data.media.forEach((file) => {
                formData.append('media[]', file);
            });
        }
        const response = await http.post('posts', formData);
        return response.data;
    },
    _buildFormData: (data,) => {
        const formData = new FormData();
        formData.append('content', data.content);

        if (data.media && data.media.length > 0) {
            data.media.forEach((file) => {
                formData.append('media[]', file);
            });
        } else {
            formData.append('media[]', '');
        }

        formData.append('reply_permission', data.reply_permission || '');
        return formData;
    },
    updatePost: async (id, data) => {
        const formData = postServices._buildFormData(data);
        const response = await http.put(`posts/${id}`, formData);
        return response.data;
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
    },
    deletePost: async (id) => {
        const response = await http.post(`posts/${id}`, { _method: 'DELETE' });
        return response.data;
    }
}

export default postServices;