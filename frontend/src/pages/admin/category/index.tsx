import AdminLayout from '@/components/Common/Layout/Admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createCategory, deleteCategory, fetchAllCategories, updateCategory } from '@/hooks/api/category';
import { CategoryType } from '@/types/category';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const CategoryList = () => {
  const [currentEditCategory, setCurrentCategory] = useState<CategoryType | null>(null);
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const schema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, 'カテゴリ名を入力してください'),
  });
  type FormData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const fetchCategories = async () => {
    try {
      const categories: CategoryType[] = await fetchAllCategories();
      setCategoryList(categories);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const onClickEditButton = (event: React.MouseEvent<HTMLButtonElement>, category: CategoryType) => {
    event.preventDefault();
    setCurrentCategory(category);
    setValue('id', category.id);
    setValue('name', category.name);
  };

  const onClickCancelEdit = () => {
    setCurrentCategory(null);
    reset({ name: '' });
  };

  const onClickDeleteButton = async (id: number) => {
    if (confirm('本当に削除しますか')) {
      setIsLoading(true);
      const response = await deleteCategory(id);
      if (response.status === 200) {
        alert('カテゴリを削除しました');
        setCategoryList(response.data as CategoryType[]);
      } else {
        console.error('カテゴリの削除に失敗しました');
      }
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (data.id) {
      const response = await updateCategory(data.id, data.name);
      if (response.status === 200) {
        alert('カテゴリ更新に成功しました');
        setCategoryList(response.data as CategoryType[]);
        setCurrentCategory(null);
        reset();
      } else {
        console.error('カテゴリの更新に失敗しました');
      }
    } else {
      const response = await createCategory(data.name);
      if (response.status === 201) {
        alert('カテゴリ作成に成功しました');
        setCategoryList(response.data as CategoryType[]);
        reset();
      } else {
        console.error('カテゴリの新規作成に失敗しました');
      }
    }
  };
  return (
    <AdminLayout>
      <div className='text-2xl font-bold mb-6'>カテゴリ一覧</div>

      <form onSubmit={handleSubmit(onSubmit)} className='flex justify-between items-center mb-6'>
        <div className='w-1/2'>
          {errors.name && <span className='text-red-500 mb-2 block'>{errors.name.message}</span>}
          {currentEditCategory == null ? (
            <>
              <Input
                {...register('name')}
                placeholder='カテゴリを作成'
                disabled={isSubmitting || currentEditCategory != null || isLoading}
              />
            </>
          ) : (
            <>
              <Input placeholder='カテゴリを作成' disabled={isSubmitting} value='' />
            </>
          )}
        </div>
        <div>
          <Button
            type='submit'
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'
            disabled={isSubmitting || currentEditCategory != null || isLoading}
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
                <th className='px-6 py-3 border-b text-left text-sm font-medium text-gray-700'>カテゴリ名</th>
                <th className='px-6 py-3 border-b text-left text-sm font-medium text-gray-700'>編集</th>
                <th className='px-6 py-3 border-b text-left text-sm font-medium text-gray-700'>削除</th>
              </tr>
            </thead>
            <tbody>
              {categoryList.map((category) => (
                <tr key={category.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 border-b'>{category.id}</td>
                  <td className='px-6 py-4 border-b'>
                    {currentEditCategory?.id === category.id ? (
                      <>
                        <Input {...register('name')} type='text' />
                      </>
                    ) : (
                      <>{category.name}</>
                    )}
                  </td>
                  <td className='px-6 py-4 border-b'>
                    {currentEditCategory?.id === category.id ? (
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
                          onClick={(event) => onClickEditButton(event, category)}
                          disabled={isSubmitting || currentEditCategory != null || isLoading}
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
                      disabled={isSubmitting || currentEditCategory != null || isLoading}
                      onClick={() => onClickDeleteButton(category.id)}
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

export default CategoryList;
