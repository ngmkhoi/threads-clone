import { MoreHorizontal } from 'lucide-react';
import { useTranslation } from "react-i18next";
import LoginDialog from "@/components/Common/LoginDialog/index.jsx";
import ConfirmationDialog from "@/components/Common/ConfirmationDialog/index.jsx";
import ReportDialog from "@/components/Common/ReportDialog/index.jsx";

function PostMenuDialogs({
    postUsername,
    isLoading,
    // Login Dialog
    loginDialogOpen,
    setLoginDialogOpen,
    // Block Dialog
    blockDialogOpen,
    setBlockDialogOpen,
    onBlockConfirm,
    // Delete Dialog
    deleteDialogOpen,
    setDeleteDialogOpen,
    onDeleteConfirm,
    // Report Dialog
    reportDialogOpen,
    setReportDialogOpen,
    onReportSubmit
}) {
    const { t } = useTranslation('PostCard');

    return (
        <>
            {/* Login Dialog */}
            <LoginDialog
                open={loginDialogOpen}
                onOpenChange={setLoginDialogOpen}
                icon={MoreHorizontal}
                title="DialogMessage:dialogMessages.More.title"
                description="DialogMessage:dialogMessages.More.description"
            />

            {/* Block Confirmation Dialog */}
            <ConfirmationDialog
                open={blockDialogOpen}
                onOpenChange={setBlockDialogOpen}
                title={t('confirm.blockTitle', { username: postUsername })}
                description={t('confirm.blockDescription')}
                confirmText={t('confirm.blockConfirm')}
                cancelText={t('confirm.cancel')}
                onConfirm={onBlockConfirm}
                variant="destructive"
                isLoading={isLoading}
            />

            {/* Delete Confirmation Dialog */}
            <ConfirmationDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                title={t('confirm.deleteTitle')}
                description={t('confirm.deleteDescription')}
                confirmText={t('confirm.deleteConfirm')}
                cancelText={t('confirm.cancel')}
                onConfirm={onDeleteConfirm}
                variant="destructive"
                isLoading={isLoading}
            />

            {/* Report Dialog */}
            <ReportDialog
                open={reportDialogOpen}
                onOpenChange={setReportDialogOpen}
                onSubmit={onReportSubmit}
                isLoading={isLoading}
            />
        </>
    );
}

export default PostMenuDialogs;
