// import Editor from '@/components/Posts/Card/Editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createNewPost } from '@/hooks/api/posts';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const CreatePost = () => {
  const Editor = dynamic(() => import('@/components/Posts/Card/Editor/index'), { ssr: false });
  const router = useRouter();
  const schema = z.object({
    title: z.string().min(1, 'タイトルを入力して下さい'),
    content: z.string().min(1, 'コンテントを入力して下さい'),
  });
  type FormData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const response = await createNewPost(data);
    if (response.status === 201) {
      alert('記事作成に成功しました');
      console.log(response);
      router.push(`/admin`);
    } else {
      console.error('記事の新規作成に失敗しました');
    }
  };
  return (
    <>
      <div className='max-w-2xl mx-auto mt-10 p-6  rounded-lg shadow-lg'>
        <div className='text-2xl font-bold mb-4'>記事投稿</div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <Editor setValue={setValue} name='content' />
          </div>
          <div></div>
          <div className='text-right'>
            <Button className='px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
              投稿
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
