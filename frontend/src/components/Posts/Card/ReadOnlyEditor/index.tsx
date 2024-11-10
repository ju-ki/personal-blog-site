import React, { ComponentProps } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import { ImageNode } from '@/plugins/nodes/ImageNode';
import useAutoResize from '@/hooks/api/posts/useAutoSize';
import { EditorTheme } from '../Editor/Theme';

interface EditorProps {
  editorState?: string;
}

const ReadOnlyEditor: React.FC<EditorProps> = ({ editorState }) => {
  const autoResizeRef = useAutoResize();

  const initialConfig: ComponentProps<typeof LexicalComposer>['initialConfig'] = {
    namespace: 'MyEditor',
    theme: EditorTheme,
    nodes: [HeadingNode, LinkNode, AutoLinkNode, ImageNode, QuoteNode],
    onError: (error) => console.error(error),
    editorState: editorState,
    editable: false,
  };

  return (
    <div className='h-full flex flex-col'>
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              ref={autoResizeRef}
              className='w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-40 flex-1'
              style={{ resize: 'none', overflow: 'auto' }}
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
      </LexicalComposer>
    </div>
  );
};

export default ReadOnlyEditor;
