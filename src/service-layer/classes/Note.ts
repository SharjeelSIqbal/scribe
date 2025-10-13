import type { SerializedEditorState, SerializedLexicalNode } from 'lexical';
import { v4 as uuidv4 } from 'uuid'; // You can use uuid for unique IDs

export class Note {
  id: string;
  createdAt: Date;
  updatedAt?: Date | null = null;
  title: string;
  body: { content: SerializedEditorState<SerializedLexicalNode> };

  constructor(
    title: string,
    body: SerializedEditorState<SerializedLexicalNode>,
    id: string = uuidv4(),
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.title = title;
    this.body = { content: body };
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  updateTitle(newTitle: string) {
    this.title = newTitle;
    this.touch();
  }

  updateBody(newBody: SerializedEditorState<SerializedLexicalNode>) {
    this.body.content = newBody;
    this.touch();
  }

  touch() {
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt?.toISOString(),
      title: this.title,
      body: this.body,
    };
  }

  static fromJSON(data: Note): Note {
    return new Note(
      data.title,
      data.body.content,
      data.id,
      new Date(data.createdAt),
      data.updatedAt ? new Date(data.updatedAt) : undefined
    );
  }
}
