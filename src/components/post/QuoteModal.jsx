/**
 * QuoteModal Component
 * 
 * This component handles the quote/repost with comment functionality.
 * It wraps the CreatePostDialog component with mode="quote" to provide
 * a seamless quote post experience.
 * 
 * Features:
 * - Quote a post with additional commentary
 * - Display the original post as a QuoteCard
 * - Submit quote posts to the API
 * 
 * Related components:
 * - CreatePostDialog: Main dialog component used with mode="quote"
 * - QuoteCard: Displays the quoted post preview
 * - RepostDropdown: Contains the "Quote" action that opens this modal
 * 
 * @see /src/components/Common/CreatePostDialog/index.jsx
 * @see /src/components/Post/components/QuoteCard/index.jsx
 */

import CreatePostDialog from "@/components/Common/CreatePostDialog";

const QuoteModal = ({ open, onOpenChange, quotedPost, onQuoteSuccess }) => {
    return (
        <CreatePostDialog
            open={open}
            onOpenChange={onOpenChange}
            quotedPost={quotedPost}
            mode="quote"
            onQuoteSuccess={onQuoteSuccess}
        />
    );
};

export default QuoteModal;
