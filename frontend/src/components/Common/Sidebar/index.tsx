import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
  return (
    <div>
      <div className='font-bold'>プロファイル</div>
      <Image className='p-2 rounded-md' src={'/profile.jpg'} alt='profile' width={200} height={200} />
      <Link href={'https://github.com/ju-ki'} target='blank'>
        <Image className='p-3 rounded-md' src={'/github-mark.png'} alt='github' width={75} height={75} />
      </Link>
      <div className='px-2'>
        現役Slerエンジニア。
        <br />
        業務では主にPHPとLaravelを使用した開発に携わっています。
        <br />
        このブログでは日々学んだことに関して自分なりにまとめて発信しています。
        <br />
      </div>
    </div>
  );
};

export default Sidebar;
