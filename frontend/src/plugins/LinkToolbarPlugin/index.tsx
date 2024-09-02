import { validateUrl } from '@/components/Posts/Card/Editor/Util';
import { Button } from '@/components/ui/button';
import { TOGGLE_LINK_COMMAND, $isLinkNode, $isAutoLinkNode } from '@lexical/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FC, useState } from 'react';
import LinkIcon from '@mui/icons-material/Link';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Input } from '@/components/ui/input';
import { $getSelection, $isRangeSelection } from 'lexical';

export const LinkToolbarItem: FC = () => {
  const [url, setUrl] = useState('');
  const [editor] = useLexicalComposerContext();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'}>
          <LinkIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80 flex items-center gap-x-4'>
        <Input type='text' value={url} onChange={(e) => setUrl(e.target.value)} placeholder='Enter a URL' />
        <Button
          onClick={() => {
            if (validateUrl(url)) {
              editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
            } else {
              console.error('invalid url');
            }
            close();
          }}
          variant={'outline'}
        >
          <LinkIcon />
        </Button>
        <Button
          onClick={() => {
            editor.update(() => {
              const selection = $getSelection();
              if ($isRangeSelection(selection)) {
                const anchorNode = selection.anchor.getNode();
                const parent = anchorNode.getParent();

                if ($isLinkNode(parent)) {
                  editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
                } else if ($isAutoLinkNode(parent)) {
                  editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
                }
              }
            });
          }}
          variant={'outline'}
        >
          <RestartAltIcon />
        </Button>
      </PopoverContent>
    </Popover>
  );
};
