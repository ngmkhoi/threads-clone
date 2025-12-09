import { Heart } from 'lucide-react'
import { useState } from "react"
import LoginDialog from "@/components/Common/LoginDialog/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuthenticated} from "@/features/auth/authSelector.js";
import {interactionsService} from "@/services/posts/Interactions/interactionsService.js";
import {updatePostLike} from "@/features/posts/postsSlice.js";
import {updatePostDetailLike, updateReplyLike} from "@/features/postDetail/postDetailSlice.js";
import {cn} from "@/lib/utils.js";
import AnimatedCounter from "@/components/Common/AnimatedCounter/index.jsx";

export default function Like({ count, post, isEmbedView = false }) {
    const [isOpen, setIsOpen] = useState(false)
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const dispatch = useDispatch();

    const handleClick = async () => {
        if (isEmbedView) return;
        
        if(isAuthenticated) {
            const response = await interactionsService.like(post.id)
            const payload = {
                postId: post.id,
                is_liked_by_auth: response.is_liked,
                likes_count: response.likes_count
            };
            // Update both postsSlice (for Home page) and postDetailSlice (for PostDetail page)
            dispatch(updatePostLike(payload));
            dispatch(updatePostDetailLike(payload));
            dispatch(updateReplyLike(payload));
        }else {
            setIsOpen(true)
        }
    }

    return (
        <>
            <button
                className={cn(
                    "flex items-center gap-1 transition-colors p-1.5 w-[50px] justify-start",
                    isEmbedView 
                        ? "pointer-events-none cursor-default"
                        : "cursor-pointer",
                    post.is_liked_by_auth
                        ? isEmbedView ? "text-red-500" : "text-red-500 hover:text-red-400"
                        : isEmbedView ? "text-muted-foreground" : "text-muted-foreground hover:text-foreground"
                )}
                onClick={handleClick}
                disabled={isEmbedView}
            >
                <Heart
                    className="w-5 h-5"
                    fill={post.is_liked_by_auth ? "currentColor" : "none"}
                />
                <AnimatedCounter value={count} className="text-sm" />
            </button>

            <LoginDialog
                open={isOpen}
                onOpenChange={setIsOpen}
                icon={Heart}
                title="DialogMessage:dialogMessages.Like.title"
                description="DialogMessage:dialogMessages.Like.description"
            />
        </>
    )
}
