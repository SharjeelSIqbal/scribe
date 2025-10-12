import { Note } from '@shared/types/types';

export {};

declare global {
  interface Window {
    notes: {
      saveNote: (note: Note) => Promise<void>;
    };
  }
}
