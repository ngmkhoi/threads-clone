import { useTranslation } from "react-i18next";
import { Menu } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip.jsx"
import GuestMenuContent from "@/layouts/DefaultLayout/components/Sidebar/components/SettingsMenu/components/BasicContent/index.jsx";
import AuthMenuContent from "@/layouts/DefaultLayout/components/Sidebar/components/SettingsMenu/components/AuthContent/index.jsx";
import {useSelector} from "react-redux";
import { selectIsAuthenticated } from "@/features/auth/authSelector.js";

const Index = () => {
    const { t} = useTranslation('Sidebar');
    const isAuthenticated = useSelector(selectIsAuthenticated)
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
            {
                isAuthenticated ? <AuthMenuContent /> : <GuestMenuContent />
            }
        </DropdownMenu>
    );
};

export default Index;
