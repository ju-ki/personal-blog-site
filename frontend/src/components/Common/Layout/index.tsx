import React from 'react';
import Header from '@/components/Common/Header';
import Sidebar from '../Sidebar';
import { Card } from '@/components/ui/card';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <div className='flex'>
        <main className='w-3/4 p-2 max-h-96'>
          <Card className=''>{children}</Card>
        </main>
        <aside className='w-1/4 p-2'>
          <Card>
            <Sidebar />
          </Card>
        </aside>
      </div>
    </>
  );
};

export default Layout;
