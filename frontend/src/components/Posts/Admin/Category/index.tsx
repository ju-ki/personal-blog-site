import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetchAllCategories } from '@/hooks/api/category';
import { CategoryType } from '@/types/category';
import React, { useEffect, useState } from 'react';

interface CategoryListProps {
  setValue: (selectedCategoryId: number) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ setValue }) => {
  const [categoriesList, setCategoriesList] = useState<CategoryType[]>([]);

  useEffect(() => {
    getAllCategories();
  }, []);

  async function getAllCategories() {
    const response = await fetchAllCategories();
    setCategoriesList(response);
  }

  const handleSetValue = (val: string) => {
    setValue(Number.parseInt(val));
  };
  return (
    <div className='w-full'>
      <Select onValueChange={handleSetValue}>
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
