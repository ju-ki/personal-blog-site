import AdminLayout from '@/components/Common/Layout/Admin';
import AdminPostList from '@/components/Posts/Admin/PostList';
import { Card } from '@/components/ui/card';
import React from 'react';

const PostList = () => {
  return (
    <AdminLayout>
      <h1 className='text-3xl font-bold mb-4'>記事一覧</h1>
      <Card className='p-4'>
        <AdminPostList />
      </Card>
    </AdminLayout>
  );
};

export default PostList;
