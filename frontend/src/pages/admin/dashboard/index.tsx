import AdminLayout from '@/components/Common/Layout/Admin';
import { Card } from '@/components/ui/card';
import React from 'react';

const Dashboard = () => {
  return (
    <AdminLayout>
      <h1 className='text-3xl font-bold mb-4'>ダッシュボード</h1>
      <Card className='p-4'>
        <p>ここにダッシュボードの概要や統計情報を表示します。</p>
      </Card>
    </AdminLayout>
  );
};

export default Dashboard;
