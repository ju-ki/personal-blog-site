import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const pathName = usePathname();
  return (
    <div className='min-h-screen flex bg-gray-100'>
      <aside
        className={`fixed inset-y-0 left-0 transform ${'-translate-x-full'} md:translate-x-0 md:static md:w-64 bg-stone-200 text-white p-4 transition-transform duration-200 ease-in-out`}
      >
        <h2 className='text-2xl font-bold mb-6 text-black'>管理画面</h2>
        <nav>
          <ul>
            <li>
              <Link href={'/admin/dashboard'}>
                <Button
                  variant='link'
                  className={`block text-left w-full py-2 ${pathName === '/admin/dashboard' ? 'bg-stone-400' : ''}`}
                >
                  ダッシュボード
                </Button>
              </Link>
            </li>
            <li>
              <Link href={'/admin/post/list'}>
                <Button
                  variant='link'
                  className={`block text-left w-full py-2 ${pathName === '/admin/post/list' ? 'bg-stone-400' : ''}`}
                >
                  記事一覧
                </Button>
              </Link>
            </li>
            <li>
              <Link href={'/admin/post/create'}>
                <Button
                  variant='link'
                  className={`block text-left w-full py-2 ${pathName === '/admin/post/create' ? 'bg-stone-400' : ''}`}
                >
                  記事作成
                </Button>
              </Link>
            </li>
            <li>
              <Link href={'/admin/category'}>
                <Button
                  variant='link'
                  className={`block text-left w-full py-2 ${pathName === '/admin/category' ? 'bg-stone-400' : ''}`}
                >
                  カテゴリ一覧
                </Button>
              </Link>
            </li>
            <li>
              <Button
                variant='link'
                className={`block text-left w-full py-2 ${pathName === '/admin/tag/create' ? 'bg-stone-400' : ''}`}
              >
                タグ作成
              </Button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className='flex-1 p-6 ml-64 md:ml-0'>{children}</main>
    </div>
  );
};

export default AdminLayout;
