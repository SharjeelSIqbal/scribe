import { COMMAND_PRIORITY_CRITICAL, KEY_DOWN_COMMAND } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect, useMemo, useState } from 'react';
import noteService from 'src/service-layer/NoteService';
import debounce from '../utility/debouce';

function SaveNotePlugin() {
  const [editor] = useLexicalComposerContext();
  const [timerDelay, setTimerDelay] = useState<100 | 5000>(100);

  // const handleSaveImmediately = useMemo(() => {
  //   return debounce(async () => {
  //     await noteService.saveNote();
  //   }, 100);
  // }, [editor]);

  const saved = () => {
    console.log('saved after ctrl + s');
  };

  useEffect(() => {
    return editor.registerCommand(
      KEY_DOWN_COMMAND,
      (event: KeyboardEvent) => {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
          event.preventDefault();
          console.log('hits');
          setTimerDelay(100);
          return true;
        }
        setTimerDelay(5000);
        const saveDebounce = debounce(saved, timerDelay);
        saveDebounce();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor]);

  return null;
}

export default SaveNotePlugin;
