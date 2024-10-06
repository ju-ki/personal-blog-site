import React, { ComponentProps, useCallback } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ToolbarPlugin } from '@/plugins/ToolbarPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { EditorTheme } from './Theme';
import { validateUrl } from './Util';
import ClickableLinkPlugin from '@/plugins/ClickablePlugin';
import LexicalAutoLinkPlugin from '@/plugins/AutoLinkPlugin';
import { ImageNode } from '@/plugins/nodes/ImageNode';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { UseFormSetValue } from 'react-hook-form';
import type { EditorState } from 'lexical';
import useAutoResize from '@/hooks/api/posts/useAutoSize';

interface EditorProps {
  setValue?: UseFormSetValue<any>;
  name?: string;
  editorState?: string;
  isEditable?: boolean;
}

const Editor: React.FC<EditorProps> = ({ setValue, name, editorState, isEditable = true }) => {
  const initialConfig: ComponentProps<typeof LexicalComposer>['initialConfig'] = {
    namespace: 'MyEditor',
    theme: EditorTheme,
    nodes: [HeadingNode, LinkNode, AutoLinkNode, ImageNode, QuoteNode],
    onError: (error) => console.error(error),
    editorState: editorState && editorState,
    editable: isEditable,
  };

  const onChange = useCallback(
    (editorState: EditorState) => {
      if (setValue && name) {
        setValue(name, JSON.stringify(editorState.toJSON()));
      }
    },
    [name, setValue]
  );

  const autoResizeRef = useAutoResize();

  return (
    <div className='h-full flex flex-col'>
      <LexicalComposer initialConfig={initialConfig}>
        {isEditable && (
          <>
            <ToolbarPlugin />
            <HistoryPlugin />
            <LinkPlugin validateUrl={validateUrl} />
            <ClickableLinkPlugin />
            <LexicalAutoLinkPlugin />
            <OnChangePlugin onChange={onChange} />
          </>
        )}
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

export default Editor;
