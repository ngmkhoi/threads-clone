import {useSelector} from "react-redux";
import {useEffect} from "react";

export const ThemeProvider = () => {
    const isDarkMode = useSelector(state => state.theme.isDarkMode)

    useEffect(() => {
        if(isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return null;
}