import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faEyeSlash, 
    faVolumeMute, 
    faUserSlash, 
    faBan, 
    faFlag,
    faBookmark as faBookmarkSolid
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkOutline } from "@fortawesome/free-regular-svg-icons";
import { useTranslation } from "react-i18next";
import {
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu.jsx";

function OthersPostMenuItems({ 
    postUsername,
    isLoading,
    isSaved,
    onSave,
    onNotInterested,
    onMute,
    onRestrict,
    onBlock,
    onReport
}) {
    const { t } = useTranslation('PostCard');

    return (
        <>
            <DropdownMenuSeparator />
            
            {/* Save / Unsave */}
            <DropdownMenuItem 
                className="flex items-center justify-between hover:bg-secondary gap-2 cursor-pointer px-3 py-2.5"
                onClick={onSave}
                disabled={isLoading}
            >
                <span>{isSaved ? t('menu.unsave') : t('menu.save')}</span>
                <FontAwesomeIcon icon={isSaved ? faBookmarkSolid : faBookmarkOutline} className="text-base"/>
            </DropdownMenuItem>

            {/* Not interested */}
            <DropdownMenuItem 
                className="flex items-center justify-between hover:bg-secondary gap-2 cursor-pointer px-3 py-2.5"
                onClick={onNotInterested}
                disabled={isLoading}
            >
                <span>{t('menu.notInterested')}</span>
                <FontAwesomeIcon icon={faEyeSlash} className="text-base"/>
            </DropdownMenuItem>

            {/* Mute */}
            <DropdownMenuItem 
                className="flex items-center justify-between hover:bg-secondary gap-2 cursor-pointer px-3 py-2.5"
                onClick={onMute}
                disabled={isLoading}
            >
                <span>{t('menu.mute', { username: postUsername })}</span>
                <FontAwesomeIcon icon={faVolumeMute} className="text-base"/>
            </DropdownMenuItem>

            {/* Restrict */}
            <DropdownMenuItem 
                className="flex items-center justify-between hover:bg-secondary gap-2 cursor-pointer px-3 py-2.5"
                onClick={onRestrict}
                disabled={isLoading}
            >
                <span>{t('menu.restrict', { username: postUsername })}</span>
                <FontAwesomeIcon icon={faUserSlash} className="text-base"/>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Block - Destructive */}
            <DropdownMenuItem 
                className="flex items-center justify-between hover:bg-secondary gap-2 cursor-pointer px-3 py-2.5 text-destructive"
                onClick={onBlock}
                disabled={isLoading}
            >
                <span>{t('menu.block', { username: postUsername })}</span>
                <FontAwesomeIcon icon={faBan} className="text-base"/>
            </DropdownMenuItem>

            {/* Report - Destructive */}
            <DropdownMenuItem 
                className="flex items-center justify-between hover:bg-secondary gap-2 cursor-pointer px-3 py-2.5 text-destructive"
                onClick={onReport}
                disabled={isLoading}
            >
                <span>{t('menu.report')}</span>
                <FontAwesomeIcon icon={faFlag} className="text-base"/>
            </DropdownMenuItem>
        </>
    );
}

export default OthersPostMenuItems;
