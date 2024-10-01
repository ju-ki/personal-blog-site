// useAutoResize.ts
import { useEffect, useRef } from 'react';

const useAutoResize = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleInput = () => {
      if (ref.current) {
        ref.current.style.height = 'auto';
        ref.current.style.height = `${ref.current.scrollHeight}px`;
      }
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('input', handleInput);
    }

    return () => {
      if (element) {
        element.removeEventListener('input', handleInput);
      }
    };
  }, []);

  return ref;
};

export default useAutoResize;
