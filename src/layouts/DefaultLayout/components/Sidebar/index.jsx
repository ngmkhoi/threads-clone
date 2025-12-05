import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TooltipProvider,
} from "@/components/ui/tooltip.jsx"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThreads} from "@fortawesome/free-brands-svg-icons";
import MenuItems from "@/layouts/DefaultLayout/components/Sidebar/components/MenuItems/index.jsx";
import SettingsMenu from "@/layouts/DefaultLayout/components/Sidebar/components/SettingsMenu/index.jsx";
import {useSelector} from "react-redux";
import {selectIsAuthenticated} from "@/features/auth/authSelector.js";
import CreatePostDialog from "@/components/Common/CreatePostDialog/index.jsx";
import LoginDialog from "@/components/Common/LoginDialog/index.jsx";
import { SquarePen, User, Heart } from 'lucide-react';

const Sidebar = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const [activeItem, setActiveItem] = useState('home');
    const [showLoginDialog, setShowLoginDialog] = useState(false);
    const [showCreatePostDialog, setShowCreatePostDialog] = useState(false);
    const [loginDialogContent, setLoginDialogContent] = useState({});

    const handleItemClick = (item) => {
        if (item.id === 'home' || item.id === 'search') {
            setActiveItem(item.id);
            navigate(item.path);
            return;
        }

        if( item.id === 'create') {
            if(isAuthenticated) {
                setShowCreatePostDialog(true)
            } else {
                setLoginDialogContent({
                    icon: SquarePen,
                    title: 'dialogMessages.Create.title',
                    description: 'dialogMessages.Create.description'
                });
                setShowLoginDialog(true);
            }
            return;
        }

        if (item.id === 'profile' || item.id === 'activity') {
            if(isAuthenticated) {
                setActiveItem(item.id);
                navigate(item.path);
            } else {
                setLoginDialogContent({
                    icon: item.id === 'profile' ? User : Heart,
                    title: `dialogMessages.${item.id.charAt(0).toUpperCase() + item.id.slice(1)}.title`,
                    description: `dialogMessages.${item.id.charAt(0).toUpperCase() + item.id.slice(1)}.description`
                });
                setShowLoginDialog(true)
            }
            return;
        }
    };

    return (
        <div>
            <TooltipProvider>
                <div className="fixed left-0 top-0 h-screen w-[72px] border-gray-200 bg-background flex flex-col items-center py-6 z-50">
                    {/* Logo header */}
                    <a className="mb-8" onClick={() => navigate('/')}>
                        <FontAwesomeIcon
                            className="text-4xl transition-transform duration-200 hover:scale-110 cursor-pointer"
                            icon={faThreads}
                        />
                    </a>

                    {/* Menu Items body */}
                    <MenuItems activeItem={activeItem} handleItemClick={handleItemClick} />

                    {/* Settings at bottom */}
                    <SettingsMenu />
                </div>
            </TooltipProvider>

            <LoginDialog
                open={showLoginDialog}
                onOpenChange={setShowLoginDialog}
                icon={loginDialogContent.icon}
                title={loginDialogContent.title}
                description={loginDialogContent.description}
            />
            
            <CreatePostDialog
                open={showCreatePostDialog}
                onOpenChange={setShowCreatePostDialog}
            />
        </div>
    );
};

export default Sidebar;