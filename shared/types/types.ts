import type { SerializedEditorState, SerializedLexicalNode } from 'lexical';

type Note = {
  id: string;
  createdAt: Date;
  updatedAt?: Date | undefined | null;
  title: string;
  body: { content: SerializedEditorState<SerializedLexicalNode> };
};

export type { Note };
