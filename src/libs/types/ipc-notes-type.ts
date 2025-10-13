import { NoteType } from '@shared/types/types';

export interface Notes {
  saveNote: (note: NoteType) => Promise<void>;
}
