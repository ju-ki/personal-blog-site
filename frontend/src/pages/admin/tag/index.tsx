import AdminLayout from '@/components/Common/Layout/Admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createTag, deleteTag, fetchAllTags, updateTag } from '@/hooks/api/tags';
import { TagType } from '@/types/tag';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const TagList = () => {
  const [currentEditTag, setCurrentTag] = useState<TagType | null>(null);
  const [tagList, setTagList] = useState<TagType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const schema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, 'タグ名を入力してください'),
  });
  type FormData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const fetchTags = async () => {
    try {
      const tags: TagType[] = await fetchAllTags();
      setTagList(tags);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchTags();
  }, []);

  const onClickEditButton = (event: React.MouseEvent<HTMLButtonElement>, tag: TagType) => {
    event.preventDefault();
    setCurrentTag(tag);
    setValue('id', tag.id);
    setValue('name', tag.name);
  };

  const onClickCancelEdit = () => {
    setCurrentTag(null);
    reset({ name: '' });
  };

  const onClickDeleteButton = async (id: number) => {
    if (confirm('本当に削除しますか')) {
      setIsLoading(true);
      const response = await deleteTag(id);
      if (response.status === 200) {
        alert('カテゴリを削除しました');
        setTagList(response.data as TagType[]);
      } else {
        console.error('カテゴリの削除に失敗しました');
      }
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (data.id) {
      const response = await updateTag(data.id, data.name);
      if (response.status === 200) {
        alert('タグ更新に成功しました');
        setTagList(response.data as TagType[]);
        setCurrentTag(null);
        reset();
      } else {
        console.error('タグの更新に失敗しました');
      }
    } else {
      const response = await createTag(data.name);
      if (response.status === 201) {
        alert('タグ作成に成功しました');
        setTagList(response.data as TagType[]);
        reset();
      } else {
        console.error('タグの新規作成に失敗しました');
      }
    }
  };
  return (
    <AdminLayout>
      <div className='text-2xl font-bold mb-6'>タグ一覧</div>

      <form onSubmit={handleSubmit(onSubmit)} className='flex justify-between items-center mb-6'>
        <div className='w-1/2'>
          {errors.name && <span className='text-red-500 mb-2 block'>{errors.name.message}</span>}
          {currentEditTag == null ? (
            <>
              <Input {...register('name')} placeholder='タグを作成' disabled={isSubmitting} />
            </>
          ) : (
            <>
              <>
                <Input placeholder='タグを作成' disabled={isSubmitting} value='' />
              </>
            </>
          )}
        </div>
        <div>
          <Button
            type='submit'
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'
            disabled={isSubmitting || currentEditTag != null || isLoading}
          >
            作成
          </Button>
        </div>
      </form>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white border border-gray-200'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='px-6 py-3 border-b text-left text-sm font-medium text-gray-700'>ID</th>
                <th className='px-6 py-3 border-b text-left text-sm font-medium text-gray-700'>タグ名</th>
                <th className='px-6 py-3 border-b text-left text-sm font-medium text-gray-700'>編集</th>
                <th className='px-6 py-3 border-b text-left text-sm font-medium text-gray-700'>削除</th>
              </tr>
            </thead>
            <tbody>
              {tagList.map((tag) => (
                <tr key={tag.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 border-b'>{tag.id}</td>
                  <td className='px-6 py-4 border-b'>
                    {currentEditTag?.id === tag.id ? (
                      <>
                        <Input {...register('name')} type='text' />
                      </>
                    ) : (
                      <>{tag.name}</>
                    )}
                  </td>
                  <td className='px-6 py-4 border-b'>
                    {currentEditTag?.id === tag.id ? (
                      <>
                        <Button className='px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600' type='submit'>
                          更新
                        </Button>
                        <Button
                          variant={'outline'}
                          className='px-3 py-1 ml-2 text-blue-600 outline-blue-600 rounded-md'
                          onClick={onClickCancelEdit}
                        >
                          キャンセル
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          type='button'
                          className='px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600'
                          onClick={(event) => onClickEditButton(event, tag)}
                          disabled={isSubmitting || currentEditTag != null || isLoading}
                        >
                          編集
                        </Button>
                      </>
                    )}
                  </td>
                  <td className='px-6 py-4 border-b text-red-500 cursor-pointer'>
                    <Button
                      type='button'
                      className='px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600'
                      disabled={isSubmitting || currentEditTag != null || isLoading}
                      onClick={() => onClickDeleteButton(tag.id)}
                    >
                      削除
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </AdminLayout>
  );
};

export default TagList;
