import { NoteModel } from '@shared/types/data-model/note-model';

class NoteService {
  /**
   * @date 10/13/2025, 1:03:08 PM
   * @description Save a note using the IPC renderer exposed in the preload script.
   * @author siqbal
   * @param note {Note}
   * @return {void}
   */

  async saveNote(note: NoteModel): Promise<void> {
    return window.notes.saveNote(note);
  }

  static async readNote(noteId: string): Promise<NoteModel | null> {
    return window.notes.readNote(noteId);
  }

  static async deleteNote(noteId: string): Promise<void> {
    return window.notes.deleteNote(noteId);
  }

  static async listNotes(): Promise<NoteModel[]> {
    return window.notes.listNotes();
  }

  static async searchNotes(query: string): Promise<NoteModel[]> {
    return window.notes.searchNotes(query);
  }
}

const noteService = new NoteService();

export default noteService;
