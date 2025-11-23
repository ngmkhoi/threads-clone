import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { Languages, Moon, Sun, Menu } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuRadioGroup,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip.jsx"
import { Switch } from "@/components/ui/switch.jsx";
import ThemeSlice from '@/features/theme/themeSlice.js';

const Index = () => {
    const { t, i18n } = useTranslation('Sidebar');
    const dispatch = useDispatch();
    const isDarkMode = useSelector(state => state.theme.isDarkMode);

    const handleToggleTheme = () => {
        dispatch(ThemeSlice.actions.toggleTheme());
    }

    const handleLanguageChange = (language) => {
        i18n.changeLanguage(language);
    };

    return (
        <DropdownMenu>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="w-12 h-12
                            flex items-center cursor-pointer justify-center rounded-lg transition-colors
                            text-foreground hover:bg-background-active"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="right">
                    <p>{t('menu.more')}</p>
                </TooltipContent>
            </Tooltip>

            <DropdownMenuContent side="right" align="end" className="w-55 bg-loginpanel-background rounded-xl">
                <DropdownMenuLabel className="font-semibold">{t('settings.title')}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="cursor-pointer">
                        <Languages className="mr-2 h-4 w-4" />
                        <span>{t('settings.language')}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup className="bg-loginpanel-background rounded-lg" value={i18n.language} onValueChange={handleLanguageChange}>
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
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Index;
