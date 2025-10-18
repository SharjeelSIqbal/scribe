import type { SerializedEditorState, SerializedLexicalNode } from 'lexical';

type NoteModel = {
  id: string;
  createdAt: Date;
  updatedAt?: Date | undefined | null;
  title: string;
  body: { content: SerializedEditorState<SerializedLexicalNode> };
};

type NoteModelJson = {
  id: string;
  createdAt: string;
  updatedAt?: string;
  title: string;
  body: { content: SerializedEditorState<SerializedLexicalNode> };
};

export type { NoteModel, NoteModelJson };
