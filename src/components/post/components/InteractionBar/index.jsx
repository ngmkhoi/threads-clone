import Like from './components/Like/index.jsx'
import Comment from './components/Comment/index.jsx'
import Repost from './components/Repost/index.jsx'
import Share from './components/Share/index.jsx'

export default function InteractionBar({ likes, comments, repost, shares, onToggleReply, ...prop }) {
    return (
        <div className="flex gap-1 items-center mt-3">
            <Like
                count={likes}
                {...prop}
            />
            <Comment
                count={comments}
                onToggleReply={onToggleReply}
                {...prop}
            />
            <Repost
                count={repost}
                {...prop}
            />
            <Share count={shares} post={prop.post}/>
        </div>
    )
}

