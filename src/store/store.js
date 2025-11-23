import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { themeSlice } from '@/features/theme/themeSlice.js';
import authSlice from "@/features/auth/authSlice.js";

console.log(themeSlice.name)

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [themeSlice.name, authSlice.name],
};

const rootReducer = combineReducers({
    [themeSlice.reducerPath]: themeSlice.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

window.store = store;

export const persistor = persistStore(store);