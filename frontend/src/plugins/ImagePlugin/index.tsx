import { INSERT_IMAGE_COMMAND } from '@/components/Posts/Card/Editor/Command/Image';
import { Input } from '@/components/ui/input';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FC, useRef } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import { Button } from '@/components/ui/button';
import axios from 'axios';

export const ImageItem: FC = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editor] = useLexicalComposerContext();
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <>
      <Button type='button' variant={'outline'} onClick={handleButtonClick}>
        <ImageIcon />
      </Button>

      <Input
        type='file'
        ref={fileInputRef}
        className='hidden'
        onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file) {
              try {
                const formData = new FormData();
                formData.append('image', file);
                const response = await axios.post('http://localhost/api/image/upload', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                  withCredentials: true,
                  withXSRFToken: true,
                });
                console.log(response);
                editor.update(() => {
                  editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                    altText: file.name,
                    src: `${baseUrl}${response.data}`,
                    width: 150,
                    height: 150,
                  });
                });
              } catch (err) {
                console.log(err);
              }
            } else {
              console.error('file not found');
            }
          }
        }}
      />
    </>
  );
};
