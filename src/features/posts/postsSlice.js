import {createSlice} from "@reduxjs/toolkit";
import postServices from "@/services/posts/Feed/postServices.js";

const initialState = {
    posts: [],
    pagination: {
        current_page: 1,
        total: 0,
        last_page: 1,
        per_page: 15
    },
    loading: false,
    error: null
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        resetFeed: (state) => {
            state.posts = [];
            state.pagination = initialState.pagination
        },
        addPostToFeed: (state, action) => {
            state.posts.unshift(action.payload)
        },
        updatePostInteractions: (state, action) => {
            const { postId, is_liked_by_auth, likes_count } = action.payload;
            state.posts = state.posts.map(
                post => {
                    if(post.id === postId) {
                        return {
                            ...post,
                            is_liked_by_auth: is_liked_by_auth,
                            likes_count: likes_count
                        }
                    }
                    return post;
                }
            )
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postServices.getFeed.pending, (state) => {
                state.loading = true;
                state.error = null;
            }).addCase(postServices.getFeed.fulfilled, (state, action) => {
                    state.loading = false;
                    const { data, pagination } = action.payload;

                    state.pagination = pagination;

                    if(pagination.current_page === 1) {
                        state.posts = data;
                    } else {
                        const newPosts = data.filter(
                            newPost => !state.posts.some(existingPost => existingPost.id === newPost.id)
                        );
                        state.posts = [...state.posts, ...newPosts]
                    }
            }).addCase(postServices.getFeed.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export const { resetFeed, addPostToFeed, updatePostInteractions } = postsSlice.actions
export default postsSlice