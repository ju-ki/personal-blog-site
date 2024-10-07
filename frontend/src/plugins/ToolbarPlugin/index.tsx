import { FC, useEffect, useRef, useState } from 'react';
import { LinkToolbarItem } from '../LinkToolbarPlugin';
import FontSizeItem from '../FontSizePlugin';
import { TextColorItem } from '../TextColorPlugin';
import { BackgroundColorItem } from '../BackgroundColorPlugin';
import { ImageRegister } from '@/components/Posts/Card/Editor/Command/Image/ImageRegister';
import { ImageItem } from '../ImagePlugin';
import { HeadingItems } from '../HeadingPlugin';
import QuoteItem from '../QuotePlugin';
import { debounce } from 'lodash';

export const ToolbarPlugin: FC = () => {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);
  useEffect(() => {
    const handleScroll = debounce(() => {
      const toolbar = toolbarRef.current;
      if (toolbar) {
        const distanceToTop = toolbar.getBoundingClientRect().top;
        const scrollY = window.scrollY;

        setIsFixed(scrollY > distanceToTop);
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div
      ref={toolbarRef}
      className={`toolbar flex items-center transition-all duration-300 ${
        isFixed ? 'fixed top-10 bg-white shadow-md z-10' : ''
      }`}
    >
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
