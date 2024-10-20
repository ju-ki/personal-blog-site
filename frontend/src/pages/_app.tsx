import { getUser } from '@/hooks/api/auth';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  const user = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (pathName && pathName.match('/admin/*')) {
      fetchUser();
    }
  }, [pathName]);

  const fetchUser = async () => {
    try {
      const response = await getUser();
      if (response.status === 401 || response.status === 500) {
        user.push('/login');
        return;
      }
    } catch (err) {
      console.log(err);
      user.push('/login');
    }
  };
  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}
