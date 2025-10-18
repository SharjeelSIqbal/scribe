import { NoteModel } from '@shared/types/types';

export interface Notes {
  saveNote: (note: NoteModel) => Promise<void>;
}
