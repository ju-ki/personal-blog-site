import { Button } from '@/components/ui/button';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { HeadingTagType, $createHeadingNode } from '@lexical/rich-text';
import { $getSelection, $isRangeSelection } from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import React, { FC, useCallback, useState } from 'react';

const SupportedBlockType = {
  paragraph: 'Paragraph',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  h6: 'Heading 6',
  quote: 'Quote',
} as const;
type BlockType = keyof typeof SupportedBlockType;

export const HeadingItems: FC = () => {
  const [blockType, setBlockType] = useState<BlockType>('paragraph');
  const [editor] = useLexicalComposerContext();
  const formatHeading = useCallback(
    (type: HeadingTagType) => {
      if (blockType !== type) {
        setBlockType(type);
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createHeadingNode(type));
          }
        });
      }
    },
    [blockType, editor]
  );
  return (
    <div className='flex gap-x-1'>
      <Button
        type='button'
        role='checkbox'
        title={SupportedBlockType['h1']}
        aria-label={SupportedBlockType['h1']}
        aria-checked={blockType === 'h1'}
        onClick={() => formatHeading('h1')}
        variant={'outline'}
      >
        H1
      </Button>
      <Button
        type='button'
        role='checkbox'
        title={SupportedBlockType['h2']}
        aria-label={SupportedBlockType['h2']}
        aria-checked={blockType === 'h2'}
        onClick={() => formatHeading('h2')}
        variant={'outline'}
      >
        H2
      </Button>
      <Button
        type='button'
        role='checkbox'
        title={SupportedBlockType['h3']}
        aria-label={SupportedBlockType['h3']}
        aria-checked={blockType === 'h3'}
        onClick={() => formatHeading('h3')}
        variant={'outline'}
      >
        H3
      </Button>
      <Button
        type='button'
        role='checkbox'
        title={SupportedBlockType['h4']}
        aria-label={SupportedBlockType['h4']}
        aria-checked={blockType === 'h4'}
        onClick={() => formatHeading('h4')}
        variant={'outline'}
      >
        H4
      </Button>
      <Button
        type='button'
        role='checkbox'
        title={SupportedBlockType['h5']}
        aria-label={SupportedBlockType['h5']}
        aria-checked={blockType === 'h5'}
        onClick={() => formatHeading('h5')}
        variant={'outline'}
      >
        H5
      </Button>
    </div>
  );
};
