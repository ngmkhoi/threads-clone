import InteractionBar from '@/components/post/InteractionBar';
import {useTranslation} from "react-i18next";
import {Card, CardContent} from "@/components/ui/card.jsx";
import PostImage from "@/components/post/PostCard/components/PostImage/index.jsx";
import DropdownMenuComponent from "@/components/post/PostCard/components/DropdownMenu/index.jsx";
import AvatarComponent from "@/components/post/PostCard/components/Avatar/index.jsx";

const PostCard = ({ post }) => {

  return (
      <Card className="bg-postcard-background px-4 py-4 border-0 border-b border-l border-r border-border transition-colors shadow-none rounded-none cursor-pointer">
          <CardContent className="p-0">
              <div className="flex gap-3">
                  {/* Avatar */}
                 <AvatarComponent post={post}/>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[15px] text-foreground">
                          {post?.username || 'username'}
                        </span>
                        <span className="text-muted-foreground text-[15px]">
                          {post?.timestamp || '2h'}
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
                      likes={post?.likes || 0}
                      comments={post?.comments || 0}
                      repost={post?.reposts || 0}
                      shares={post?.shares || 0}
                    />
                  </div>
              </div>
          </CardContent>
      </Card>
  );
};

export default PostCard;
