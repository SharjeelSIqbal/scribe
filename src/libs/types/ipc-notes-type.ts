import { NoteModel } from '@shared/types/data-model/note-model';
import { TagModel } from '@shared/types/data-model/tag-model';

export interface Notes {
  saveNote: (note: NoteModel) => Promise<void>;
  readNote: (noteId: string) => Promise<NoteModel | null>;
  deleteNote: (noteId: string) => Promise<void>;
  listNotes: () => Promise<NoteModel[]>;
  searchNotes: (query: string) => Promise<NoteModel[]>;
  filterNotes: (filter: TagModel) => Promise<NoteModel[]>;
}
