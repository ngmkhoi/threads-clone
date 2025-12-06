import InteractionBar from '@/components/Post/components/InteractionBar';
import { Card, CardContent } from "@/components/ui/card.jsx";
import PostImage from "@/components/Post/components/PostImage/index.jsx";
import MoreDropdownMenuComponent from "@/components/Post/components/MoreDropdown/index.jsx";
import AvatarComponent from "@/components/Post/components/Avatar/index.jsx";
import QuoteCard from "@/components/Post/components/QuoteCard/index.jsx";
import {formatTimeAgo} from "@/utils/timeFormat.js";
import {useState} from "react";
import ReplyForm from "@/pages/Home/components/ReplyForm/index.jsx";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post, isDetailView = false }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const navigate = useNavigate();

  const handleToggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  }

  const handleClick = (e) => {
    // Don't navigate if in detail view or clicking interactive elements
    if (isDetailView) return;
    
    // Check for interactive elements: buttons, links, textareas, and dropdown menu items
    const interactiveSelectors = [
      'button',
      'a',
      'textarea',
      '[role="menuitem"]',
      '[role="menu"]',
      '[data-radix-collection-item]'
    ];
    
    if (interactiveSelectors.some(selector => e.target.closest(selector))) {
      return;
    }
    
    navigate(`/post/${post.id}`);
  };
      
  return (
    <Card 
      className={`bg-content-background !border-card-border py-2 transition-colors shadow-none rounded-none cursor-pointer border-0 border-b ${!isDetailView ? 'hover:none' : ''}`}
      onClick={handleClick}
    >
      <CardContent className="p-2">
        <div className="flex gap-3">
          {/* Avatar Column - chứa avatar và line */}
          <div className="flex flex-col items-center">
            <AvatarComponent post={post} />

            {/* Line - chỉ hiện khi có reply form */}
            {showReplyForm && (
              <div className="w-0.75 h-full rounded-xl bg-reply-line grow mt-2"></div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center gap-2">
                  <span className="font-semibold text-[15px] text-foreground">
                    {post?.user?.username || 'username'}
                  </span>
                  {post?.user?.verified && (
                      <svg
                        className="w-3.5 h-3.5 text-blue-500"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    )}
                  <span className="text-muted-foreground text-[15px]">
                    {formatTimeAgo(post?.created_at)}
                  </span>
              </div>
              <MoreDropdownMenuComponent />
            </div>

            {/* Post Text */}
            <p className="text-[15px] text-foreground mb-2">
              {post?.content}
            </p>

            <PostImage post={post} />

            {/* Quote Card - hiển thị khi post có original_post */}
            {post?.original_post && (
              <QuoteCard originalPost={post.original_post} showInteractions />
            )}

            {/* Interaction Bar */}
              <InteractionBar
                  likes={post?.likes_count || 0}
                  comments={post?.replies_count || 0}
                  repost={post?.reposts_and_quotes_count || 0}
                  shares={0}
                  post={post}
                  onToggleReply={handleToggleReplyForm}
              />
          </div>
        </div>
          {showReplyForm && (
              <ReplyForm post={post} onClose={handleToggleReplyForm}/>
          )}
      </CardContent>
    </Card>
  );
};

export default PostCard;

