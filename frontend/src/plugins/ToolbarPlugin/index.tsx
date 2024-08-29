import { FC } from 'react';
import { LinkToolbarItem } from '../LinkToolbarPlugin';
import FontSizeItem from '../FontSizePlugin';
import { TextColorItem } from '../TextColorPlugin';
import { BackgroundColorItem } from '../BackgroundColorPlugin';
import { ImageRegister } from '@/components/Posts/Card/Editor/Command/Image/ImageRegister';
import { ImageItem } from '../ImagePlugin';
import { HeadingItems } from '../HeadingPlugin';
import QuoteItem from '../QuotePlugin';

export const ToolbarPlugin: FC = () => {
  return (
    <div className='flex items-center'>
      <HeadingItems />
      <QuoteItem />
      <LinkToolbarItem />
      <FontSizeItem />
      <TextColorItem />
      <BackgroundColorItem />
      <ImageItem />
      <ImageRegister />
    </div>
  );
};
