import Layout from '@/components/Common/Layout';
import PostCard from '@/components/Posts/Card';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

type PostType = {
  id: number;
  title: string;
  content: string;
};

const Posts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost/api/posts');
      console.log(response);
      setLoading(false);
      setPosts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <Layout>
      <div>記事一覧</div>
      {loading && <p>Loading...</p>}
      <ul className='grid grid-cols-3'>
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard article={post} />
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Posts;
