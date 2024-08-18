import { FC } from 'react';
import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';
import Image from 'next/image';
import { NodeKey } from 'lexical';

type Props = {
  alt: string;
  height: number;
  src: string;
  width: number;
  nodeKey: NodeKey;
};

const ImagePreview: FC<Props> = ({ nodeKey, alt, ...others }) => {
  return (
    <BlockWithAlignableContents
      format={''}
      nodeKey={nodeKey}
      className={{
        base: 'relative',
        focus: 'relative outline outline-indigo-300',
      }}
    >
      <Image alt={alt} src={others.src} width={others.width} height={others.height} />
    </BlockWithAlignableContents>
  );
};

export default ImagePreview;
