import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { selectIsAuthenticated, selectCurrentUser } from '@/features/auth/authSelector.js';
import { removePostFromFeed, removePostsByUserId } from '@/features/posts/postsSlice.js';
import postServices from '@/services/postService.js';
import userService from '@/services/users/userService.js';

// Check if post is editable (within 15 minutes of creation)
const isPostEditable = (post) => {
    if (!post?.created_at) return false;
    const createdAt = new Date(post.created_at);
    const now = new Date();
    const diffInMinutes = (now - createdAt) / (1000 * 60);
    return diffInMinutes <= 15;
};

export function usePostMenuActions(post) {
    const { t } = useTranslation('PostCard');
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const currentUser = useSelector(selectCurrentUser);
    
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);
    const [blockDialogOpen, setBlockDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [reportDialogOpen, setReportDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(post?.is_saved_by_auth || false);
    
    // Computed values
    const isOwnPost = currentUser?.id === post?.user?.id;
    const postUsername = post?.user?.username || 'user';
    const isEditable = isPostEditable(post);

    // Dialog state setters
    const openLoginDialog = () => setLoginDialogOpen(true);
    const closeDropdown = () => setDropdownOpen(false);

    // Copy link handler
    const handleCopyLink = () => {
        const baseUrl = window.location.origin + window.location.pathname;
        const postUrl = `${baseUrl}#/post/${post.id}`;
        navigator.clipboard.writeText(postUrl);
        toast.success(t('menu.linkCopied'));
        closeDropdown();
    };

    // Save/Unsave handler (API is toggle - same POST endpoint)
    const handleSave = async () => {
        console.log('handleSave called', { isAuthenticated, postId: post.id, isSaved });
        if (!isAuthenticated) {
            openLoginDialog();
            return;
        }
        try {
            setIsLoading(true);
            await postServices.save(post.id);
            const newSavedState = !isSaved;
            setIsSaved(newSavedState);
            toast.success(newSavedState ? t('menu.saved') : t('menu.unsave'));
        } catch (error) {
            console.error('Save error:', error);
            toast.error(error.response?.data?.message || t('menu.error'));
        } finally {
            setIsLoading(false);
            closeDropdown();
        }
    };

    // Not interested (hide) handler
    const handleNotInterested = async () => {
        if (!isAuthenticated) {
            openLoginDialog();
            return;
        }
        try {
            setIsLoading(true);
            await postServices.hide(post.id);
            dispatch(removePostFromFeed(post.id));
            toast.success(t('menu.hidden'));
        } catch (error) {
            toast.error(error.response?.data?.message || t('menu.error'));
        } finally {
            setIsLoading(false);
            closeDropdown();
        }
    };

    // Mute handler
    const handleMute = async () => {
        if (!isAuthenticated) {
            openLoginDialog();
            return;
        }
        try {
            setIsLoading(true);
            await userService.mute(post.user.id);
            toast.success(t('menu.muted', { username: postUsername }));
        } catch (error) {
            toast.error(error.response?.data?.message || t('menu.error'));
        } finally {
            setIsLoading(false);
            closeDropdown();
        }
    };

    // Restrict handler
    const handleRestrict = async () => {
        if (!isAuthenticated) {
            openLoginDialog();
            return;
        }
        try {
            setIsLoading(true);
            await userService.restrict(post.user.id);
            toast.success(t('menu.restricted', { username: postUsername }));
        } catch (error) {
            toast.error(error.response?.data?.message || t('menu.error'));
        } finally {
            setIsLoading(false);
            closeDropdown();
        }
    };

    // Block handler
    const handleBlockClick = () => {
        if (!isAuthenticated) {
            openLoginDialog();
            return;
        }
        closeDropdown();
        setBlockDialogOpen(true);
    };

    const handleBlockConfirm = async () => {
        try {
            setIsLoading(true);
            await userService.block(post.user.id);
            dispatch(removePostsByUserId(post.user.id));
            toast.success(t('menu.blocked', { username: postUsername }));
            setBlockDialogOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message || t('menu.error'));
        } finally {
            setIsLoading(false);
        }
    };

    // Report handler
    const handleReportClick = () => {
        if (!isAuthenticated) {
            openLoginDialog();
            return;
        }
        closeDropdown();
        setReportDialogOpen(true);
    };

    const handleReportSubmit = async (reason, description) => {
        try {
            setIsLoading(true);
            await postServices.report({ id: post.id, reason, description });
            toast.success(t('menu.reported'));
            setReportDialogOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message || t('menu.error'));
        } finally {
            setIsLoading(false);
        }
    };

    // Delete handler
    const handleDeleteClick = () => {
        closeDropdown();
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            setIsLoading(true);
            await postServices.deletePost(post.id);
            dispatch(removePostFromFeed(post.id));
            toast.success(t('menu.deleted'));
            setDeleteDialogOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message || t('menu.error'));
        } finally {
            setIsLoading(false);
        }
    };

    // Edit handler
    const handleEditClick = () => {
        if (!isEditable) {
            toast.error(t('menu.editExpired'));
            return;
        }
        closeDropdown();
        setEditDialogOpen(true);
    };

    return {
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
    };
}
