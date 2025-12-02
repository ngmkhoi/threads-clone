import LikeButton from './LikeButton'
import CommentButton from './CommentButton'
import RepostButton from './RepostButton'
import ShareButton from './ShareButton'

export default function InteractionBar({ likes, comments, repost, shares }) {
    return (
        <div className="flex items-center gap-1 mt-3">
            <LikeButton count={likes} />
            <CommentButton count={comments} />
            <RepostButton count={repost} />
            <ShareButton count={shares} />
        </div>
    )
}
