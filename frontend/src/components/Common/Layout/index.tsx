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
      <div className='flex flex-col md:flex-row'>
        <main className='w-full md:w-3/4 p-2'>
          <Card className=''>{children}</Card>
        </main>
        <aside className='w-full md:w-1/4 p-2'>
          <Card>
            <Sidebar />
          </Card>
        </aside>
      </div>
    </>
  );
};

export default Layout;
