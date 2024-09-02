import { FC } from 'react';
import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';
import Image from 'next/image';
import { $getNodeByKey, NodeKey } from 'lexical';
import CloseIcon from '@mui/icons-material/Close';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Button } from '@/components/ui/button';

type Props = {
  alt: string;
  height: number;
  src: string;
  width: number;
  nodeKey: NodeKey;
};

const ImagePreview: FC<Props> = ({ nodeKey, alt, ...others }) => {
  const [editor] = useLexicalComposerContext();

  const handleDelete = () => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if (node) {
        node.remove();
      }
    });
  };
  return (
    <BlockWithAlignableContents
      format={''}
      nodeKey={nodeKey}
      className={{
        base: 'relative',
        focus: 'relative outline outline-indigo-300',
      }}
    >
      <Image alt={alt} src={others.src} width={others.width} height={others.height} className='w-full h-auto' />
      <Button
        className='absolute top-2 right-2 bg-gray-700 text-white rounded-full p-1 hover:bg-gray-800'
        onClick={handleDelete}
      >
        <CloseIcon />
      </Button>
    </BlockWithAlignableContents>
  );
};

export default ImagePreview;
