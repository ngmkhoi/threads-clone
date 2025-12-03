import Like from './components/Like/index.jsx'
import Comment from './components/Comment/index.jsx'
import Repost from './components/Repost/index.jsx'
import Share from './components/Share/index.jsx'

export default function InteractionBar({ likes, comments, repost, shares, ...prop }) {
    return (
        <div className="flex items-center gap-1 mt-3">
            <Like
                count={likes}
                {...prop}
            />
            <Comment
                count={comments}
                {...prop}
            />
            <Repost
                count={repost}
                {...prop}
            />
            <Share count={shares} />
        </div>
    )
}
