import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { fetchAllTags } from '@/hooks/api/tags';
import { cn } from '@/lib/utils';
import { TagType } from '@/types/tag';
import { Check, ChevronsUpDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface TagListProps {
  selectedTagIds: number[]; // 選択されたタグのIDのリスト
  setValue: (selectedTagIds: number[]) => void; // タグのIDをセットする関数
}

const TagList: React.FC<TagListProps> = ({ selectedTagIds, setValue }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [tagList, setTagList] = useState<TagType[]>([]);

  useEffect(() => {
    getAllTags();
  }, []);

  async function getAllTags() {
    const response = await fetchAllTags();
    setTagList(response);
  }

  const handleSetValue = (val: number) => {
    let updatedTagIds: number[] = [...selectedTagIds]; // 現在の選択されたタグIDをコピー

    if (selectedTagIds.includes(val)) {
      updatedTagIds = updatedTagIds.filter((id) => id !== val);
    } else {
      updatedTagIds.push(val);
    }

    setValue(updatedTagIds);
  };

  return (
    <div className='w-full'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='outline' role='combobox' aria-expanded={open} className='w-[480px] justify-between'>
            <div className='flex gap-2 justify-start'>
              {selectedTagIds.length
                ? selectedTagIds.map((id) => (
                    <div key={id} className='px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium'>
                      {tagList.find((tag) => tag.id === id)?.name}
                    </div>
                  ))
                : 'タグを選択してください'}
            </div>
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput placeholder='タグを選択してください' />
            <CommandEmpty>No Tag found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                <CommandList>
                  {tagList.map((tag) => (
                    <CommandItem
                      key={tag.id}
                      value={tag.name}
                      onSelect={() => {
                        handleSetValue(tag.id);
                      }}
                    >
                      <Check
                        className={cn('mr-2 h-4 w-4', selectedTagIds.includes(tag.id) ? 'opacity-100' : 'opacity-0')}
                      />
                      {tag.name}
                    </CommandItem>
                  ))}
                </CommandList>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TagList;
