import { LEXICAL_JSON, NOTES_DIR, USER_DATA, UTF_8 } from '../constants';
import { LIST_NOTES, SAVE_NOTE } from '@shared/constants/ipc-constants';

const { app, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

const baseDir = app.getPath(USER_DATA);
const docsDir = path.join(baseDir, NOTES_DIR);

// Save file
ipcMain.handle(
  SAVE_NOTE,
  async (__: unknown, { notesName, content }: { notesName: string; content: string }) => {
    console.log(__, notesName, content, 'Saving note...');
    const filePath = path.join(docsDir, `${notesName}${LEXICAL_JSON}`);

    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), UTF_8);

    return { success: true, path: filePath };
  }
);

// Read files within notes directory (NO NOTEBOOKS YET)
ipcMain.handle(LIST_NOTES, async () => {
  const result: { [key: string]: string[] } = {};
  if (!fs.existsSync(docsDir)) {
    return result;
  }

  const notes = fs.readdirSync(docsDir).filter((f: string) => f.endsWith(LEXICAL_JSON));
  for (const note of notes) {
    const notePath = path.join(docsDir, note);
    if (fs.statSync(notePath).isFile()) {
      result[note] = fs.readFileSync(notePath, UTF_8);
    }
  }
  return result;
});
