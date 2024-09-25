import AdminLayout from '@/components/Common/Layout/Admin';
import { fetchDetailPost, updatePost } from '@/hooks/api/posts';
import { PostType } from '@/types/article';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';

const PostEdit = () => {
  const Editor = dynamic(() => import('@/components/Posts/Card/Editor/index'), { ssr: false });
  const [postDetail, setPostDetail] = useState<PostType>();
  const [jsonEditorState, setJsonEditorState] = useState<string>('');
  const router = useRouter();
  const { post_id } = router.query;
  const schema = z.object({
    id: z.number({ message: '無効な記事です' }),
    title: z.string().min(1, 'タイトルを入力して下さい'),
    content: z.string().min(1, 'コンテントを入力して下さい'),
  });
  type FormData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    getPostDetail();
  }, [post_id]);

  async function getPostDetail() {
    if (post_id && !Array.isArray(post_id)) {
      const response = await fetchDetailPost(Number.parseInt(post_id));
      setPostDetail(response);
      if (response.content.length) {
        setJsonEditorState(response.content);
        reset({
          id: response.id,
          title: response.title,
          content: response.content,
        });
      }
    }
  }

  const onSubmit = async (data: FormData) => {
    const response = await updatePost(data);
    if (response.status == 200) {
      alert('記事更新に成功しました');
      router.push('/admin/post/list');
    } else {
      alert('記事更新に失敗しました');
    }
  };
  return (
    <AdminLayout>
      <Link href={'/admin/post/list'}>一覧に戻る</Link>
      {!jsonEditorState ? (
        <>
          <div>Loading...</div>
        </>
      ) : (
        <>
          <div className='max-w-2xl mx-auto mt-10 p-6  rounded-lg shadow-lg'>
            <div className='text-2xl font-bold mb-4'>記事投稿</div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {errors.id && <span className='text-red-500 mb-2 block'>{errors.id.message}</span>}
              <input type='hidden' {...register('id')} />
              <div className='mb-4'>
                {errors.title && <span className='text-red-500 mb-2 block'>{errors.title.message}</span>}
                <Label htmlFor='title' className='block text-lg font-medium text-gray-700 mb-2'>
                  タイトル
                </Label>
                <Input
                  {...register('title')}
                  id='title'
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  type='text'
                />
              </div>
              <div className='mb-4'>
                {errors.content && <span className='text-red-500 mb-2 block'>{errors.content.message}</span>}
                <Label htmlFor='content' className='block text-lg font-medium text-gray-700 mb-2'>
                  コンテント
                </Label>
                <Editor setValue={setValue} name='content' editorState={jsonEditorState} isEditable={true} />
              </div>
              <div></div>
              <div className='text-right'>
                <Button className='px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                  編集
                </Button>
              </div>
            </form>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default PostEdit;
