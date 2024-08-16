import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, createCommand, LexicalEditor, TextNode } from 'lexical';
import React, { useEffect, useState } from 'react';

const FONT_SIZE_COMMAND = createCommand<string>('FONT_SIZE_COMMAND');

function applyFontSize(editor: LexicalEditor, fontSize: string) {
  editor.update(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const nodes = selection.getNodes();
      nodes.forEach((node) => {
        if (node instanceof TextNode) {
          node.setStyle(`font-size : ${fontSize}`);
        }
      });
    }
  });
}

export function registerFontSizePlugin(editor: LexicalEditor) {
  return editor.registerCommand(
    FONT_SIZE_COMMAND,
    (fontSize: string) => {
      applyFontSize(editor, fontSize);
      return true;
    },
    0
  );
}

const FontSizeItem: React.FC = () => {
  const [fontSize, setFontSize] = useState('12px');
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return registerFontSizePlugin(editor);
  }, [editor]);

  useEffect(() => {
    editor.dispatchCommand(FONT_SIZE_COMMAND, fontSize);
  }, [fontSize]);

  return (
    <>
      <Select value={fontSize} onValueChange={setFontSize}>
        <SelectTrigger>{fontSize}</SelectTrigger>
        <SelectContent>
          <SelectItem value='12px'>12px</SelectItem>
          <SelectItem value='14px'>14px</SelectItem>
          <SelectItem value='16px'>16px</SelectItem>
          <SelectItem value='18px'>18px</SelectItem>
          <SelectItem value='20px'>20px</SelectItem>
          <SelectItem value='24px'>24px</SelectItem>
          <SelectItem value='28px'>28px</SelectItem>
          <SelectItem value='32px'>32px</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default FontSizeItem;
