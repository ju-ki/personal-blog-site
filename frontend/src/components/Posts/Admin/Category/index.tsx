import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetchAllCategories } from '@/hooks/api/category';
import { CategoryType } from '@/types/category';
import React, { useEffect, useState } from 'react';

interface CategoryListProps {
  onChange: (value: number) => void;
  value?: number;
}

const CategoryList: React.FC<CategoryListProps> = ({ onChange, value }) => {
  const [categoriesList, setCategoriesList] = useState<CategoryType[]>([]);

  useEffect(() => {
    getAllCategories();
  }, []);

  async function getAllCategories() {
    const response = await fetchAllCategories();
    setCategoriesList(response);
  }

  return (
    <div className='w-full'>
      <Select
        onValueChange={(newValue) => {
          onChange(Number(newValue));
        }}
        value={value?.toString() || ''}
      >
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
