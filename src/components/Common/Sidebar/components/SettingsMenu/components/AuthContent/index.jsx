import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub, DropdownMenuSubContent,
    DropdownMenuSubTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {Languages, LogOut, Moon, Sun} from "lucide-react";
import {Switch} from "@/components/ui/switch.jsx";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {toggleTheme} from "@/features/theme/themeSlice.js";
import authService from "@/services/auth/authService.js";
import {useNavigate} from "react-router-dom";
import {logout} from "@/features/auth/authSlice.js";

function AuthMenuContent() {
    const { t, i18n } = useTranslation('Sidebar');
    const dispatch = useDispatch();
    const isDarkMode = useSelector(state => state.theme.isDarkMode);
    const navigate = useNavigate();

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    }

    const handleLanguageChange = (language) => {
        i18n.changeLanguage(language);
    };

    const handleLogout = async () => {
        await authService.logout()
        dispatch(logout())
        navigate("/auth/login")
    }

    return (
        <DropdownMenuContent side="right" align="end" className="w-55 bg-menu-background rounded-xl">
            <DropdownMenuLabel className="font-semibold">{t('settings.title')}</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuSub>
                <DropdownMenuSubTrigger className="cursor-pointer">
                    <Languages className="mr-2 h-4 w-4" />
                    <span>{t('settings.language')}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="bg-menu-background rounded-xl">
                    <DropdownMenuRadioGroup value={i18n.language} onValueChange={handleLanguageChange}>
                        <DropdownMenuRadioItem value="vi" className="cursor-pointer">
                            Vietnamese
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="en" className="cursor-pointer">
                            English
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                {isDarkMode ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4 rotate-180" />}
                <span className="flex-1">{t('settings.darkMode')}</span>
                <Switch checked={isDarkMode} onCheckedChange={handleToggleTheme} id="dark-mode-toggle" />
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
                <LogOut className="mr-2 h-4 w-4" />
                <span className="flex-1 font-medium">{t('settings.logout')}</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    )
}

export default AuthMenuContent;