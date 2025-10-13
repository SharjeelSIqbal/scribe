import { NoteType } from '@shared/types/types';
import Note from '@service-layer/classes/Note';

class NoteService {
  constructor() {
    this.saveNote = this.saveNote.bind(this);
  }

  /**
   * @date 10/13/2025, 1:03:08 PM
   * @description Save a note using the IPC renderer exposed in the preload script.
   * @author siqbal
   * @param note {Note}
   * @return {void}
   */

  async saveNote(note: NoteType): Promise<void> {
    return window.notes.saveNote(note);
  }
}

const noteService = new NoteService();

export default noteService;
