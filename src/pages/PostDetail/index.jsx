import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ContentContainer from '@/components/Common/ContentContainer';
import PostCard from '@/components/Post';
import PostCardSkeleton from '@/components/Post/components/PostCardSkeleton';
import ReplyForm from '@/pages/Home/components/ReplyForm';
import { getPost, getPostReplies, clearPostDetail, addReply } from '@/features/postDetail/postDetailSlice';
import { selectIsAuthenticated } from '@/features/auth/authSelector';
import InfiniteScrollLoader from '@/components/Common/InfiniteScrollLoader';
import { useTranslation } from 'react-i18next';
import ReplyCard from './components/ReplyCard';

const PostDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { t } = useTranslation('PostDetail');
    const isAuthenticated = useSelector(selectIsAuthenticated);
    
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
            dispatch(getPostReplies({ id, page: 1 }));
        }

        return () => {
            dispatch(clearPostDetail());
        };
    }, [dispatch, id]);

    const handleLoadMoreReplies = () => {
        if (!repliesLoading && hasMoreReplies) {
            const nextPage = repliesPagination.current_page + 1;
            dispatch(getPostReplies({ id, page: nextPage }));
        }
    };

    const handleReplySuccess = (newReply) => {
        dispatch(addReply(newReply));
    };

    return (
        <div className="h-full">
            <ContentContainer>
                {/* Main Post */}
                {loading ? (
                    <PostCardSkeleton />
                ) : post ? (
                    <div className="pt-2">
                        <PostCard post={post} isDetailView />
                        
                        {/* Reply Form */}
                        {isAuthenticated && (
                            <div className="border-b !border-card-border px-4 py-3">
                                <ReplyForm 
                                    post={post} 
                                    onClose={() => {}}
                                    onReplySuccess={handleReplySuccess}
                                />
                            </div>
                        )}
                    </div>
                ) : null}

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

