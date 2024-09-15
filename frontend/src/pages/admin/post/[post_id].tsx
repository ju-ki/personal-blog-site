import { EditorTheme } from '@/components/Posts/Card/Editor/Theme';
import { fetchDetailPost, PostType } from '@/hooks/api/posts';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import Link from 'next/link';
import React, { ComponentProps, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ImageNode } from '@/plugins/nodes/ImageNode';
import AdminLayout from '@/components/Common/Layout/Admin';

const PostDetail = () => {
  const [postDetail, setPostDetail] = useState<PostType>();
  const [jsonEditorState, setJsonEditorState] = useState<string>('');
  const router = useRouter();
  const { post_id } = router.query;

  useEffect(() => {
    getPostDetail();
  }, [post_id]);

  async function getPostDetail() {
    if (post_id && !Array.isArray(post_id)) {
      const response = await fetchDetailPost(Number.parseInt(post_id));
      setPostDetail(response);
      if (response.content.length) {
        setJsonEditorState(response.content);
      }
    }
  }

  if (!jsonEditorState) {
    return <div>Loading...</div>;
  }

  const initialConfig: ComponentProps<typeof LexicalComposer>['initialConfig'] = {
    namespace: 'MyEditor',
    theme: EditorTheme,
    nodes: [HeadingNode, LinkNode, AutoLinkNode, QuoteNode, ImageNode],
    onError: (error) => console.error(error),
    editorState: jsonEditorState,
    editable: false,
  };

  return (
    <AdminLayout>
      <Link href={'/admin/post/list'}>一覧に戻る</Link>
      {postDetail?.title}
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable className='w-full px-4 py-2 bg-white h-40' />}
          placeholder={<div className='editor-placeholder text-gray-500 p-4'></div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </LexicalComposer>
    </AdminLayout>
  );
};

export default PostDetail;
