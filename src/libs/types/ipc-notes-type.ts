import { Note } from '@shared/types/types';

export interface Notes {
  saveNote: (note: Note) => Promise<void>;
}
