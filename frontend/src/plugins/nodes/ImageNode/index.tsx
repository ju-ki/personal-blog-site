import ImagePreview from '@/components/Common/Image';
import { $applyNodeReplacement, DecoratorNode, EditorConfig, NodeKey, SerializedLexicalNode, Spread } from 'lexical';

export interface ImagePayload {
  altText: string;
  height: number;
  key?: NodeKey;
  src: string;
  width: number;
}

export type SerializedImageNode = Spread<
  {
    altText: string;
    height?: number;
    src: string;
    width?: number;
    type: string;
    version: 1;
  },
  SerializedLexicalNode
>;

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __altText: string;
  __width: number;
  __height: number;

  constructor(src: string, altText: string, width: number, height: number, key?: NodeKey) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__width = width;
    this.__height = height;
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__altText, node.__width, node.__height, node.__key);
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { src, altText, width = 150, height = 150 } = serializedNode;
    return new ImageNode(src, altText, width, height);
  }

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement('span');
    const theme = config.theme;
    const className = theme.image;

    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }

  //TODO::仮
  updateDOM(_prevNode: unknown, _dom: HTMLElement, _config: EditorConfig): boolean {
    return true;
  }

  exportJSON(): SerializedImageNode {
    return {
      src: this.__src,
      width: this.__width,
      height: this.__height,
      altText: this.__altText,
      type: ImageNode.getType(),
      version: 1,
    };
  }

  static getType(): string {
    return 'my-image-node';
  }

  decorate(): JSX.Element {
    return (
      <ImagePreview
        src={this.__src}
        alt={this.__altText}
        width={this.__width}
        height={this.__height}
        nodeKey={this.__key}
      />
    );
  }
}

export function $createImageNode({ altText, height, src, width, key }: ImagePayload): ImageNode {
  return $applyNodeReplacement(new ImageNode(src, altText, width, height, key));
}
