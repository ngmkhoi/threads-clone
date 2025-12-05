import {createSlice} from "@reduxjs/toolkit";
import postServices from "@/services/posts/Feed/postServices.js";
import authService from "@/services/auth/authService.js";
import { logout } from "@/features/auth/authSlice.js";

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
        updatePostLike: (state, action) => {
            const { postId, is_liked_by_auth,  likes_count } = action.payload;
            state.posts = state.posts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        is_liked_by_auth,
                        likes_count
                    };
                }
                return post;
            });
        },
        updatePostReplies: (state, action) => {
            const { postId, replies_count } = action.payload;
            state.posts = state.posts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        replies_count
                    };
                }
                return post;
            });
        },
        updatePostRepostsAndQuotes: (state, action) => {
            const { postId, reposts_and_quotes_count, is_reposted_by_auth } = action.payload;
            state.posts = state.posts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        is_reposted_by_auth,
                        reposts_and_quotes_count
                    };
                }
                return post;
            });
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
            .addCase(logout, (state) => {
                state.posts = [];
                state.pagination = initialState.pagination;
            })
            .addCase(authService.login.fulfilled, (state) => {
                state.posts = [];
                state.pagination = initialState.pagination;
            })
    }
})

export const {
    resetFeed,
    addPostToFeed,
    updatePostLike,
    updatePostReplies,
    updatePostRepostsAndQuotes
} = postsSlice.actions
export default postsSlice