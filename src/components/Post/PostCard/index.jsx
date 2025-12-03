import InteractionBar from '@/components/Post/PostCard/components/InteractionBar';
import { Card, CardContent } from "@/components/ui/card.jsx";
import PostImage from "@/components/Post/PostCard/components/PostImage/index.jsx";
import DropdownMenuComponent from "@/components/Post/PostCard/components/DropdownMenu/index.jsx";
import AvatarComponent from "@/components/Post/PostCard/components/Avatar/index.jsx";
import {formatTimeAgo} from "@/utils/timeFormat.js";

const PostCard = ({ post }) => {
  return (
    <Card className="bg-content-background border-border py-2 transition-colors shadow-none rounded-none cursor-pointer border-0 border-b">
      <CardContent className="p-2">
        <div className="flex gap-3">
          {/* Avatar */}
          <AvatarComponent post={post} />

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center gap-2">
                  <span className="font-semibold text-[15px] text-foreground">
                    {post?.user?.username || 'username'}
                  </span>
                  <span className="text-muted-foreground text-[15px]">
                    {formatTimeAgo(post?.created_at)}
                  </span>
              </div>
              <DropdownMenuComponent />
            </div>

            {/* Post Text */}
            <p className="text-[15px] text-foreground mb-2">
              {post?.content}
            </p>

            <PostImage post={post} />

            {/* Interaction Bar */}
              <InteractionBar
                  likes={post?.likes_count || 0}
                  comments={post?.replies_count || 0}
                  repost={post?.reposts_and_quotes_count || 0}
                  shares={0}
                  post={post}
              />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
