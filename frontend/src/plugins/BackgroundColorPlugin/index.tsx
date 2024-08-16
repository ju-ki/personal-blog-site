import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React, { useEffect, useState } from 'react';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import { $getSelection, $isRangeSelection, createCommand, LexicalEditor, TextNode } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

const FONT_BACKGROUND_COLOR_COMMAND = createCommand<string>('FONT_BACKGROUND_COLOR_COMMAND');
export function registerFontColorPlugin(editor: LexicalEditor) {
  return editor.registerCommand(
    FONT_BACKGROUND_COLOR_COMMAND,
    (backgroundColor: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const nodes = selection.getNodes();
          nodes.forEach((node) => {
            if (node instanceof TextNode) {
              node.setStyle(`background-color: ${backgroundColor}`);
            }
          });
        }
      });
      return true;
    },
    0
  );
}

const ColorType = {
  black: 'inherit',
  blue: 'info',
  red: 'error',
  yellow: 'warning',
  green: 'success',
  white: 'secondary',
} as const;

type ColorType = keyof typeof ColorType;
export const BackgroundColorItem = () => {
  const [backgroundColor, setBackgroundColor] = useState<ColorType>('black');
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return registerFontColorPlugin(editor);
  }, [editor]);

  useEffect(() => {
    editor.dispatchCommand(FONT_BACKGROUND_COLOR_COMMAND, backgroundColor);
  }, [backgroundColor]);

  const handleBackgroundColorChange = (selectedColor: ColorType) => {
    setBackgroundColor(selectedColor);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormatColorFillIcon color={ColorType[backgroundColor]} />
      </PopoverTrigger>
      <PopoverContent className='space-y-2'>
        <RadioGroup
          defaultValue='black'
          value={backgroundColor}
          onValueChange={handleBackgroundColorChange}
          className='space-y-2'
        >
          <RadioGroupItem value='black' className='bg-black text-white p-2 rounded'>
            Black
          </RadioGroupItem>
          <RadioGroupItem value='blue' className='bg-blue-500 text-white p-2 rounded'>
            Blue
          </RadioGroupItem>
          <RadioGroupItem value='red' className='bg-red-500 text-white p-2 rounded'>
            Red
          </RadioGroupItem>
          <RadioGroupItem value='green' className='bg-green-500 text-white p-2 rounded'>
            Green
          </RadioGroupItem>
          <RadioGroupItem value='yellow' className='bg-yellow-300 text-black p-2 rounded'>
            Yellow
          </RadioGroupItem>
          <RadioGroupItem value='white' className='bg-gray-300 text-black p-2 rounded'>
            White
          </RadioGroupItem>
        </RadioGroup>
      </PopoverContent>
    </Popover>
  );
};
