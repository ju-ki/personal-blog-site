import Editor from '@/components/Posts/Card/Editor';
import { act, render, screen } from '@testing-library/react';
import { $createParagraphNode, $createTextNode, $getRoot, LexicalEditor } from 'lexical';

describe('Lexical Editor', () => {
  it('必要なツールが揃っているかのテスト(headタグ)', async () => {
    render(
      <>
        <Editor />
      </>
    );
    const h1Button = screen.getByText('H1');
    const h2Button = screen.getByText('H2');
    const h3Button = screen.getByText('H3');
    const h4Button = screen.getByText('H4');
    const h5Button = screen.getByText('H5');
    expect(h1Button).toBeInTheDocument();
    expect(h2Button).toBeInTheDocument();
    expect(h3Button).toBeInTheDocument();
    expect(h4Button).toBeInTheDocument();
    expect(h5Button).toBeInTheDocument();
    const editorElem = await screen.findByRole('textbox');
    expect(editorElem).toBeInTheDocument();
  });

  it('テキストエディタに値を書き込んで反映されるかのテスト', async () => {
    render(
      <>
        <Editor />
      </>
    );
    const editorElem = await screen.findByRole('textbox');
    expect(editorElem).toBeInTheDocument();
    const editor = (editorElem as unknown as { __lexicalEditor: LexicalEditor }).__lexicalEditor;

    //更新できるかのテスト
    await act(async () => {
      editor.update(() => {
        $getRoot().append($createParagraphNode().append($createTextNode('Hello world')));
      });
    });

    const editorState = editor.getEditorState();
    editorState.read(() => {
      const root = $getRoot();
      const textContent = root.getTextContent().trim();
      expect(textContent).toBe('Hello world');
    });
  });

  // it('H1タグがうまく動いているかのテスト', async () => {
  //   render(
  //     <>
  //       <Editor />
  //     </>
  //   );
  //   const h1Button = screen.getByText('H1');
  //   expect(h1Button).toBeInTheDocument();
  //   const editorElem = await screen.findByRole('textbox');
  //   expect(editorElem).toBeInTheDocument();
  //   const editor = (editorElem as unknown as { __lexicalEditor: LexicalEditor }).__lexicalEditor;

  //   //更新できるかのテスト
  //   await act(async () => {
  //     editor.update(() => {
  //       $getRoot().append($createParagraphNode().append($createTextNode('Hello world')));
  //     });
  //   });

  //   await act(async () => {
  //     editor.update(() => {
  //       const root = $getRoot();
  //       const textNode = root.getAllTextNodes()[0];

  //       if (textNode !== null && $isTextNode(textNode)) {
  //         console.log(textNode.getTextContent());

  //         const selection = $createRangeSelection();
  //         selection.setTextNodeRange(
  //           textNode, // Start node (TextNode)
  //           0, // Start offset
  //           textNode, // End node (TextNode)
  //           textNode.getTextContent().length // End offset
  //         );
  //         $setSelection(selection);
  //         if ($isRangeSelection(selection)) {
  //           console.log(selection);
  //           $setBlocksType(selection, () => $createHeadingNode('h1'));
  //         }
  //       }
  //     });
  //   });

  //   await act(async () => {
  //     const editorState = editor.getEditorState();
  //     editorState.read(() => {
  //       const root = $getRoot();
  //       const headingNode = root.getAllTextNodes()[0]; // Should now be the HeadingNode
  //       console.log(headingNode);

  //       expect($isHeadingNode(headingNode)).toBe(true); // Check if it's a HeadingNode
  //       if ($isHeadingNode(headingNode)) {
  //         expect(headingNode.getTag()).toBe('h1'); // Ensure the tag is 'h1'
  //         expect(headingNode.getTextContent().trim()).toBe('Hello world'); // Verify the content
  //       }
  //     });
  //   });
  // });
});
