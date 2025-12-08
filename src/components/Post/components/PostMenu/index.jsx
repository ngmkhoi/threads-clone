import { MoreHorizontal } from 'lucide-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";

// Hooks
import { usePostMenuActions } from "./hooks/usePostMenuActions.js";

// Components
import OthersPostMenuItems from "./components/OthersPostMenuItems.jsx";
import OwnPostMenuItems from "./components/OwnPostMenuItems.jsx";
import PostMenuDialogs from "./components/PostMenuDialogs.jsx";
import CreatePostDialog from "@/components/Common/CreatePostDialog/index.jsx";

function PostMenuComponent({ post }) {
    const { t } = useTranslation('PostCard');
    
    const {
        // State
        dropdownOpen,
        setDropdownOpen,
        loginDialogOpen,
        setLoginDialogOpen,
        blockDialogOpen,
        setBlockDialogOpen,
        deleteDialogOpen,
        setDeleteDialogOpen,
        reportDialogOpen,
        setReportDialogOpen,
        editDialogOpen,
        setEditDialogOpen,
        isLoading,
        
        // Computed
        isAuthenticated,
        isOwnPost,
        postUsername,
        isEditable,
        isSaved,
        
        // Handlers
        handleCopyLink,
        handleSave,
        handleNotInterested,
        handleMute,
        handleRestrict,
        handleBlockClick,
        handleBlockConfirm,
        handleReportClick,
        handleReportSubmit,
        handleDeleteClick,
        handleDeleteConfirm,
        handleEditClick
    } = usePostMenuActions(post);

    return (
        <>
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <button className="rounded-xl p-2 hover:bg-secondary transition-colors outline-none ring-0 focus:ring-0">
                        <MoreHorizontal className="w-5 h-5 cursor-pointer"/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="!rounded-xl min-w-[200px] bg-content-background py-2">
                    {/* Copy Link - Available for everyone */}
                    <DropdownMenuItem 
                        className="flex items-center justify-between hover:bg-secondary gap-2 cursor-pointer px-3 py-2.5"
                        onClick={handleCopyLink}
                    >
                        <span>{t('menu.copyLink')}</span>
                        <FontAwesomeIcon icon={faLink} className="text-base"/>
                    </DropdownMenuItem>

                    {/* Menu items for OTHER'S posts */}
                    {isAuthenticated && !isOwnPost && (
                        <OthersPostMenuItems
                            postUsername={postUsername}
                            isLoading={isLoading}
                            isSaved={isSaved}
                            onSave={handleSave}
                            onNotInterested={handleNotInterested}
                            onMute={handleMute}
                            onRestrict={handleRestrict}
                            onBlock={handleBlockClick}
                            onReport={handleReportClick}
                        />
                    )}

                    {/* Menu items for OWN posts */}
                    {isAuthenticated && isOwnPost && (
                        <OwnPostMenuItems
                            isLoading={isLoading}
                            isEditable={isEditable}
                            isSaved={isSaved}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteClick}
                            onSave={handleSave}
                        />
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* All Dialogs */}
            <PostMenuDialogs
                postUsername={postUsername}
                isLoading={isLoading}
                loginDialogOpen={loginDialogOpen}
                setLoginDialogOpen={setLoginDialogOpen}
                blockDialogOpen={blockDialogOpen}
                setBlockDialogOpen={setBlockDialogOpen}
                onBlockConfirm={handleBlockConfirm}
                deleteDialogOpen={deleteDialogOpen}
                setDeleteDialogOpen={setDeleteDialogOpen}
                onDeleteConfirm={handleDeleteConfirm}
                reportDialogOpen={reportDialogOpen}
                setReportDialogOpen={setReportDialogOpen}
                onReportSubmit={handleReportSubmit}
            />

            {/* Edit Post Dialog */}
            <CreatePostDialog
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
                mode="edit"
                editPost={post}
            />
        </>
    );
}

export default PostMenuComponent;