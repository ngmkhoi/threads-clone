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
import { ArrowUp } from 'lucide-react';
import postServices from "@/services/posts/Feed/postServices.js";

function ReplyForm({ post, onClose }) {
    const { t } = useTranslation('PostCard');
    const [loading, setLoading] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
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
            await interactionsService.reply(post.id, data);
            const response = await postServices.getReplies(post.id)
            const updateRepliesCount = response.data.length;
            dispatch(updatePostReplies({
                postId: post.id,
                replies_count: updateRepliesCount
            }))
            toast(t('reply.success'))
            onClose()
        } catch (error) {
            const errorMessage = error.response?.data?.message || t('reply.error');
            toast.error(errorMessage);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="pt-3 mt-2">
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
                    </div>

                    {/* Error message */}
                    {errors.content && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.content.message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default ReplyForm;