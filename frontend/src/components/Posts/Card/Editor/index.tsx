import React, { ComponentProps, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ToolbarPlugin } from '@/plugins/ToolbarPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { LinkNode } from '@lexical/link';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { ListItemNode, ListNode } from '@lexical/list';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { EditorTheme } from './Theme';
import CodeBlockPlugin from '@/plugins/CodeBlockPlugin';

const initialConfig: ComponentProps<typeof LexicalComposer>['initialConfig'] = {
  namespace: 'MyEditor',
  theme: EditorTheme,
  nodes: [HeadingNode, LinkNode, ListNode, ListItemNode, CodeNode, CodeHighlightNode],
  onError: (error) => console.error(error),
};

const Editor = () => {
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };
  return (
    <div className='h-full flex flex-col'>
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={
            <div className='editor-scroller'>
              <div className='editor' ref={onRef}>
                <ContentEditable className='w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-40' />
                {floatingAnchorElem && (
                  <>
                    <CodeBlockPlugin anchorElem={floatingAnchorElem} />
                  </>
                )}
              </div>
            </div>
          }
          placeholder={<div className='editor-placeholder text-gray-500 p-4'>Write your markdown...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <LinkPlugin />
        <ListPlugin />
      </LexicalComposer>
    </div>
  );
};

export default Editor;
