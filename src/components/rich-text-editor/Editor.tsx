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
import { PLACEHOLDER_TEXT, USER_ROLE_EDITOR } from '@src/libs/constants';
import { SAVE_NOTE } from '@shared/constants/ipc-constants';
import OnChangePlugin from '@lexical-custom-plugins/OnChangePlugin';
import EditorEditableToggle from '@lexical-custom-plugins/EditorEditableToggle';
import { SaveShortcutPlugin } from '@lexical-custom-plugins/OnSavePlugin';
import WordCountPlugin from '@lexical-custom-plugins/WordCountPlugin';
import { useUserRole } from '../../contexts/UserRoleContext';
import Toolbar from './Toolbar';

export default function Editor(): JSX.Element {
  const [editor, setEditorState] = useState<EditorState>();
  const editableRef = useRef<HTMLDivElement | null>(null);
  const { userRole } = useUserRole();

  const handleEditorChange = useCallback((editorState: EditorState) => {
    setEditorState(editorState);
  }, []);

  const handleEditorSave = useCallback(() => {
    if (userRole !== USER_ROLE_EDITOR || !editor) return;

    const content = editor.toJSON();
    window.ipcRenderer.invoke(SAVE_NOTE, { notesName: 'Some title', content }).then((res) => {
      console.log('Saved file to:', res.path);
    });
  }, [editor, userRole]);

  return (
    <div>
      <Toolbar />
      <WordCountPlugin />
      <EditorEditableToggle />
      <div className="relative py-1">
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              ref={editableRef}
              className="contentEditable textarea-ghost h-full resize-none w-full focus:outline-none focus:bg-transparent focus-within:bg-transparent relative z-10"
            />
          }
          placeholder={
            <div
              aria-placeholder={PLACEHOLDER_TEXT}
              className="placeholder text-secondary-content absolute top-0 left-0 z-0 py-1"
            >
              {userRole === USER_ROLE_EDITOR ? PLACEHOLDER_TEXT : ''}
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
      <SaveShortcutPlugin onSave={handleEditorSave} />
    </div>
  );
}
