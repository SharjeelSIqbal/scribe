const { app, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

// eslint-disable-next-line
ipcMain.handle('save-note', async (event, content: unknown, filename = 'note.txt') => {
  const savePath = path.join(app.getPath('documents'), filename);
  fs.writeFileSync(savePath, content, 'utf-8');
  return savePath;
});
