import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createNewPost } from '@/hooks/api/posts';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import TagList from '../Tag';
import { PostType } from '@/types/article';
import CategoryList from '../Category';
import DraftList from '../Draft';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';

const schema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, 'タイトルを入力して下さい'),
  content: z.string({ message: 'コンテントは必須です' }).min(1, 'コンテントを入力して下さい'),
  tags: z.array(z.number()).max(5, 'タグは最大で5つまでです').optional(),
  category_id: z.number({ message: 'カテゴリは必須です' }).min(1, 'カテゴリは必須です'),
});
export type FormData = z.infer<typeof schema>;

const CreatePost = () => {
  const Editor = dynamic(() => import('@/components/Posts/Card/Editor/index'), { ssr: false });
  const router = useRouter();
  const methods = useForm<FormData>({ resolver: zodResolver(schema) });
  const { formState } = methods;

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
      <Form {...methods}>
        <div className='mt-10 p-6  rounded-lg shadow-lg'>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <DraftList />
            <div className='mb-4'>
              {formState.errors.title && (
                <span className='text-red-500 mb-2 block'>{formState.errors.title.message}</span>
              )}
              <Label htmlFor='title' className='block text-lg font-medium text-gray-700 mb-2'>
                タイトル
              </Label>
              <Input
                {...methods.register('title')}
                id='title'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                type='text'
              />
            </div>
            <div className='mb-4'>
              {formState.errors.category_id && (
                <span className='text-red-500 mb-2 block'>{formState.errors.category_id.message}</span>
              )}
              <FormField
                control={methods.control}
                name='category_id'
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel htmlFor='categories' className='block text-lg font-medium text-gray-700 mb-2'>
                        カテゴリ
                      </FormLabel>
                      <FormControl>
                        <CategoryList {...field} />
                      </FormControl>
                    </FormItem>
                  </>
                )}
              />
            </div>
            <div className='mb-4'>
              {formState.errors.tags && (
                <span className='text-red-500 mb-2 block'>{formState.errors.tags.message}</span>
              )}
              <FormField
                control={methods.control}
                name='tags'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='tags' className='block text-lg font-medium text-gray-700 mb-2'>
                      タグ
                    </FormLabel>
                    <FormControl>
                      <TagList selectedTagIds={field.value || []} setValue={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className='mb-4'>
              {formState.errors.content && (
                <span className='text-red-500 mb-2 block'>{formState.errors.content.message}</span>
              )}
              <FormField
                control={methods.control}
                name='content'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='content' className='block text-lg font-medium text-gray-700 mb-2'>
                      コンテント
                    </FormLabel>
                    <FormControl>
                      <Editor onChange={field.onChange} editorState={field.value} isEditable={true} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className='text-right'>
              <Button className='px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                投稿
              </Button>
            </div>
          </form>
        </div>
      </Form>
    </>
  );
};

export default CreatePost;
