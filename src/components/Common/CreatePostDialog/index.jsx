import { useState } from "react";
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
import { addPostToFeed } from "@/features/posts/postsSlice.js";
import postServices from "@/services/posts/Feed/postServices.js";
import PostForm from "./components/PostForm";
import ThreadHint from "./components/ThreadHint";
import DialogFooter from "./components/DialogFooter";

const FORM_ID = "create-post-form";

const CreatePostDialog = ({ open, onOpenChange }) => {
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

    const content = watch("content");
    const isFormValid = content?.trim().length > 0 || mediaFiles.length > 0;

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
        URL.revokeObjectURL(mediaPreviews[index].url);
        setMediaFiles((prev) => prev.filter((_, i) => i !== index));
        setMediaPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleClose = () => {
        mediaPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
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

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[620px] p-0 bg-content-background text-foreground !border-card-border overflow-hidden">
                {/* Header */}
                <DialogHeader className="border-b !border-card-border p-4">
                    <DialogTitle className="text-center font-bold text-[15px]">
                        {t("createPost.title")}
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
                        />
                        <ThreadHint currentUser={currentUser} />
                    </div>
                </form>

                {/* Footer */}
                <DialogFooter
                    isFormValid={isFormValid}
                    loading={loading}
                    formId={FORM_ID}
                />
            </DialogContent>
        </Dialog>
    );
};

export default CreatePostDialog;
