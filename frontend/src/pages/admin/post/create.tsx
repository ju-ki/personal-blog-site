import AdminLayout from '@/components/Common/Layout/Admin';
import { Card } from '@/components/ui/card';
import CreatePost from '@/components/Posts/Admin/PostCreate';
import React from 'react';

const PostCreate = () => {
  return (
    <AdminLayout>
      <div>
        <h1 className='text-3xl font-bold mb-4'>記事作成</h1>
        <Card className='p-4'>
          <p>ここに記事作成フォームを表示します。</p>
          <CreatePost />
        </Card>
      </div>
    </AdminLayout>
  );
};

export default PostCreate;
