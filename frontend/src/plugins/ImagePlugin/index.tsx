import { INSERT_IMAGE_COMMAND } from '@/components/Posts/Card/Editor/Command/Image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FC } from 'react';

export const ImageItem: FC = () => {
  const [editor] = useLexicalComposerContext();
  return (
    <Label>
      <span>画像を挿入</span>
      <Input
        type='file'
        onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file) {
              editor.update(() => {
                editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                  altText: file.name,
                  src: URL.createObjectURL(file),
                  width: 150,
                  height: 150,
                });
              });
            } else {
              console.error('file not found');
            }
          }
        }}
      />
    </Label>
  );
};
