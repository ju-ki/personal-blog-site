import { Button } from '@/components/ui/button';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_NORMAL, createCommand } from 'lexical';
import { FC, useCallback, useEffect, useState } from 'react';
import { HeadingTagType, $createHeadingNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { LinkToolbarItem } from '../LinkToolbarPlugin';
import FontSizeItem from '../FontSizePlugin';
import { TextColorItem } from '../TextColorPlugin';
import { BackgroundColorItem } from '../BackgroundColorPlugin';

const SupportedBlockType = {
  paragraph: 'Paragraph',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  h6: 'Heading 6',
} as const;
type BlockType = keyof typeof SupportedBlockType;

export const ToolbarPlugin: FC = () => {
  const [blockType, setBlockType] = useState<BlockType>('paragraph');
  const [editor] = useLexicalComposerContext();
  const formatHeading = useCallback(
    (type: HeadingTagType) => {
      console.log(type);
      if (blockType !== type) {
        editor.update(() => {
          const selection = $getSelection();
          console.log(selection);
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createHeadingNode(type));
          }
        });
      }
    },
    [blockType, editor]
  );
  return (
    <div>
      <Button
        type='button'
        role='checkbox'
        title={SupportedBlockType['h1']}
        aria-label={SupportedBlockType['h1']}
        aria-checked={blockType === 'h1'}
        onClick={() => formatHeading('h1')}
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
      >
        H5
      </Button>
      <LinkToolbarItem />
      <FontSizeItem />
      <TextColorItem />
      <BackgroundColorItem />
    </div>
  );
};
