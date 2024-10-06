import { FC } from 'react';
import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';
import Image from 'next/image';
import { $getNodeByKey, NodeKey } from 'lexical';
import CloseIcon from '@mui/icons-material/Close';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

type Props = {
  alt: string;
  height: number;
  src: string;
  width: number;
  nodeKey: NodeKey;
  isEditable: boolean;
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
      <div className='relative inline-block'>
        <Image alt={alt} src={others.src} width={others.width} height={others.height} className='w-auto h-auto' />
        {others.isEditable && (
          <>
            <CloseIcon
              className='absolute top-2 right-2 bg-gray-700 text-white rounded-full hover:bg-gray-800'
              onClick={handleDelete}
            />
          </>
        )}
      </div>
    </BlockWithAlignableContents>
  );
};

export default ImagePreview;
