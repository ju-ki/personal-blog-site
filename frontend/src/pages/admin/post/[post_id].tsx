import { fetchDetailPost } from '@/hooks/api/posts';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/Common/Layout/Admin';
import { PostType } from '@/types/article';
import Loading from '@/components/Common/Loading';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import TagIcon from '@mui/icons-material/Tag';

const PostDetail = () => {
  const Editor = dynamic(() => import('@/components/Posts/Card/Editor/index'), { ssr: false });
  const [postDetail, setPostDetail] = useState<PostType>();
  const [jsonEditorState, setJsonEditorState] = useState<string>('');
  const router = useRouter();
  const { post_id } = router.query;

  useEffect(() => {
    getPostDetail();
  }, [post_id]);

  async function getPostDetail() {
    if (post_id && !Array.isArray(post_id)) {
      const response = await fetchDetailPost(Number.parseInt(post_id));
      setPostDetail(response);
      if (response.content.length) {
        setJsonEditorState(response.content);
      }
    }
  }

  return (
    <AdminLayout>
      <Button className='mx-4' variant={'outline'}>
        <Link href={'/admin/post/list'}>一覧に戻る</Link>
      </Button>
      {!jsonEditorState ? (
        <>
          <Loading isLoading={true} />
        </>
      ) : (
        <>
          <div className='text-4xl m-4'>{postDetail?.title}</div>
          <div className='text-sm m-4 text-zinc-700 font-medium'>{postDetail?.category?.name}</div>
          <div className='flex flex-wrap gap-2 my-3'>
            {postDetail?.post_tag.map((post_tag) => (
              <div
                key={post_tag.tag.id}
                className='flex items-center space-x-2 rounded-full bg-zinc-100 px-3 py-2 border border-zinc-300 shadow-sm hover:bg-zinc-200 transition-all duration-200'
              >
                <TagIcon className='h-5 w-5 text-zinc-500' />
                <div className='text-sm text-zinc-700 font-medium'>{post_tag.tag.name}</div>
              </div>
            ))}
          </div>

          <Editor editorState={jsonEditorState} isEditable={false} />
        </>
      )}
    </AdminLayout>
  );
};

export default PostDetail;
