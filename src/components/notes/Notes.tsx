import { useState, ChangeEvent, useEffect, useCallback, useMemo } from 'react';
import { USER_ROLE_EDITOR, USER_ROLE_VIEWER } from '@src/libs/constants';
import SaveNotePlugin from '@lexical-custom-plugins/SaveNotePlugin';
import { useUserRole } from '@contexts/UserRoleContext';
import { useNoteContext } from '@contexts/NoteContext';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import Note from '@src/service-layer/classes/Note';
import { $createParagraphNode, $createTextNode, $getRoot } from 'lexical';
import NoteContainer from './NoteContainer';
import Editor from '../rich-text-editor/Editor';
import UserRoleDropdown from '../rich-text-editor/UserRoleDropdown';
// import debounce from '@src/utility/debouce';
// import noteService from '@src/service-layer/NoteService';
// import { NoteModel } from '@shared/types/data-model/note-model';
import NewNoteButton from './NewNoteButton';

const PLACEHOLDER_TEXT_TITLE = 'Title';

function Notes(): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [editor] = useLexicalComposerContext();
  const { note, setNote } = useNoteContext();
  const { userRole } = useUserRole();

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  /**
   * @date 10/18/2025, 1:54:13 PM
   * @description Clears the editor
   * @author siqbal
   * @return {void}
   */

  const clearEditor = useCallback(async () => {
    const root = $getRoot();
    root.clear();
    const paragraph = $createParagraphNode();
    paragraph.append($createTextNode(''));
    root.append(paragraph);
  }, []);

  const handleSaveNote = () => {};

  const createNote = useCallback(async () => {
    console.log('VALLAH CREATED NEW NOTE');
    setTitle('');
    clearEditor();
    const newNote = new Note(title || 'Untitled', editor.getEditorState().toJSON());
    setNote(newNote);
  }, []);

  const handleNoteUpdateDebounce = useMemo(() => {}, [editor]);

  const handleNoteUpdate = useCallback(async () => {
    note?.touch();
  }, [editor]);

  useEffect(() => {
    console.log(editor);
    console.log(note);
    if (!note) {
      createNote();
    }
  }, []);

  const handleNewNote = () => {
    createNote();
  };

  return (
    <NoteContainer>
      <div className="flex w-full flex-col lg:flex-col">
        <div className="py-1.5 relative h-14 flex justify-between items-center">
          <div className="w-[90%] relative min-h-4 h-full flex items-center">
            {userRole === USER_ROLE_EDITOR && (
              <input
                value={title}
                onChange={handleChangeTitle}
                type="text"
                placeholder={userRole === USER_ROLE_EDITOR ? PLACEHOLDER_TEXT_TITLE : ''}
                className="focus-within:bg-transparent title-no-margin input-ghost input-2xl w-full focus:outline-none bg-transparent focus:bg-transparent carat-primary placeholder:text-secondary-content mb-0 "
                disabled={userRole !== USER_ROLE_EDITOR}
              />
            )}
            {userRole === USER_ROLE_VIEWER && (
              <h1 className="note-title title-no-margin mb-0">{title}</h1>
            )}
          </div>
          <UserRoleDropdown />
        </div>
        <div className="py-1.5 ">
          <Editor />
          <SaveNotePlugin />
        </div>
      </div>
      <NewNoteButton handleNewNote={handleNewNote} />
    </NoteContainer>
  );
}

export default Notes;
