import {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Button } from '@/components/ui/button.jsx';
import { interactionsService } from '@/services/posts/Interactions/interactionsService.js';
import createReplySchema from '@/utils/Validate/post/replySchema.js';
import {Spinner} from "@/components/ui/spinner.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "@/features/auth/authSelector.js";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import {updatePostReplies} from "@/features/posts/postsSlice.js";
import { ArrowUp, Maximize2 } from 'lucide-react';
import postServices from "@/services/postService.js";
import CreatePostDialog from "@/components/Common/CreatePostDialog";

function ReplyForm({ post, onClose, onReplySuccess }) {
    const { t } = useTranslation('PostCard');
    const [loading, setLoading] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [isExpandedOpen, setIsExpandedOpen] = useState(false);
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        watch,
        resetField,
    } = useForm({
        resolver: yupResolver(createReplySchema(t)),
        defaultValues: {
            content: ''
        }
    });

    const content = watch('content');

    useEffect(() => {
        if(content?.length > 0) {
            setShowButton(true)
        } else {
            setShowButton(false)
        }
    }, [content])

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const replyResponse = await interactionsService.reply(post.id, data);
            const response = await postServices.getReplies(post.id)
            const updateRepliesCount = response.data.length;
            dispatch(updatePostReplies({
                postId: post.id,
                replies_count: updateRepliesCount
            }))
            // Call onReplySuccess callback if provided (for PostDetail page)
            if (onReplySuccess && replyResponse) {
                onReplySuccess(replyResponse);
            }
            toast(t('reply.success'))
            onClose()
            resetField('content')
        } catch (error) {
            const errorMessage = error.response?.data?.message || t('reply.error');
            toast.error(errorMessage);
        } finally {
            setLoading(false)
        }
    };

    const handleExpandedReplySuccess = (reply) => {
        if (onReplySuccess) {
            onReplySuccess(reply);
        }
        onClose();
    };

    return (
        <>
            <div className="pt-3 mt-2" onClick={(e) => e.stopPropagation()}>
                <div className="flex gap-3">
                    {/* Avatar của user hiện tại */}
                    <Avatar className="h-10 w-10">
                        <AvatarImage
                            src={currentUser?.avatar}
                            alt={currentUser?.username || "User"}
                        />
                        <AvatarFallback className="bg-gray-200 text-muted-foreground font-semibold">
                            {currentUser?.username?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                    </Avatar>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
                        <div className="flex gap-2 items-end">
                            <Textarea
                                placeholder={t('reply.placeholder', { name: post?.user?.name })}
                                className="min-h-[15px] h-10 resize-none bg-transparent !border-none w-full flex-1 focus:!ring-0 focus:!ring-offset-0"
                                {...register('content')}
                            />

                            {showButton && (
                                <Button
                                    type="submit"
                                    size="sm"
                                    disabled={loading}
                                    className="rounded-full"
                                >
                                    {loading ? (
                                        <>
                                            <Spinner className="mr-2" />
                                            {t('reply.loading')}
                                        </>
                                    ) : (
                                        <ArrowUp className="w-4 h-4" />
                                    )}
                                </Button>
                            )}

                            {/* Expand button */}
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="rounded-full p-2"
                                onClick={() => setIsExpandedOpen(true)}
                            >
                                <Maximize2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Expanded Reply Dialog */}
            <div onClick={(e) => e.stopPropagation()}>
                <CreatePostDialog
                    open={isExpandedOpen}
                    onOpenChange={setIsExpandedOpen}
                    quotedPost={post}
                    mode="reply"
                    onReplySuccess={handleExpandedReplySuccess}
                />
            </div>
        </>
    );
}

export default ReplyForm;