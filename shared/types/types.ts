import type { SerializedEditorState, SerializedLexicalNode } from 'lexical';

type Note = {
  id: string;
  dateCreated: string;
  dateUpdated?: string;
  title: string;
  body: { content: SerializedEditorState<SerializedLexicalNode> };
};

export type { Note };
