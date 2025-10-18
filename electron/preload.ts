import { ipcRenderer, contextBridge } from 'electron';
import { SAVE_NOTE } from '@shared/constants/ipc-constants';
import { NoteModel } from '@shared/types/data-model/note-model';

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args));
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },
  saveNote(notesName: string, content: string) {
    return ipcRenderer.invoke(SAVE_NOTE, { notesName, content });
  },
});

contextBridge.exposeInMainWorld('notes', {
  saveNote: async (note: NoteModel) => {
    console.log('Saving note from preload with args:', note);
    return ipcRenderer.invoke(SAVE_NOTE, note);
  },
  readNote: async (noteId: string) => {
    console.log('Reading note from preload with args:', noteId);
    return ipcRenderer.invoke('read-note', noteId);
  },
  deleteNote: async (noteId: string) => {
    console.log('Deleting note from preload with args:', noteId);
    return ipcRenderer.invoke('delete-note', noteId);
  },
  listNotes: async () => {
    console.log('Listing notes from preload');
    return ipcRenderer.invoke('list-notes');
  },
  searchNotes: async (query: string) => {
    console.log('Searching notes from preload with query:', query);
    return ipcRenderer.invoke('search-notes', query);
  },
});

contextBridge.exposeInMainWorld('example', {
  exampleMethod: async () => {
    console.log('Invoking examplechannel with:', 'Hello from preload');
    const response = await ipcRenderer.invoke('examplechannel', 'Hello from preload');
    console.log('Response from main:', response);
    return response;
  },
});
