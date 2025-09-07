import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  FORMAT_ELEMENT_COMMAND,
  KEY_ENTER_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_LOW,
  LexicalEditor,
} from 'lexical';
import { LEFT } from '../libs/contants';

function registerToolbarCommands(
  editor: LexicalEditor,
  {
    setAlign,
    setCanUndo,
    setCanRedo,
  }: {
    setAlign: (align: string) => void;
    setCanUndo: (val: boolean) => void;
    setCanRedo: (val: boolean) => void;
  }
) {
  // --- Helper: alignment update logic --- //
  function updateAlignment() {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const top = selection.anchor.getNode().getTopLevelElementOrThrow();
        setAlign(top.getFormatType() || LEFT);
      } else {
        setAlign(LEFT);
      }
    });
  }

  // --- Undo --- //
  const unregisterUndo = editor.registerCommand<boolean>(
    UNDO_COMMAND,
    (payload) => {
      setCanUndo(payload);
      return false;
    },
    COMMAND_PRIORITY_CRITICAL
  );

  // --- Redo --- //
  const unregisterRedo = editor.registerCommand<boolean>(
    REDO_COMMAND,
    (payload) => {
      setCanRedo(payload);
      return false;
    },
    COMMAND_PRIORITY_CRITICAL
  );

  // --- Selection change updates alignment --- //
  const unregisterSelection = editor.registerCommand(
    SELECTION_CHANGE_COMMAND,
    () => {
      updateAlignment();
      return false;
    },
    COMMAND_PRIORITY_LOW
  );

  // --- Reset formatting on empty Enter --- //
  const unregisterEnter = editor.registerCommand(
    KEY_ENTER_COMMAND,
    () => {
      let handled = false;

      editor.update(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;

        const anchorNode = selection.anchor.getNode();
        const top = anchorNode.getTopLevelElementOrThrow();

        if (top.getTextContent() === '') {
          const paragraph = $createParagraphNode();
          top.replace(paragraph);
          paragraph.select();

          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, LEFT);
          setAlign(LEFT);

          handled = true;
        }
      });

      return handled;
    },
    COMMAND_PRIORITY_LOW
  );

  // --- Listen for any editor updates (keep align in sync) --- //
  const unregisterUpdate = editor.registerUpdateListener(() => {
    updateAlignment();
  });

  return () => {
    unregisterUndo();
    unregisterRedo();
    unregisterSelection();
    unregisterEnter();
    unregisterUpdate();
  };
}

export default registerToolbarCommands;
