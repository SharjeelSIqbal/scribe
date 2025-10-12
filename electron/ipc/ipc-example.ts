import { app, ipcMain } from 'electron';

ipcMain.handle('examplechannel', async (event, arg) => {
  console.log('Example channel invoked with arg:', arg);
  console.log('App version:', app.getVersion());
  console.log('App path:', app.getAppPath());
  console.log('Electron version:', process.versions.electron);
  console.log('Event data', event);

  console.log(arg);
  return { success: true, data: 'Response from main process' };
});
