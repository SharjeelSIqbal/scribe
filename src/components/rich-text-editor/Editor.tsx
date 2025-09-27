import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { useCallback, useRef, useState } from 'react';
import { EditorState } from 'lexical';
import Toolbar from './Toolbar';
import { PLACEHOLDER_TEXT } from '../../libs/constants';
import editorConfig from '../../libs/editor-config';
import OnChangePlugin from '../../lexical-custom-plugins/OnChangePlugin';
import EditorEditableToggle from '../../lexical-custom-plugins/EditorEditableToggle';

export default function Editor(): JSX.Element {
  const [, setEditorState] = useState<EditorState>();
  const editableRef = useRef<HTMLDivElement | null>(null);

  const handleEditorChange = useCallback((editorState: EditorState) => {
    setEditorState(editorState);
  }, []);

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <Toolbar />
      <EditorEditableToggle />
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
      <OnChangePlugin onChange={handleEditorChange} editableRef={editableRef} />
      <HistoryPlugin />
      <ListPlugin />
      <CheckListPlugin />
      <LinkPlugin />
      <TabIndentationPlugin />
    </LexicalComposer>
  );
}
