import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TooltipProvider,
} from "@/components/ui/tooltip"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThreads} from "@fortawesome/free-brands-svg-icons";
import MenuItems from "@/components/Common/Sidebar/components/MenuItems/index.jsx";
import SettingsMenu from "@/components/Common/Sidebar/components/SettingsMenu/index.jsx";

const Sidebar = () => {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState('home');

    const handleItemClick = (item) => {
        setActiveItem(item.id);
        navigate(item.path);
    };

    return (
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
    );
};

export default Sidebar;
