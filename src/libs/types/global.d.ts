import { NoteType } from '@shared/types/types';

export {};

declare global {
  interface Window {
    notes: {
      saveNote: (note: NoteType) => Promise<void>;
      readNote: (noteId: string) => Promise<NoteType | null>;
      deleteNote: (noteId: string) => Promise<void>;
      listNotes: () => Promise<NoteType[]>;
      searchNotes: (query: string) => Promise<NoteType[]>;
    };
  }
}
