import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import {
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu.jsx";
import { faBookmark as faBookmarkOutline } from "@fortawesome/free-regular-svg-icons";


function OwnPostMenuItems({ 
    isLoading,
    isEditable,
    isSaved,
    onEdit,
    onDelete,
    onSave
}) {
    const { t } = useTranslation('PostCard');

    return (
        <>
            <DropdownMenuSeparator />

            <DropdownMenuItem 
                className="flex items-center justify-between hover:bg-secondary gap-2 cursor-pointer px-3 py-2.5"
                onClick={onSave}
                disabled={isLoading}
            >
                <span>{isSaved ? t('menu.unsave') : t('menu.save')}</span>
                <FontAwesomeIcon icon={isSaved ? faBookmarkSolid : faBookmarkOutline} className="text-base"/>
            </DropdownMenuItem>
            
            {/* Edit - Only show if editable (within 15 min) */}
            {isEditable && (
                <DropdownMenuItem 
                    className="flex items-center justify-between hover:bg-secondary gap-2 cursor-pointer px-3 py-2.5"
                    onClick={onEdit}
                    disabled={isLoading}
                >
                    <span>{t('menu.edit')}</span>
                    <FontAwesomeIcon icon={faPen} className="text-base"/>
                </DropdownMenuItem>
            )}

            {/* Delete - Destructive */}
            <DropdownMenuItem 
                className="flex items-center justify-between hover:bg-secondary gap-2 cursor-pointer px-3 py-2.5 text-destructive"
                onClick={onDelete}
                disabled={isLoading}
            >
                <span>{t('menu.delete')}</span>
                <FontAwesomeIcon icon={faTrash} className="text-base"/>
            </DropdownMenuItem>
        </>
    );
}

export default OwnPostMenuItems;
