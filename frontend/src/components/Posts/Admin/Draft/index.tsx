import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { fetchAllDraft } from '@/hooks/api/posts';
import { PostType } from '@/types/article';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const DraftList: React.FC = () => {
  const { setValue } = useFormContext();
  const [draftList, setDraftList] = useState<PostType[]>([]);
  useEffect(() => {
    fetchAllDrafts();
  }, []);
  const fetchAllDrafts = async () => {
    const response = await fetchAllDraft();
    setDraftList(response);
  };

  const handleSetDraft = (val: string) => {
    const filteredDraft = draftList.find((draft) => draft.id === Number.parseInt(val));
    if (filteredDraft) {
      setValue('id', filteredDraft.id);
      setValue('title', filteredDraft.title);
      setValue('content', filteredDraft.content);
      setValue('tags', filteredDraft.tag || []);
      setValue('category_id', filteredDraft.category_id);
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>下書き</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>下書き一覧</DropdownMenuLabel>
          <DropdownMenuRadioGroup onValueChange={handleSetDraft}>
            {draftList.length &&
              draftList.map((draft) => (
                <DropdownMenuRadioItem key={draft.id} value={draft.id ? draft.id.toString() : ''}>
                  {draft.title}
                </DropdownMenuRadioItem>
              ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DraftList;
