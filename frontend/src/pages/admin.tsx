import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import React, { useState } from 'react';

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className='min-h-screen flex bg-gray-100'>
      {/* サイドバー */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${'-translate-x-full'} md:translate-x-0 md:static md:w-64 bg-stone-200 text-white p-4 transition-transform duration-200 ease-in-out`}
      >
        <h2 className='text-2xl font-bold mb-6 text-black'>管理画面</h2>
        <nav>
          <ul>
            <li>
              <Button
                variant='link'
                className={`block text-left w-full py-2 ${selectedTab === 'dashboard' ? 'bg-stone-400' : ''}`}
                onClick={() => handleTabClick('dashboard')}
              >
                ダッシュボード
              </Button>
            </li>
            <li>
              <Button
                variant='link'
                className={`block text-left w-full py-2 ${selectedTab === 'articleList' ? 'bg-stone-400' : ''}`}
                onClick={() => handleTabClick('articleList')}
              >
                記事一覧
              </Button>
            </li>
            <li>
              <Button
                variant='link'
                className={`block text-left w-full py-2 ${selectedTab === 'articleCreate' ? 'bg-stone-400' : ''}`}
                onClick={() => handleTabClick('articleCreate')}
              >
                記事作成
              </Button>
            </li>
            <li>
              <Button
                variant='link'
                className={`block text-left w-full py-2 ${selectedTab === 'categoryCreate' ? 'bg-stone-400' : ''}`}
                onClick={() => handleTabClick('categoryCreate')}
              >
                カテゴリ作成
              </Button>
            </li>
            <li>
              <Button
                variant='link'
                className={`block text-left w-full py-2 ${selectedTab === 'tagCreate' ? 'bg-stone-400' : ''}`}
                onClick={() => handleTabClick('tagCreate')}
              >
                タグ作成
              </Button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* メインコンテンツ */}
      <main className='flex-1 p-6 ml-64 md:ml-0'>
        {selectedTab === 'dashboard' && (
          <div>
            <h1 className='text-3xl font-bold mb-4'>ダッシュボード</h1>
            <Card className='p-4'>
              <p>ここにダッシュボードの概要や統計情報を表示します。</p>
            </Card>
          </div>
        )}
        {selectedTab === 'articleList' && (
          <div>
            <h1 className='text-3xl font-bold mb-4'>記事一覧</h1>
            <Card className='p-4'>
              <p>ここに記事一覧を表示します。</p>
            </Card>
          </div>
        )}
        {selectedTab === 'articleCreate' && (
          <div>
            <h1 className='text-3xl font-bold mb-4'>記事作成</h1>
            <Card className='p-4'>
              <p>ここに記事作成フォームを表示します。</p>
            </Card>
          </div>
        )}
        {selectedTab === 'categoryCreate' && (
          <div>
            <h1 className='text-3xl font-bold mb-4'>カテゴリ作成</h1>
            <Card className='p-4'>
              <p>ここにカテゴリ作成フォームを表示します。</p>
            </Card>
          </div>
        )}
        {selectedTab === 'tagCreate' && (
          <div>
            <h1 className='text-3xl font-bold mb-4'>タグ作成</h1>
            <Card className='p-4'>
              <p>ここにタグ作成フォームを表示します。</p>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
