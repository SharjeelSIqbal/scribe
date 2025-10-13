import { Note } from '@shared/types/types';

class NoteService {
  /**
   * @date 10/13/2025, 1:03:08 PM
   * @description Save a note using the IPC renderer exposed in the preload script.
   * @author siqbal
   * @param note {Note}
   * @return {void}
   */
  static async saveNote(note: Note): Promise<void> {
    return window.notes.saveNote(note);
  }
}

const noteService = new NoteService();

export default noteService;
