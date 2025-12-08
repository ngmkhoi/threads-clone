import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ContentContainer from '@/components/Common/ContentContainer';
import PostCard from '@/components/Post';
import PostCardSkeleton from '@/components/Post/components/PostCardSkeleton';
import { getPost, getPostReplies, clearPostDetail, addReply } from '@/features/postDetail/postDetailSlice';
import InfiniteScrollLoader from '@/components/Common/InfiniteScrollLoader';
import { useTranslation } from 'react-i18next';
import ReplyCard from './components/ReplyCard';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

const PostDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { t } = useTranslation('PostDetail');
    const [sortBy, setSortBy] = useState('newest'); // 'newest' or 'most_liked'
    
    const { 
        post, 
        replies, 
        repliesPagination, 
        loading, 
        repliesLoading 
    } = useSelector((state) => state.postDetail);

    const hasMoreReplies = repliesPagination.current_page < repliesPagination.last_page;

    useEffect(() => {
        // Scroll to top when entering PostDetail
        window.scrollTo(0, 0);
        
        if (id) {
            dispatch(getPost(id));
            dispatch(getPostReplies({ id, page: 1, sort: sortBy }));
        }

        return () => {
            dispatch(clearPostDetail());
        };
    }, [dispatch, id, sortBy]);

    const handleLoadMoreReplies = () => {
        if (!repliesLoading && hasMoreReplies) {
            const nextPage = repliesPagination.current_page + 1;
            dispatch(getPostReplies({ id, page: nextPage, sort: sortBy }));
        }
    };

    const handleReplySuccess = (newReply) => {
        dispatch(addReply(newReply));
    };

    const handleSortChange = (newSort) => {
        if (newSort !== sortBy) {
            setSortBy(newSort);
        }
    };

    const getSortLabel = () => {
        return sortBy === 'newest' ? t('filter.newest') : t('filter.mostLiked');
    };

    return (
        <div className="h-full">
            <ContentContainer>
                {/* Main Post */}
                {loading ? (
                    <PostCardSkeleton />
                ) : post ? (
                    <div className="pt-2">
                        <PostCard post={post} isDetailView onReplySuccess={handleReplySuccess} />
                    </div>
                ) : null}

                {/* Filter Bar - Divider between Post and Replies */}
                {!loading && post && (
                    <div className="flex items-center justify-between px-4 py-3 border-b !border-card-border bg-content-background">
                        <span className="font-semibold text-foreground">{t('replies')}</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors outline-none">
                                    <span>{getSortLabel()}</span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="!rounded-xl bg-content-background">
                                <DropdownMenuItem 
                                    className={`cursor-pointer ${sortBy === 'newest' ? 'font-semibold' : ''}`}
                                    onClick={() => handleSortChange('newest')}
                                >
                                    {t('filter.newest')}
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                    className={`cursor-pointer ${sortBy === 'most_liked' ? 'font-semibold' : ''}`}
                                    onClick={() => handleSortChange('most_liked')}
                                >
                                    {t('filter.mostLiked')}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}

                {/* Replies Section */}
                <div className="mt-2">
                    <InfiniteScrollLoader
                        onLoadMore={handleLoadMoreReplies}
                        hasMore={hasMoreReplies}
                        loading={repliesLoading && replies.length > 0}
                        LoadingComponent={PostCardSkeleton}
                        loadingCount={2}
                        endMessage={replies.length > 0 ? t('noMoreReplies', 'No more replies') : ''}
                        triggerMargin="100px"
                    >
                        {repliesLoading && replies.length === 0 ? (
                            Array.from({ length: 3 }).map((_, index) => (
                                <PostCardSkeleton key={`reply-skeleton-${index}`} />
                            ))
                        ) : (
                            replies.map((reply) => (
                                <ReplyCard key={reply.id} reply={reply} />
                            ))
                        )}
                    </InfiniteScrollLoader>
                </div>
            </ContentContainer>
        </div>
    );
};

export default PostDetail;
