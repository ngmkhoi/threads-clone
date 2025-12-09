import PostCard from '@/components/post/PostCard.jsx';
import ContentContainer from "@/components/Common/ContentContainer/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import postServices from "@/services/postService.js";
import PostCardSkeleton from "@/components/post/components/PostCardSkeleton/index.jsx";
import {useTranslation} from "react-i18next";
import InfiniteScrollLoader from "@/components/Common/InfiniteScrollLoader/index.jsx";
import CreatePostCard from "@/pages/Home/components/CreatePostCard/index.jsx";
import {selectIsAuthenticated} from "@/features/auth/authSelector.js";

const Home = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation('utils');
    const { posts, loading, pagination } = useSelector((state) => state.posts);
    const hasMore = pagination.current_page < pagination.last_page;
    const isAuthenticated = useSelector(selectIsAuthenticated)


    const handleLoadMore = () => {
        if(!loading && hasMore) {
            const nextPage = pagination.current_page + 1;
            dispatch(postServices.getFeed({ page: nextPage }))
        }
    }

    useEffect(() => {
      if(posts.length === 0) {
          dispatch(postServices.getFeed({}))
      }
    }, [dispatch, posts.length])

    return (
        <div>
            <ContentContainer>
                {/* Initial loading - skeleton toàn bộ */}
                {loading && posts.length === 0 ? (
                    Array.from({ length: 10 }).map((_, index) => (
                        <PostCardSkeleton key={`skeleton-${index}`} />
                    ))
                ) : (
                    /* Infinite scroll wrapper */
                    <InfiniteScrollLoader
                        onLoadMore={handleLoadMore}
                        hasMore={hasMore}
                        loading={loading && posts.length > 0}
                        LoadingComponent={PostCardSkeleton}
                        loadingCount={3}
                        endMessage={t('Home.outofposts')}
                        triggerMargin="100px"
                    >
                        {isAuthenticated && <CreatePostCard />}
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </InfiniteScrollLoader>
                )}
            </ContentContainer>
        </div>
    );

};

export default Home;
