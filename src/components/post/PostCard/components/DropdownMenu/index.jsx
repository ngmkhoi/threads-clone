import { MoreHorizontal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";

function DropdownMenuComponent() {
    const { t } = useTranslation('PostCard');

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="rounded-xl p-2 hover:bg-gray-200 transition-colors outline-none ring-0 focus:ring-0">
                    <MoreHorizontal className="w-5 h-5 cursor-pointer"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-xl">
                <DropdownMenuItem className="flex items-center hover:bg-gray-100 gap-2 cursor-pointer">
                    <FontAwesomeIcon icon={faLink} className="text-xl"/>
                    <span>{t('CopyLink')}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropdownMenuComponent