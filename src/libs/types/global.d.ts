import { NoteType } from '@shared/types/types';

export {};

declare global {
  interface Window {
    notes: {
      saveNote: (note: NoteType) => Promise<void>;
    };
  }
}
