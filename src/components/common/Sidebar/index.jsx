import { useState } from 'react';
import {Home, Search, Heart, User, Menu, Plus, Languages, Moon} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThreads} from "@fortawesome/free-brands-svg-icons";
import {useTranslation} from "react-i18next";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu.jsx";
import {Switch} from "@/components/ui/switch.jsx";

const Sidebar = () => {
    const navigate = useNavigate();
    const {t, i18n} = useTranslation('Sidebar');
    const [activeItem, setActiveItem] = useState('home');

    const menuItems = [
        { id: 'home', icon: Home, label: t('menu.home'), path: '/' },
        { id: 'search', icon: Search, label: t('menu.search'), path: '/search' },
        { id: 'create', icon: Plus, label: t('menu.create'), path: '/create' },
        { id: 'activity', icon: Heart, label: t('menu.activity'), path: '/activity' },
        { id: 'profile', icon: User, label: t('menu.profile'), path: '/profile' },
    ];

    const handleItemClick = (item) => {
        setActiveItem(item.id);
        navigate(item.path);
    };

    const handleLanguageChange = (language) => {
        i18n.changeLanguage(language);
    };

    return (
        <TooltipProvider>
            <div className="fixed left-0 top-0 h-screen w-[72px] border-gray-200 bg-gray-50 flex flex-col items-center py-6 z-50">
                {/* Logo */}
                <a className="mb-8" onClick={() => navigate('/')}>
                    <FontAwesomeIcon
                        className="text-4xl transition-transform duration-200 hover:scale-110 cursor-pointer"
                        icon={faThreads}
                    />
                </a>

                {/* Menu Items */}
                <nav className="flex-1 flex flex-col justify-center gap-2 w-full px-3">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeItem === item.id;

                        return (
                            <Tooltip key={item.id}>          
                                <TooltipTrigger asChild>
                                    <a
                                        onClick={() => handleItemClick(item)}
                                        className={`
                      w-full h-12 flex items-center cursor-pointer justify-center rounded-lg transition-colors
                      ${isActive
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }
                    `}
                                    >
                                        <Icon className="w-6 h-6" />
                                    </a>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>{item.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}
                </nav>

                {/* Settings at bottom */}
                <DropdownMenu>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DropdownMenuTrigger asChild>
                                <button
                                    className="mt-auto w-10 h-10 flex items-center cursor-pointer justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                                >
                                    <Menu className="w-5 h-5" />
                                </button>
                            </DropdownMenuTrigger>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>{t('menu.more')}</p>
                        </TooltipContent>
                    </Tooltip>

                    <DropdownMenuContent side="right" align="end" className="w-56">
                        <DropdownMenuLabel className="font-semibold">{t('settings.title')}</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="cursor-pointer">
                                <Languages className="mr-2 h-4 w-4" />
                                <span>{t('settings.language')}</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
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
                            <Moon className="mr-2 h-4 w-4" />
                            <span className="flex-1">{t('settings.darkMode')}</span>
                            <Switch id="dark-mode-toggle" />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </TooltipProvider>
    );
};

export default Sidebar;
