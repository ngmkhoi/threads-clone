import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.jsx";
import { selectCurrentUser } from "@/features/auth/authSelector.js";
import { addPostToFeed, updatePostQuotes, updatePostReplies, updatePostContent } from "@/features/posts/postsSlice.js";
import postServices from "@/services/postServices.js";
import PostForm from "./components/PostForm";
import ThreadHint from "./components/ThreadHint";
import DialogFooter from "./components/DialogFooter";
import { interactionsService } from "@/services/posts/Interactions/interactionsService";

const FORM_ID = "create-post-form";

const CreatePostDialog = ({ open, onOpenChange, quotedPost, mode, onReplySuccess, editPost, onEditSuccess }) => {
    const { t } = useTranslation("Common");
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const [loading, setLoading] = useState(false);
    const [mediaFiles, setMediaFiles] = useState([]);
    const [mediaPreviews, setMediaPreviews] = useState([]);

    const { register, handleSubmit, reset, watch, setValue } = useForm({
        defaultValues: {
            content: "",
        },
    });

    // Initialize form with edit post data
    useEffect(() => {
        if (mode === "edit" && editPost && open) {
            setValue("content", editPost.content || "");
            
            // Set existing media previews from post
            if (editPost.media && editPost.media.length > 0) {
                const existingPreviews = editPost.media.map((mediaItem) => ({
                    url: mediaItem.url || mediaItem,
                    type: (mediaItem.type || "image").includes("video") ? "video" : "image",
                    isExisting: true // Mark as existing media
                }));
                setMediaPreviews(existingPreviews);
            }
        }
    }, [mode, editPost, open, setValue]);

    const content = watch("content");
    const isFormValid = content?.trim().length > 0 || mediaFiles.length > 0 || mediaPreviews.length > 0;

    const handleMediaSelect = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const maxFiles = 10;
        const totalFiles = mediaFiles.length + files.length;
        if (totalFiles > maxFiles) {
            toast.error(t("createPost.maxFiles", { max: maxFiles }));
            return;
        }

        const newPreviews = files.map((file) => ({
            url: URL.createObjectURL(file),
            type: file.type.startsWith("video") ? "video" : "image",
        }));

        setMediaFiles((prev) => [...prev, ...files]);
        setMediaPreviews((prev) => [...prev, ...newPreviews]);
    };

    const removeMedia = (index) => {
        const preview = mediaPreviews[index];
        // Only revoke if it's a blob URL (not existing media)
        if (!preview.isExisting && preview.url.startsWith("blob:")) {
            URL.revokeObjectURL(preview.url);
        }
        setMediaFiles((prev) => prev.filter((_, i) => i !== index));
        setMediaPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleClose = () => {
        mediaPreviews.forEach((preview) => {
            if (!preview.isExisting && preview.url.startsWith("blob:")) {
                URL.revokeObjectURL(preview.url);
            }
        });
        setMediaFiles([]);
        setMediaPreviews([]);
        reset();
        onOpenChange(false);
    };

    const onSubmit = async (data) => {
        if (!isFormValid) return;

        try {
            setLoading(true);
            const postData = {
                content: data.content,
                media: mediaFiles,
            };

            // Handle EDIT mode
            if (mode === "edit" && editPost) {
                const response = await postServices.updatePost(editPost.id, postData);
                dispatch(updatePostContent(response));
                toast.success(t("createPost.editSuccess"));
                handleClose();
                if (onEditSuccess && response) {
                    onEditSuccess(response);
                }
                return;
            }

            if (mode === "quote") {
                const response = await interactionsService.quote(quotedPost.id, postData);
                dispatch(addPostToFeed(response));
                dispatch(updatePostQuotes({ original_post_id: quotedPost.id }));
                toast.success(t("createPost.success"));
                handleClose();
                return;
            }

            if (mode === "reply") {
                const response = await interactionsService.reply(quotedPost.id, postData);
                dispatch(updatePostReplies({
                    postId: quotedPost.id,
                    replies_count: (quotedPost.replies_count || 0) + 1
                }));
                toast.success(t("createPost.replySuccess"));
                handleClose();
                if (onReplySuccess && response) {
                    onReplySuccess(response);
                }
                return;
            }

            const response = await postServices.createPost(postData);
            dispatch(addPostToFeed(response));
            toast.success(t("createPost.success"));
            handleClose();
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || t("createPost.error");
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const getDialogTitle = () => {
        switch (mode) {
            case "edit":
                return t("createPost.editTitle");
            case "reply":
                return t("createPost.replyTitle");
            default:
                return t("createPost.title");
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[620px] p-0 bg-content-background text-foreground !border-card-border overflow-hidden">
                {/* Header */}
                <DialogHeader className="border-b !border-card-border p-4">
                    <DialogTitle className="text-center font-bold text-[15px]">
                        {getDialogTitle()}
                    </DialogTitle>
                </DialogHeader>

                {/* Content */}
                <form onSubmit={handleSubmit(onSubmit)} id={FORM_ID}>
                    <div className="p-4 max-h-[70vh] overflow-y-auto">
                        <PostForm
                            currentUser={currentUser}
                            register={register}
                            content={content}
                            setValue={setValue}
                            mediaPreviews={mediaPreviews}
                            onMediaSelect={handleMediaSelect}
                            onRemoveMedia={removeMedia}
                            formId={FORM_ID}
                            quotedPost={quotedPost}
                            mode={mode}
                        />
                        {mode !== "edit" && <ThreadHint currentUser={currentUser} />}
                    </div>
                </form>

                {/* Footer */}
                <DialogFooter
                    isFormValid={isFormValid}
                    loading={loading}
                    formId={FORM_ID}
                    mode={mode}
                />
            </DialogContent>
        </Dialog>
    );
};

export default CreatePostDialog;
