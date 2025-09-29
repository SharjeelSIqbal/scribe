import { createCommand, LexicalCommand } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';

export const SAVE_DOCUMENT_COMMAND = createCommand<void>();

export function SaveShortcutPlugin({ onSave }: { onSave: () => void }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    console.log('saving');

    return editor.registerCommand(
      SAVE_DOCUMENT_COMMAND,
      () => {
        onSave();
        return true;
      },
      0
    );
  }, [editor, onSave]);

  useEffect(() => {
    // Register the actual key binding
    return editor.registerCommand(
      'KEY_DOWN_COMMAND' as LexicalCommand<KeyboardEvent>,
      (event: KeyboardEvent) => {
        console.log('saving document...');
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
          event.preventDefault();
          editor.dispatchCommand(SAVE_DOCUMENT_COMMAND, undefined);
          return true;
        }
        return false;
      },
      0
    );
  }, [editor]);

  return null;
}
