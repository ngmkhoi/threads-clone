import { useState } from 'react';
import PostCard from '../../components/post/PostCard';
import nguoidepnoigian from "@/assets/nguoidepnoigian/index.js";
import makeup_isme from "@/assets/makeup_isme/index.js";
import heokonngokngeck from "@/assets/heokonngokngeck/index.js";
import _2thang9 from "@/assets/_2thang9/index.js";
import chambi from "@/assets/chambi/index.js";
import aotrang from "@/assets/aotrang/index.js";
import babykewt from "@/assets/babykewt/index.js";
import baonhi from "@/assets/aodo/index.js";
import aoden from "@/assets/aoden/index.js";
import hnljnh_04 from "@/assets/hnljnh_04/index.js";

const Home = () => {
  // Sample data for posts
  const [posts] = useState([
    {
      id: 1,
      username: '_4thang11',
      avatar: makeup_isme[0],
      timestamp: '2h',
      content: 'Muốn có người yêu thì phải tìm ai ????',
        image: chambi,
      likes: 42,
      comments: 8,
      reposts: 3,
    },
    {
      id: 2,
      username: 'nguoidep_noigian',
      avatar: nguoidepnoigian[0],
      timestamp: '4h',
      content: 'Hêy Siri, mai đi làm dùm tao.',
        image: nguoidepnoigian,
      likes: 128,
      comments: 15,
      reposts: 12,
    },
    {
      id: 3,
      username: 'vosieutu',
      avatar: heokonngokngeck[0],
      timestamp: '6h',
      content: 'Ăn gì và mặc gì để cuộc sống trở nên zui zẻ\n' +
          '" Ăn ảnh và mặc kệ " hihi',
        image: heokonngokngeck,
      likes: 89,
      comments: 23,
      reposts: 45,
    },
    {
      id: 4,
      username: '_2thang9',
      avatar: makeup_isme[0],
      timestamp: '8h',
      content: 'Cho em 1 bát phở lòng tái',
        image: _2thang9,
      likes: 156,
      comments: 12,
      reposts: 8,
    },
    {
      id: 5,
      username: 'anthittraidep',
      avatar: makeup_isme[0],
      timestamp: '10h',
      content: '7 chủ nhật nữa là 2026',
        image: aotrang,
      likes: 234,
      comments: 45,
      reposts: 67,
    },
    {
      id: 6,
      username: 'anhthy_nguyen',
      avatar: aoden[0],
      timestamp: '12h',
      content: 'mọi thứ hôm nay hoá điên với ck',
      image: babykewt,
      likes: 445,
      comments: 32,
      reposts: 21,
    },
      {
          id: 7,
          username: 'baonhi',
          avatar: aotrang[1],
          timestamp: '8h',
          content: '💅💅',
          image: baonhi,
          likes: 790,
          comments: 32,
          reposts: 21,
      },
      {
          id: 8,
          username: 'hnglinh_04',
          avatar: hnljnh_04[0],
          timestamp: '5h',
          content: 'your girlfriend just posted a photo ✨',
          image: hnljnh_04,
          likes: 890,
          comments: 35,
          reposts: 22,
      },
  ]);

  return (
    <div className="min-h-screen">
      {/* Posts Feed */}
      <div
          style={{
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06)'
          }}
          className="pt-2"
      >
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Load More Indicator */}
    </div>
  );
};

export default Home;
