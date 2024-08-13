import { $getNearestNodeFromDOMNode, LexicalEditor } from 'lexical';
import { $isCodeNode } from '@lexical/code';
import { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

interface Props {
  editor: LexicalEditor;
  getCodeDOMNode: () => HTMLElement | null;
}

export function CopyButton({ editor, getCodeDOMNode }: Props) {
  const [isCopyCompleted, setCopyCompleted] = useState<boolean>(false);
  async function handleClick(): Promise<void> {
    const codeDOMNode = getCodeDOMNode();

    if (!codeDOMNode) return;

    let content = '';

    editor.update(() => {
      const codeNode = $getNearestNodeFromDOMNode(codeDOMNode);
      if ($isCodeNode(codeNode)) {
        content = codeNode.getTextContent();
      }
    });

    try {
      await navigator.clipboard.writeText(content);
      setCopyCompleted(true);
      setTimeout(() => setCopyCompleted(false), 1000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  }

  return (
    <button type='button' className='menu-item' onClick={handleClick} aria-label='copy'>
      {isCopyCompleted ? (
        <div>
          <CheckIcon />
        </div>
      ) : (
        <div>
          <ContentCopyIcon />
        </div>
      )}
    </button>
  );
}
