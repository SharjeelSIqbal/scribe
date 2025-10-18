import type { SerializedEditorState, SerializedLexicalNode } from 'lexical';

type NoteType = {
  id: string;
  createdAt: Date;
  updatedAt?: Date | undefined | null;
  title: string;
  body: { content: SerializedEditorState<SerializedLexicalNode> };
};

type NoteTypeJson = {
  id: string;
  createdAt: string;
  updatedAt?: string;
  title: string;
  body: { content: SerializedEditorState<SerializedLexicalNode> };
};

export type { NoteType as NoteModel, NoteTypeJson as NoteModelJson };
