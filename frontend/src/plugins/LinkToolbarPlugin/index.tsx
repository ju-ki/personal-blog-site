import { validateUrl } from '@/components/Posts/Card/Editor/Util';
import { Button } from '@/components/ui/button';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FC, useState } from 'react';

export const LinkToolbarItem: FC = () => {
  const [url, setUrl] = useState('');
  const [editor] = useLexicalComposerContext();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'}>リンクへ変換</Button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <input type='text' value={url} onChange={(e) => setUrl(e.target.value)} placeholder='Enter a URL' />
        <Button
          onClick={() => {
            if (validateUrl(url)) {
              editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
            } else {
              console.error('invalid url');
            }
            close();
          }}
        >
          リンクに変換
        </Button>
      </PopoverContent>
    </Popover>
  );
};
