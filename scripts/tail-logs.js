#!/usr/bin/env node
/**
 * Tail your Electron app logs in real time.
 * Works for both electron-log (default) and a manual app.log in userData.
 */

import fs from 'fs';
import os from 'os';
import path from 'path';

const appName = 'scribe'; // <-- change to your app name
const LOG_FILE_NAME = 'main.log'; // Default log file name for electron-log
const LOGS_DIRECTORY = 'Logs'; // Default logs directory for electron-log
const LIBRARY = 'Library'; // macOS Library directory

let logPath;

switch (process.platform) {
  case 'darwin':
    logPath = path.join(os.homedir(), LIBRARY, LOGS_DIRECTORY, appName, LOG_FILE_NAME);
    break;
  case 'win32':
    logPath = path.join(
      process.env.APPDATA || '',
      appName,
      LOGS_DIRECTORY.toLowerCase(),
      LOG_FILE_NAME
    );
    break;
  default:
    logPath = path.join(
      os.homedir(),
      '.config',
      appName,
      LOGS_DIRECTORY.toLowerCase(),
      LOG_FILE_NAME
    );
}

// Fallback: if you log manually to userData/app.log
const fallbackPath = path.join(
  os.homedir(),
  process.platform === 'darwin'
    ? `Library/Application Support/${appName}/app.log`
    : process.platform === 'win32'
      ? `AppData/Roaming/${appName}/app.log`
      : `.config/${appName}/app.log`
);

if (!fs.existsSync(logPath) && fs.existsSync(fallbackPath)) {
  logPath = fallbackPath;
}

if (!fs.existsSync(logPath)) {
  console.error(`❌ No log file found at:
  ${logPath}
  or
  ${fallbackPath}

Make sure your app is running and writing logs.`);
  process.exit(1);
}

console.log(`📜 Tailing logs: ${logPath}`);
console.log('----------------------------------------');

fs.watchFile(logPath, { interval: 1000 }, () => {
  const data = fs.readFileSync(logPath, 'utf-8');
  const lines = data.trim().split('\n');
  const lastLines = lines.slice(-10); // show last 10 lines on change
  console.clear();
  console.log(`📜 Tailing logs: ${logPath}`);
  console.log('----------------------------------------');
  console.log(lastLines.join('\n'));
});
