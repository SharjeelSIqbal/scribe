import { ipcRenderer, contextBridge } from 'electron';
import { SAVE_NOTE } from '@shared/constants/ipc-constants';
import { NoteType } from '@shared/types/types';

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
  saveNote: async (note: NoteType) => {
    console.log('Saving note from preload with args:', note);
    return ipcRenderer.invoke(SAVE_NOTE, note);
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
