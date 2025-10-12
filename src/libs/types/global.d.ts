import { Note } from '@shared/types/ipc-types';

export {};

declare global {
  interface Window {
    notes: {
      saveNote: (note: Note) => Promise<void>;
    };
  }
}
