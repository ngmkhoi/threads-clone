import { useState } from 'react';
import PostCard from '../../components/post/PostCard';

const Home = () => {
  // Sample data for posts
  const [posts] = useState([
    {
      id: 1,
      username: 'john_doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
      timestamp: '2h',
      content: 'Just launched my new project! Really excited to share this with everyone. What do you think?',
      likes: 42,
      comments: 8,
      reposts: 3,
    },
    {
      id: 2,
      username: 'jane_smith',
      avatar: 'https://i.pravatar.cc/150?img=2',
      timestamp: '4h',
      content: 'Beautiful day for coding! ☀️ Working on something amazing.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
      likes: 128,
      comments: 15,
      reposts: 12,
    },
    {
      id: 3,
      username: 'dev_mike',
      avatar: 'https://i.pravatar.cc/150?img=3',
      timestamp: '6h',
      content: 'Pro tip: Always write clean code. Your future self will thank you! 💻',
      likes: 89,
      comments: 23,
      reposts: 45,
    },
    {
      id: 4,
      username: 'sarah_codes',
      avatar: 'https://i.pravatar.cc/150?img=4',
      timestamp: '8h',
      content: 'Coffee + Code = Perfect Monday morning ☕',
      likes: 156,
      comments: 12,
      reposts: 8,
    },
    {
      id: 5,
      username: 'tech_enthusiast',
      avatar: 'https://i.pravatar.cc/150?img=5',
      timestamp: '10h',
      content: 'Just discovered an amazing React library that changed my workflow completely!',
      likes: 234,
      comments: 45,
      reposts: 67,
    },
    {
      id: 6,
      username: 'ui_designer',
      avatar: 'https://i.pravatar.cc/150?img=6',
      timestamp: '12h',
      content: 'Design inspiration of the day 🎨',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
      likes: 445,
      comments: 32,
      reposts: 21,
    },
  ]);

  return (
    <div className="min-h-screen">
      {/* Posts Feed */}
      <div className="shadow-md">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Load More Indicator */}
      <div className="p-8 text-center">
        <div className="inline-block w-6 h-6 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Home;
