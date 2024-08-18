import { ImagePayload } from '@/plugins/nodes/ImageNode';
import { createCommand, LexicalCommand } from 'lexical';

export type InsertImagePayload = Readonly<ImagePayload>;

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> = createCommand('INSERT_IMAGE_COMMAND');
