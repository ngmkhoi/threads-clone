import {useState, useEffect, createContext, useContext} from "react";

const ThemeContext = createContext();

const useTheme = () => {
    const context = useContext(ThemeContext);
    if(context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('threads-theme');
        return savedTheme === 'dark';
    })

    function toggleTheme() {
        setIsDarkMode(prev => !prev)
    }

    function setTheme(isDarkMode) {
        setIsDarkMode(isDarkMode);
    }

    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('threads-theme', 'dark')
        } else {
            root.classList.remove('dark');
            localStorage.setItem('threads-theme', 'light')
        }
    }, [isDarkMode]);

    const value = { isDarkMode, setTheme, toggleTheme };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export { ThemeProvider, useTheme };

