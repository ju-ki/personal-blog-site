import React, { ComponentProps, useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { useFormContext } from 'react-hook-form';
import { createEditor, EditorState } from 'lexical';
import useAutoResize from '@/hooks/api/posts/useAutoSize';
import { debounce } from 'lodash';
import { showToast } from '@/components/Common/Toast';
import { backupPost } from '@/hooks/api/posts';
import { PostType } from '@/types/article';

interface EditorProps {
  editorState?: string;
  isEditable?: boolean;
  onChange: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ onChange, editorState, isEditable = true }) => {
  const editor = useMemo(() => createEditor(), []);
  const [serializedEditorState, setSerializedEditorState] = useState<string | null>(null);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const { watch, getValues } = useFormContext();
  const content = watch('content');

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      if (serializedEditorState) {
        onChange(serializedEditorState);
        const initialEditorState = editor.parseEditorState(serializedEditorState);
        editor.setEditorState(initialEditorState);
      }
    }
  }, [isFirstRender, serializedEditorState, editor, onChange]);

  useEffect(() => {
    if (content) {
      setSerializedEditorState(content);
    }
  }, [content]);

  const handleChange = useCallback(
    (changedEditorState: EditorState) => {
      setSerializedEditorState(JSON.stringify(changedEditorState.toJSON()));
    },
    [setSerializedEditorState]
  );

  const debouncedBackup = useCallback(
    debounce(async () => {
      const id = getValues('id');
      const title = getValues('title');
      const category_id = getValues('category_id');
      const tags = getValues('tags');

      if (title.length) {
        showToast('info', 'バックアップ中です....');
        const response = await backupPost({
          id: id,
          title: title,
          content: serializedEditorState,
          category_id: category_id,
          tag: tags,
        } as PostType);

        if (response.status < 300) {
          showToast('success', '保存しました!');
        } else {
          showToast('error', 'バックアップに失敗しました');
        }
      }
    }, 10000), // 10秒ごとにバックアップ
    []
  );

  //コンテントが更新されたらバックアップを開始する
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'content') {
        debouncedBackup();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, debouncedBackup, serializedEditorState]);

  const autoResizeRef = useAutoResize();

  const initialConfig: ComponentProps<typeof LexicalComposer>['initialConfig'] = {
    namespace: 'MyEditor',
    theme: EditorTheme,
    nodes: [HeadingNode, LinkNode, AutoLinkNode, ImageNode, QuoteNode],
    onError: (error) => console.error(error),
    editorState: editorState,
    editable: isEditable,
  };

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
            <OnChangePlugin onChange={handleChange} />
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
