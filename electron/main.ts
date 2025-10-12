import { app, BrowserWindow } from 'electron';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { screen } from 'electron';
import fs from 'node:fs';
import { NOTES_DIR, USER_DATA } from './constants';
import electronLog from 'electron-log';
import dotenv from 'dotenv';
import './ipc/ipc-example';

dotenv.config();

createRequire(import.meta.url);
const __dirnam = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirnam, '..');

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

export const baseDir = app.getPath(USER_DATA);
export const docsDir = path.join(baseDir, NOTES_DIR);

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  const primaryWindowScreenSize = screen.getPrimaryDisplay().workAreaSize;
  const { width, height } = primaryWindowScreenSize;
  const minWidth = Math.round(width * 0.6);
  const minHeight = Math.round(height * 0.8);
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    width: minWidth,
    height: minHeight,
    minWidth,
    minHeight,
    webPreferences: {
      preload: path.join(__dirnam, 'preload.mjs'),
    },
    titleBarStyle: 'hidden',
  });

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app
  .whenReady()
  .then(() => {
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
      electronLog.info('Created notes directory at:', docsDir);
      console.log('Log file testing:', electronLog.transports.file.getFile().path);
    } else {
      electronLog.debug('Directory already exists or is ignored testing:', docsDir);
    }
  })
  .then(createWindow);
