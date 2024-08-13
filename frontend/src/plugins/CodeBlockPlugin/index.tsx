import { CopyButton } from '@/components/Posts/Card/Editor/CopyButton';
import { $isCodeNode, CodeNode } from '@lexical/code';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNearestNodeFromDOMNode } from 'lexical';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from './util';

interface Position {
  top: string;
  right: string;
}

function CodeActionMenuContainer({ anchorElem }: { anchorElem: HTMLElement }): JSX.Element {
  const [editor] = useLexicalComposerContext();

  const [lang, setLang] = useState('');
  const [isShown, setShown] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({
    right: '0',
    top: '0',
  });

  const codeSetRef = useRef<Set<string>>(new Set());
  const codeDOMNodeRef = useRef<HTMLElement | null>(null);

  function getCodeDOMNode(): HTMLElement | null {
    return codeDOMNodeRef.current;
  }

  const debouncedOnMouseMove = useDebounce(
    (event: MouseEvent) => {
      const { codeDOMNode, isOutside } = getMouseInfo(event);

      if (isOutside) {
        setShown(false);
        return;
      }

      if (!codeDOMNode) {
        return;
      }

      codeDOMNodeRef.current = codeDOMNode;
      let codeNode: CodeNode | null = null;
      let _lang = '';

      editor.update(() => {
        const maybeCodeNode = $getNearestNodeFromDOMNode(codeDOMNode);

        if ($isCodeNode(maybeCodeNode)) {
          codeNode = maybeCodeNode;
          _lang = codeNode.getLanguage() || '';
        }
      });

      if (codeNode) {
        //TODO:ここら辺の位置調整をきちんとやる
        const { y: editorElemY, right: editorElemRight } = anchorElem.getBoundingClientRect();
        const { y, right } = codeDOMNode.children[codeDOMNode.childElementCount - 1].getBoundingClientRect();

        setLang(_lang);
        setShown(true);
        setPosition({
          right: `${right - 400}px`,
          top: `${y + 35}px`,
        });
      }
    },
    50,
    1000
  );

  useEffect(() => {
    document.addEventListener('mousemove', debouncedOnMouseMove);

    return () => {
      debouncedOnMouseMove.cancel();
      document.removeEventListener('mousemove', debouncedOnMouseMove);
    };
  });

  useEffect(() => {
    return editor.registerMutationListener(CodeNode, (mutations) => {
      editor.getEditorState().read(() => {
        for (const [key, type] of mutations) {
          switch (type) {
            case 'created':
              codeSetRef.current.add(key);
              break;
            case 'deleted':
              codeSetRef.current.delete(key);
              break;
            default:
              break;
          }
        }
      });
    });
  }, [editor]);

  return (
    <>
      {isShown && (
        <div className='absolute z-10' style={{ top: position.top, right: position.right }}>
          <div>{position.top}</div>
          <div>{position.right}</div>
          <CopyButton editor={editor} getCodeDOMNode={getCodeDOMNode} />
        </div>
      )}
    </>
  );
}

function getMouseInfo(event: MouseEvent): {
  codeDOMNode: HTMLElement | null;
  isOutside: boolean;
} {
  const target = event.target;

  if (target && target instanceof HTMLElement) {
    const codeDOMNode = target.closest<HTMLElement>('code');
    const isOutside = !(codeDOMNode || target.closest<HTMLElement>('div.code-action-menu-container'));

    return { codeDOMNode, isOutside };
  } else {
    return { codeDOMNode: null, isOutside: true };
  }
}

export default function CodeBlockPlugin({
  anchorElem = document.body,
}: {
  anchorElem?: HTMLElement;
}): JSX.Element | null {
  return (
    <>
      <CodeActionMenuContainer anchorElem={anchorElem} />
    </>
  );
}
