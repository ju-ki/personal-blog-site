import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div className='bg-blue-500'>
      <p className='text-white text-md text-center py-5'>
        日々の業務や学習で学んだことや趣味の旅行についてあげていきます
      </p>
      <Link href={'/'}>
        <h1 className='text-white text-3xl text-center py-6 cursor-pointer'>Jukiyaの雑記ブログ</h1>
      </Link>
    </div>
  );
};

export default Header;
