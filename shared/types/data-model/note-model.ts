import type { SerializedEditorState, SerializedLexicalNode } from 'lexical';

type NoteModel = {
  id: string;
  createdAt: Date;
  updatedAt?: Date | undefined | null;
  title: string;
  body?: SerializedEditorState<SerializedLexicalNode>;
  userId?: string;
  touch: () => void;
};

type NoteModelJson = {
  id: string;
  createdAt: string;
  updatedAt?: string;
  title: string;
  body?: SerializedEditorState<SerializedLexicalNode>;
  userId?: string;
};

export type { NoteModel, NoteModelJson };
