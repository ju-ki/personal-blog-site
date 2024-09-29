import AdminLayout from '@/components/Common/Layout/Admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createCategory, fetchAllCategories } from '@/hooks/api/category';
import { CategoryType } from '@/types/category';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const schema = z.object({
    name: z.string().min(1, 'カテゴリ名を入力してください'),
  });
  type FormData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    reset,
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

  const onSubmit = async (data: FormData) => {
    const response = await createCategory(data.name);
    if (response.status === 201) {
      alert('カテゴリ作成に成功しました');
      console.log(response);
      setCategoryList(response.data as CategoryType[]);
      reset();
    } else {
      console.error('カテゴリの新規作成に失敗しました');
    }
  };
  return (
    <AdminLayout>
      <div className='text-2xl font-bold mb-6'>カテゴリ一覧</div>

      <form onSubmit={handleSubmit(onSubmit)} className='flex justify-between items-center mb-6'>
        <div className='w-1/2'>
          {errors.name && <span className='text-red-500 mb-2 block'>{errors.name.message}</span>}
          <Input {...register('name')} placeholder='カテゴリを作成' disabled={isSubmitting} />
        </div>
        <div>
          <Button
            type='submit'
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'
            disabled={isSubmitting}
          >
            作成
          </Button>
        </div>
      </form>

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
                <td className='px-6 py-4 border-b'>{category.name}</td>
                <td className='px-6 py-4'>
                  <Button className='px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600'>編集</Button>
                </td>
                <td className='px-6 py-4 border-b text-red-500 cursor-pointer'>
                  <Button className='px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600'>削除</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default CategoryList;
