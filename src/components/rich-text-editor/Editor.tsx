import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { ListNode, ListItemNode } from '@lexical/list';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { EditorState } from 'lexical';
import { MyOnChangePluginProps } from './LexicalProps';

const theme = {};
const PLACEHOLDER_TEXT = 'Start writing...';

// OnChangePlugin!
function MyOnChangePlugin({ onChange, editableRef }: MyOnChangePluginProps) {
  // Access the editor through the LexicalComposerContext
  const [editor] = useLexicalComposerContext();
  // Wrap our listener in useEffect to handle the teardown and avoid stale references.
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);

      const el = editableRef.current;
      if (el) {
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
      }
    });
  }, [editor, onChange, editableRef]);
  // useEffect(() => {
  //   // most listeners return a teardown function that can be called to clean them up.
  //   return editor.registerUpdateListener(({ editorState }) => {
  //     // call onChange here to pass the latest state up to the parent.
  //     onChange(editorState);
  //   });
  // }, [editor, onChange]);
  return null;
}

function onError(error: Error): void {
  // eslint-disable-next-line
  console.error(error);
}

export default function Editor(): JSX.Element {
  const [, setEditorState] = useState<EditorState>();
  const editableRef = useRef<HTMLDivElement | null>(null);

  const handleEditorChange = useCallback((editorState: EditorState) => {
    setEditorState(editorState);
  }, []);

  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    nodes: [HeadingNode, ListNode, ListItemNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ListPlugin />
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            ref={editableRef}
            className="contentEditable textarea-ghost h-full resize-none w-full focus:outline-none focus:bg-transparent"
          />
        }
        placeholder={
          <div aria-placeholder={PLACEHOLDER_TEXT} className="placeholder">
            ${PLACEHOLDER_TEXT}
          </div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <MyOnChangePlugin onChange={handleEditorChange} editableRef={editableRef} />
    </LexicalComposer>
  );
}
