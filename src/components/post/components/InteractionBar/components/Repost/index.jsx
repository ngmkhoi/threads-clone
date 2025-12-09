import { Repeat } from 'lucide-react'
import { useState } from "react"
import LoginDialog from "@/components/Common/LoginDialog/index.jsx";
import {selectIsAuthenticated} from "@/features/auth/authSelector.js";
import {useDispatch, useSelector} from "react-redux";
import {
    RepostDropdown
} from "@/components/post/components/InteractionBar/components/Repost/components/RepostDropdown/index.jsx";
import {interactionsService} from "@/services/posts/Interactions/interactionsService.js";
import {updatePostReposts} from "@/features/posts/postsSlice.js";
import {updatePostDetailRepost, updateReplyRepost} from "@/features/postDetail/postDetailSlice.js";
import CreatePostDialog from "@/components/Common/CreatePostDialog";

export default function Repost({ count, post, isEmbedView = false }) {
    const dispatch = useDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const [quoteDialogData, setQuoteDialogData] = useState(null)
    const handleRepost = async () => {
        const response = await interactionsService.repost(post.id)
        const payload = {
            postId: post.id,
            reposts_and_quotes_count: response.reposts_and_quotes_count,
            is_reposted_by_auth: response.is_reposted
        };
        // Update both postsSlice (for Home page) and postDetailSlice (for PostDetail page)
        dispatch(updatePostReposts(payload));
        dispatch(updatePostDetailRepost(payload));
        dispatch(updateReplyRepost(payload));
    }

    const handleQuote = () => {
        setQuoteDialogData(post)
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
                isEmbedView={isEmbedView}
            />

            <LoginDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                icon={Repeat}
                title="DialogMessage:dialogMessages.Repost.title"
                description="DialogMessage:dialogMessages.Repost.description"
            />

            <CreatePostDialog
                open={!!quoteDialogData}
                onOpenChange={(open) => !open && setQuoteDialogData(null)}
                quotedPost={quoteDialogData}
                mode="quote"
            />
        </>
    )
}

