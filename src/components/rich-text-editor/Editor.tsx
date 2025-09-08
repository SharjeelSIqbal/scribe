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
import Toolbar from './Toolbar';
import theme from '../../libs/editor-theme';
import { PLACEHOLDER_TEXT } from '../../libs/contants';

function MyOnChangePlugin({ onChange, editableRef }: MyOnChangePluginProps) {
  const [editor] = useLexicalComposerContext();
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
    namespace: 'Scribe',
    theme,
    onError,
    nodes: [HeadingNode, ListNode, ListItemNode],
    movable: true,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Toolbar />
      <ListPlugin />
      <div className="relative py-1">
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              ref={editableRef}
              className="contentEditable textarea-ghost h-full resize-none w-full focus:outline-none focus:bg-transparent relative z-10"
            />
          }
          placeholder={
            <div
              aria-placeholder={PLACEHOLDER_TEXT}
              className="placeholder text-secondary-content absolute top-0 left-0 z-0 py-1"
            >
              {PLACEHOLDER_TEXT}
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
      <MyOnChangePlugin onChange={handleEditorChange} editableRef={editableRef} />
      <HistoryPlugin />
    </LexicalComposer>
  );
}
