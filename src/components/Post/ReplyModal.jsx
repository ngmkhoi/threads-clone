/**
 * ReplyModal Component
 * 
 * This component handles the reply functionality for posts.
 * It wraps the CreatePostDialog component with mode="reply" to provide
 * a seamless reply experience.
 * 
 * Features:
 * - Reply to a specific post
 * - Display the parent post context
 * - Submit replies to the API
 * - Update reply count in Redux state
 * 
 * Related components:
 * - CreatePostDialog: Main dialog component used with mode="reply"
 * - ReplyForm: Inline reply form used in post cards
 * - Comment button: Opens this modal for authenticated users
 * 
 * @see /src/components/Common/CreatePostDialog/index.jsx
 * @see /src/pages/Home/components/ReplyForm/index.jsx
 */

import CreatePostDialog from "@/components/Common/CreatePostDialog";

const ReplyModal = ({ open, onOpenChange, post, onReplySuccess }) => {
    return (
        <CreatePostDialog
            open={open}
            onOpenChange={onOpenChange}
            quotedPost={post}
            mode="reply"
            onReplySuccess={onReplySuccess}
        />
    );
};

export default ReplyModal;
