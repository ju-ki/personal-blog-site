import { fetchAllPosts } from '@/hooks/api/posts';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { PostType, StatusNameType, StatusType } from '@/types/article';

const AdminPostList = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const posts: PostType[] = await fetchAllPosts();
      setLoading(false);
      setPosts(posts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  /**
   * 記事のステータス状態を変更する処理
   * @param value statusタイプ
   * @param id 記事ID
   */
  const switchStatus = (value: string, id: number) => {
    if (Object.values(StatusType).includes(value as StatusType)) {
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === id ? { ...post, status: value as StatusType } : post))
      );
    } else {
      console.log('Invalid status:', value);
    }
  };

  const deletePost = async (id: number) => {};
  return (
    <>
      <div>記事一覧</div>
      {loading && <p>Loading...</p>}
      <table className='min-w-full table-auto border-collapse'>
        <thead>
          <tr className='border-b'>
            <th className='px-4 py-2 text-left'>タイトル</th>
            <th className='px-4 py-2 text-left'>ビュー数</th>
            <th className='px-4 py-2 text-left'>作成日</th>
            <th className='px-4 py-2 text-left'>公開</th>
            <th className='px-4 py-2 text-left'>編集</th>
            <th className='px-4 py-2 text-left'>削除</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className='border-b'>
              <td className='px-4 py-2'>
                <Link className='underline' href={`/admin/post/${post.id}`}>
                  {post.title}
                </Link>
              </td>
              <td className='px-4 py-2'>100</td>
              <td className='px-4 py-2'>{new Date(post.created_at).toLocaleDateString('sv-SE')}</td>
              <td className='px-4 py-2'>
                <DropdownMenu>
                  <DropdownMenuTrigger>{StatusNameType[post.status]}</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuRadioGroup
                      value={post.status}
                      onValueChange={(value: string) => switchStatus(value, post.id)}
                    >
                      <DropdownMenuRadioItem value='private'>非公開</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value='public'>公開</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value='draft'>下書き</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
              <td className='px-4 py-2'>
                <Link href={`/admin/post/edit/${post.id}`}>
                  <Button className='px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600'>編集</Button>
                </Link>
              </td>
              <td className='px-4 py-2'>
                <Button
                  className='px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600'
                  onClick={() => deletePost(post.id)}
                >
                  削除
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminPostList;
