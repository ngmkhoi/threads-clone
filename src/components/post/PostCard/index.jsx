import { MoreHorizontal } from 'lucide-react';
import InteractionBar from '@/components/post/InteractionBar';
import {useTranslation} from "react-i18next";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import {Card, CardContent} from "@/components/ui/card.jsx";

const PostCard = ({ post }) => {
    const { t } = useTranslation('PostCard');

  return (
      <Card className="px-4 py-4 border-0 border-b border-l border-r border-gray-200 hover:bg-gray-50/50 transition-colors shadow-none rounded-none cursor-pointer">
          <CardContent className="p-0">
              <div className="flex gap-3">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <Avatar>
                  <AvatarImage
                    src={post?.avatar || 'https://via.placeholder.com/40'}
                    alt={t('altText.userAvatar')}
                    className="cursor-pointer"
                  />
                  <AvatarFallback className="bg-gray-200 text-gray-600 font-semibold">
                    {post?.username?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[15px] text-gray-900">
                  {post?.username || 'username'}
                </span>
                <span className="text-gray-500 text-[15px]">
                  {post?.timestamp || '2h'}
                </span>
              </div>
              <button className="text-gray-500 hover:text-gray-700 p-1">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Post Text */}
            <p className="text-[15px] text-gray-900 mb-3 leading-5">
              {post?.content}
            </p>

            {/* Post Image (if exists) */}
            {post?.image && (
              <div className="mb-3 overflow-hidden">
                <img
                  src={post.image}
                  alt={t('altText.postContent')}
                  className="w-3/4 rounded-2xl h-auto object-cover"
                />
              </div>
            )}

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

