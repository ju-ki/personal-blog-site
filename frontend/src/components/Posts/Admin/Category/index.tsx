import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetchAllCategories } from '@/hooks/api/category';
import { CategoryType } from '@/types/category';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const CategoryList: React.FC = () => {
  const { setValue, watch } = useFormContext();
  const [categoriesList, setCategoriesList] = useState<CategoryType[]>([]);
  const categoryId = watch('category_id');

  useEffect(() => {
    getAllCategories();
  }, []);

  async function getAllCategories() {
    const response = await fetchAllCategories();
    setCategoriesList(response);
  }

  const handleSetValue = (val: string) => {
    setValue('category_id', Number.parseInt(val));
  };
  return (
    <div className='w-full'>
      <Select onValueChange={handleSetValue} value={categoryId ? categoryId.toString() : ''}>
        <SelectTrigger>
          <SelectValue placeholder='カテゴリを選択して下さい' />
        </SelectTrigger>
        <SelectContent>
          {categoriesList.map((category) => (
            <SelectItem key={category.id} value={category.id.toString()}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryList;
