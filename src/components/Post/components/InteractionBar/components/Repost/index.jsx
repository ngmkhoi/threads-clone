import { Repeat } from 'lucide-react'
import { useState } from "react"
import LoginDialog from "@/components/Common/LoginDialog/index.jsx";
import {selectIsAuthenticated} from "@/features/auth/authSelector.js";
import {useDispatch, useSelector} from "react-redux";
import {
    RepostDropdown
} from "@/components/Post/components/InteractionBar/components/Repost/components/RepostDropdown/index.jsx";
import {interactionsService} from "@/services/posts/Interactions/interactionsService.js";
import {updatePostRepostsAndQuotes} from "@/features/posts/postsSlice.js";

export default function Repost({ count, post }) {
    const dispatch = useDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const handleRepost = async () => {
        const response = await interactionsService.repost(post.id)
        dispatch(updatePostRepostsAndQuotes({
            postId: post.id,
            reposts_and_quotes_count: response.reposts_and_quotes_count,
            is_reposted_by_auth: response.is_reposted
        }))
    }

    const handleQuote = () => {
        console.log("Đã quotes v:")
    }

    return (
        <>
            <RepostDropdown
                count={count}
                isAuthenticated={isAuthenticated}
                onShowLoginDialog={() => setIsDialogOpen(true)}
                onRepost={handleRepost}
                onQuote={handleQuote}
                post={post}
            />

            <LoginDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                icon={Repeat}
                title="DialogMessage:dialogMessages.Repost.title"
                description="DialogMessage:dialogMessages.Repost.description"
            />
        </>
    )
}

