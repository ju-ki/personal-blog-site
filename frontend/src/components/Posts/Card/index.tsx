import { Article } from '@/types/article';
import Image from 'next/image';
import React from 'react';

type Props = {
  article: Article;
};

const PostCard: React.FC<Props> = ({ article }) => {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg my-4'>
      <Image className='w-full h-48 object-cover' src={''} alt={article.title} />
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{article.title}</div>
        <div className='pt-4 pb-2 flex items-center'>
          {article.tags &&
            article.tags.map((tag, index) => (
              <div key={index} className='mr-1 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700'>
                {tag}
              </div>
            ))}
        </div>
        <div className='flex justify-between'>
          <div className='text-gray-600 text-xs mb-2'>読了時間: 約半分程度</div>
          <div className='text-gray-600 text-xs mb-2'>作成日: 2024/5/24</div>
        </div>
        <div className='text-gray-700 text-base mb-2'>{article.content.slice(0, 500)}</div>
      </div>
    </div>
  );
};

export default PostCard;
