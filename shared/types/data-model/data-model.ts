export interface User {
  id: string; // UUID
  username: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: string;
  updatedAt: string;
}

export interface Notebook {
  id: string; // UUID
  userId: string; // FK → User.id
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string; // UUID
  notebookId: string; // FK → Notebook.id
  title: string;
  content: unknown; // Lexical JSON
  markdown?: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  pinned?: boolean;
  archived?: boolean;
  charCount?: number;
  wordCount?: number;
}

export interface Tag {
  id: string; // UUID
  userId: string; // FK → User.id
  name: string;
  color?: string;
  parentId?: string | null; // FK → Tag.id (for nested tags)
  createdAt: string;
}

export interface NoteTag {
  noteId: string; // FK → Note.id
  notebookId: string; // FK → Notebook.id
  tagId: string; // FK → Tag.id
  createdAt: string;
}

export interface NoteVersion {
  id: string; // UUID
  noteId: string; // FK → Note.id
  content: unknown;
  createdAt: string;
}

export interface NotebookTag {
  id: string; // UUID
  notebookId: string; // FK → Notebook.id
  tagId: string; // FK → Tag.id
  createdAt: string;
}
