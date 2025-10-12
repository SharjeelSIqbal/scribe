import { createCommand, KEY_DOWN_COMMAND } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import debounce from '../utility/debouce';

export const SAVE_DOCUMENT_COMMAND = createCommand<void>();

type SavePluginProps = {
  handleSave: () => Promise<void>;
};

function SaveNotePlugin({ handleSave }: SavePluginProps) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      SAVE_DOCUMENT_COMMAND,
      () => {
        return true;
      },
      0
    );
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      KEY_DOWN_COMMAND,
      (event: KeyboardEvent) => {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
          event.preventDefault();
          debounce(handleSave, 100);
          return true;
        }

        debounce(handleSave, 5000);
        return false;
      },
      0
    );
  }, [editor]);

  return <div id="#save-note-plugin" />;
}

export default SaveNotePlugin;
