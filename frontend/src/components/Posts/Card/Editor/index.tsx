import React, { ComponentProps } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ToolbarPlugin } from '@/plugins/ToolbarPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { EditorTheme } from './Theme';
import { validateUrl } from './Util';
import ClickableLinkPlugin from '@/plugins/ClickablePlugin';
import LexicalAutoLinkPlugin from '@/plugins/AutoLinkPlugin';
import { ImageNode } from '@/plugins/nodes/ImageNode';

const initialConfig: ComponentProps<typeof LexicalComposer>['initialConfig'] = {
  namespace: 'MyEditor',
  theme: EditorTheme,
  nodes: [HeadingNode, LinkNode, AutoLinkNode, ImageNode],
  onError: (error) => console.error(error),
};

const Editor = () => {
  return (
    <div className='h-full flex flex-col'>
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className='w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-40' />
          }
          placeholder={<div className='editor-placeholder text-gray-500 p-4'>Write your markdown...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <LinkPlugin validateUrl={validateUrl} />
        <ClickableLinkPlugin />
        <LexicalAutoLinkPlugin />
      </LexicalComposer>
    </div>
  );
};

export default Editor;
