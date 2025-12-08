import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '@/components/Post/PostCard.jsx';
import PostCardSkeleton from '@/components/Post/components/PostCardSkeleton';
import { getPost, clearPostDetail } from '@/features/postDetail/postDetailSlice';
import { useTranslation } from 'react-i18next';

const Embed = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const { t } = useTranslation('Embed');
    
    const { post, loading, error } = useSelector((state) => state.postDetail);

    useEffect(() => {
        if (postId) {
            dispatch(getPost(postId));
        }

        return () => {
            dispatch(clearPostDetail());
        };
    }, [dispatch, postId]);

    // Error state
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[200px] text-muted-foreground">
                {t('postNotFound')}
            </div>
        );
    }

    return (
        <div className="embed-container">
            {/* Post Card */}
            {loading ? (
                <PostCardSkeleton />
            ) : post ? (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <PostCard post={post} isDetailView />
                    
                    {/* View on Threads link */}
                    <div className="px-4 py-3 border-t border-gray-200">
                        <Link 
                            to={`/post/${post.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-500 hover:text-blue-600 hover:underline font-medium"
                        >
                            {t('viewOnThreads')}
                        </Link>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Embed;
