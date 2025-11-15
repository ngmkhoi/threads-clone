import {createSlice} from "@reduxjs/toolkit"

const getInitialTheme = () => {
    if(typeof window === 'undefined') return false

    const savedTheme = localStorage.getItem('threads-theme')
    if(savedTheme === 'dark') return true
    if(savedTheme === 'light') return false

    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

const initialState = {
    isDarkMode: getInitialTheme
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {

    }
})