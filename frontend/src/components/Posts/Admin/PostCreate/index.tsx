import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { backupPost, createNewPost } from '@/hooks/api/posts';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import TagList from '../Tag';
import { PostType } from '@/types/article';
import CategoryList from '../Category';
import { debounce } from 'lodash';
import { showToast } from '@/components/Common/Toast';

const CreatePost = () => {
  const Editor = dynamic(() => import('@/components/Posts/Card/Editor/index'), { ssr: false });
  const router = useRouter();
  const schema = z.object({
    id: z.number().optional(),
    title: z.string().min(1, 'タイトルを入力して下さい'),
    content: z.string({ message: 'コンテントは必須です' }).min(1, 'コンテントを入力して下さい'),
    tags: z.array(z.number()).max(5, 'タグは最大で5つまでです').optional(),
    category_id: z.number({ message: 'カテゴリは必須です' }).min(1, 'カテゴリは必須です'),
  });
  type FormData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const tags = watch('tags', []);

  const debouncedBackup = useCallback(
    debounce(async (data: FormData) => {
      showToast('info', 'バックアップ中です....');
      const response = await backupPost(data as PostType);
      if (response.status < 300) {
        const backupData = response.data as PostType;
        setValue('title', backupData.title);
        setValue('id', backupData.id);
        setValue('category_id', backupData.category_id);
        setValue('content', backupData.content);
        showToast('success', '保存しました!');
      } else {
        showToast('error', 'バックアップに失敗しました');
      }
    }, 10000), // 10秒ごとにバックアップ
    []
  );

  //コンテントが更新されたらバックアップを開始する
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'content') {
        debouncedBackup(value as FormData);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, debouncedBackup]);

  const onSubmit = async (data: FormData) => {
    const response = await createNewPost(data as PostType);
    if (response.status === 201) {
      alert('記事作成に成功しました');
      router.push(`/admin/post/list`);
    } else {
      alert('記事作成に失敗しました');
      console.error('記事の新規作成に失敗しました');
    }
  };
  return (
    <>
      <div className='mt-10 p-6  rounded-lg shadow-lg'>
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
            {errors.category_id && <span className='text-red-500 mb-2 block'>{errors.category_id.message}</span>}
            <Label htmlFor='categories' className='block text-lg font-medium text-gray-700 mb-2'>
              カテゴリ
            </Label>
            <CategoryList setValue={(selectedCategoryId: number) => setValue('category_id', selectedCategoryId)} />
          </div>
          <div className='mb-4'>
            {errors.tags && <span className='text-red-500 mb-2 block'>{errors.tags.message}</span>}
            <Label htmlFor='tags' className='block text-lg font-medium text-gray-700 mb-2'>
              タグ
            </Label>
            <TagList
              selectedTagIds={tags as number[]}
              setValue={(selectedTagIds: number[]) => setValue('tags', selectedTagIds)} // タグIDをセット
            />
          </div>
          <div className='mb-4'>
            {errors.content && <span className='text-red-500 mb-2 block'>{errors.content.message}</span>}
            <Label htmlFor='content' className='block text-lg font-medium text-gray-700 mb-2'>
              コンテント
            </Label>
            <Editor setValue={setValue} name='content' />
          </div>
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
