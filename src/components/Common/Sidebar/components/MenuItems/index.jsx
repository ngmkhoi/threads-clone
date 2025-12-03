import { Home, Search, Heart, User, Plus } from 'lucide-react';
import { useTranslation } from "react-i18next";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip.jsx"

const Index = ({ activeItem, handleItemClick }) => {
    const { t } = useTranslation('Sidebar');

    const menuItems = [
        { id: 'home', icon: Home, label: t('menu.home'), path: '/' },
        { id: 'search', icon: Search, label: t('menu.search'), path: '/search' },
        { id: 'create', icon: Plus, label: t('menu.create'), path: '/create' },
        { id: 'activity', icon: Heart, label: t('menu.activity'), path: '/activity' },
        { id: 'profile', icon: User, label: t('menu.profile'), path: '/profile' },
    ];

    return (
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
                                    w-12 h-12 flex items-center cursor-pointer justify-center rounded-lg transition-colors
                                    ${isActive
                                    ? 'bg-background-active text-foreground'
                                    : 'text-foreground hover:bg-background-active'
                                }
                                `}
                            >
                                <Icon className="w-6 h-6"/>
                            </a>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>{item.label}</p>
                        </TooltipContent>
                    </Tooltip>
                );
            })}
        </nav>
    );
};

export default Index;
