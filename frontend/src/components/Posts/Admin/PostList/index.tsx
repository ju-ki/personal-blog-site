import { deletePost, updateStatus } from '@/hooks/api/posts';
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
import { StatusNameType, StatusType } from '@/types/article';
import Loading from '@/components/Common/Loading';
import PaginationLinkItem from '@/components/Common/Pagination';
import { usePaginationStore } from '@/store/paginationStore';

const AdminPostList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchPaginateData, currentPage, paginateData, updatePostStatus } = usePaginationStore();

  useEffect(() => {
    setLoading(true);
    fetchPaginateData(currentPage);
    setLoading(false);
  }, [currentPage, fetchPaginateData]);

  /**
   * 記事のステータス状態を変更する処理
   * @param value statusタイプ
   * @param id 記事ID
   */
  const switchStatus = async (value: string, id: number) => {
    setLoading(true);
    try {
      const response = await updateStatus(id, value as StatusType);
      if (Object.values(StatusType).includes(response.data.status as StatusType)) {
        updatePostStatus(id, response.data.status as StatusType);
      } else {
        console.log('Invalid status:', value);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id: number) => {
    setLoading(true);
    try {
      const response = await deletePost(id);
      if (response.status === 200) {
        alert('記事を削除しました');
      } else {
        alert('記事の削除に失敗しました');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
          {paginateData &&
            paginateData.data.map((post) => (
              <>
                {post.id !== undefined && (
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
                        onClick={() => handleDeletePost(post.id)}
                        disabled={loading}
                      >
                        削除
                      </Button>
                    </td>
                  </tr>
                )}
              </>
            ))}
        </tbody>
      </table>
      {paginateData && (
        <div className='my-2'>
          <PaginationLinkItem />
        </div>
      )}
      <Loading isLoading={loading} />
    </>
  );
};

export default AdminPostList;
