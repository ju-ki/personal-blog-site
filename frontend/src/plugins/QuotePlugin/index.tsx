import { Button } from '@/components/ui/button';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createParagraphNode, $getSelection, $isRangeSelection } from 'lexical';
import React, { useCallback, useState } from 'react';
import { $createQuoteNode, $isQuoteNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

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

const QuoteItem = () => {
  const [blockType, setBlockType] = useState<BlockType>('paragraph');
  const [editor] = useLexicalComposerContext();

  const formatQuote = useCallback(
    (type: BlockType) => {
      if (type === 'quote') {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const currentBlockParent = selection.anchor.getNode().getParent();
            if ($isQuoteNode(currentBlockParent)) {
              $setBlocksType(selection, () => $createParagraphNode());
            } else {
              $setBlocksType(selection, () => $createQuoteNode());
            }
          }
        });
        setBlockType('quote');
      }
    },
    [editor]
  );
  return (
    <div>
      <Button
        type='button'
        role='checkbox'
        title={SupportedBlockType['quote']}
        aria-label={SupportedBlockType['quote']}
        aria-checked={blockType === 'quote'}
        onClick={() => formatQuote('quote')}
        variant={'outline'}
      >
        <FormatQuoteIcon />
      </Button>
    </div>
  );
};

export default QuoteItem;
