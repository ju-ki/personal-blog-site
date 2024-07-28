import Layout from '@/components/Common/Layout';
import PostCard from '@/components/Posts/Card';
import { fetchAllPosts } from '@/hooks/api/posts';
import { Article } from '@/types/article';
import React, { useEffect, useState } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const posts: Article[] = await fetchAllPosts();
      setLoading(false);
      setPosts(posts);
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
