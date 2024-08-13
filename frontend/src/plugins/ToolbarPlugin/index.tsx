import { Button } from '@/components/ui/button';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, createCommand } from 'lexical';
import { FC, useCallback, useState } from 'react';
import { mergeRegister } from '@lexical/utils';
import { HeadingTagType, $createHeadingNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_CHECK_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { registerCodeHighlighting, $createCodeNode } from '@lexical/code';

const SupportedBlockType = {
  paragraph: 'Paragraph',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  h6: 'Heading 6',
  code: 'Code Block',
} as const;
type BlockType = keyof typeof SupportedBlockType;

const ListBlockType = {
  bullet: 'Bulleted List',
  number: 'Numbered List',
  check: 'Check List',
  paragraph: 'Normal',
};

type ListBlockType = keyof typeof ListBlockType;

export const CODE_LANGUAGE_COMMAND = createCommand<string>();

export const ToolbarPlugin: FC = () => {
  const [blockType, setBlockType] = useState<BlockType>('paragraph');
  const [listBlockType, setListBlockType] = useState<ListBlockType>('paragraph');
  const [editor] = useLexicalComposerContext();

  const formatHeading = useCallback(
    (type: HeadingTagType) => {
      if (blockType !== type) {
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

  const formatList = useCallback(
    (type: ListBlockType) => {
      if (type === 'number') {
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        setListBlockType('number');
      } else if (type === 'bullet') {
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        setListBlockType('bullet');
      } else if (type === 'check') {
        //checkのスタイルが効いていない
        editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
        setListBlockType('check');
      } else {
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        setListBlockType('paragraph');
      }
    },
    [editor]
  );

  const formatCode = useCallback(
    (type: BlockType) => {
      if (type === 'code') {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createCodeNode());
          }
          return mergeRegister(registerCodeHighlighting(editor));
        });
        return null;
      }
    },
    [editor]
  );

  // function registerCodeLanguageSelecting(editor: LexicalEditor): () => void {
  //   return editor.registerCommand(
  //     CODE_LANGUAGE_COMMAND,
  //     (language, editor) => {
  //       const selection = $getSelection();
  //       if (!$isRangeSelection(selection)) return false;

  //       const anchorNode = selection.anchor.getNode();
  //       const targetNode = $isCodeNode(anchorNode) ? anchorNode : $getNearestNodeOfType(anchorNode, CodeNode);
  //       if (!targetNode) return false;

  //       editor.update(() => {
  //         targetNode.setLanguage(language);
  //       });

  //       return true;
  //     },
  //     COMMAND_PRIORITY_CRITICAL
  //   );
  // }
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
      <Button
        type='button'
        role='checkbox'
        title={ListBlockType['bullet']}
        aria-label={ListBlockType['bullet']}
        aria-checked={listBlockType === 'bullet'}
        onClick={() => formatList('bullet')}
      >
        OL
      </Button>
      <Button
        type='button'
        role='checkbox'
        aria-label={ListBlockType['number']}
        title={ListBlockType['number']}
        aria-checked={listBlockType === 'number'}
        onClick={() => formatList('number')}
      >
        Number
      </Button>
      <Button
        type='button'
        role='checkbox'
        aria-label={ListBlockType['check']}
        title={ListBlockType['check']}
        aria-checked={listBlockType === 'check'}
        onClick={() => formatList('check')}
      >
        Check
      </Button>
      <Button
        type='button'
        role='checkbox'
        aria-label={SupportedBlockType['code']}
        title={SupportedBlockType['code']}
        aria-checked={blockType === 'code'}
        onClick={() => formatCode('code')}
      >
        Code
      </Button>
    </div>
  );
};
