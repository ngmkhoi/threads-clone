export const selectCurrentUser = (state) => state.auth.currentUser
export const selectIsAuthenticated = (state) => !!state.auth.currentUser
export const selectFetchingState = (state) => state.auth.fetching;
