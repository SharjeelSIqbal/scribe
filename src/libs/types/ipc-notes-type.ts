import { Note } from '@shared/types/ipc-types';

export interface Notes {
  saveNote: (note: Note) => Promise<void>;
}
