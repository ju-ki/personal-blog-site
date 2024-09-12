import { fetchDetailPost, PostType } from '@/hooks/api/posts';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const PostDetail = () => {
  const [postDetail, setPostDetail] = useState<PostType>();
  const { post_id } = useParams();
  useEffect(() => {
    if (post_id) {
      getPostDetail();
    }
  }, [post_id]);

  async function getPostDetail() {
    const response = await fetchDetailPost(Number.parseInt(post_id));
    setPostDetail(response);
  }

  return (
    <div>
      <Link href={'/admin'}>一覧に戻る</Link>
      {postDetail?.title}
      <pre>{postDetail?.content}</pre>
    </div>
  );
};

export default PostDetail;
