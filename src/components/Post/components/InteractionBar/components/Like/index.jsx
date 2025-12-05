import { Heart } from 'lucide-react'
import { useState } from "react"
import LoginDialog from "@/components/Common/LoginDialog/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuthenticated} from "@/features/auth/authSelector.js";
import {interactionsService} from "@/services/posts/Interactions/interactionsService.js";
import {updatePostLike} from "@/features/posts/postsSlice.js";
import {cn} from "@/lib/utils.js";
import AnimatedCounter from "@/components/Common/AnimatedCounter/index.jsx";

export default function Like({ count, post }) {
    const [isOpen, setIsOpen] = useState(false)
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const dispatch = useDispatch();

    const handleClick = async () => {
        if(isAuthenticated) {
            const response = await interactionsService.like(post.id)
            dispatch(updatePostLike({
                postId: post.id,
                is_liked_by_auth: response.is_liked,
                likes_count: response.likes_count
            }))
        }else {
            setIsOpen(true)
        }
    }

    return (
        <>
            <button
                className={cn(
                    "flex items-center gap-1 transition-colors cursor-pointer p-1.5 w-[50px] justify-start",
                    post.is_liked_by_auth
                        ? "text-red-500 hover:text-red-400"
                        : "text-muted-foreground hover:text-foreground"
                )}
                onClick={handleClick}
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
