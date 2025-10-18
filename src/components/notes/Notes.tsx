import { useState, ChangeEvent, useEffect } from 'react';
import { USER_ROLE_EDITOR, USER_ROLE_VIEWER } from '@src/libs/constants';
import SaveNotePlugin from '@lexical-custom-plugins/SaveNotePlugin';
import { useUserRole } from '@contexts/UserRoleContext';
import { useNoteContext } from '@contexts/NoteContext';
import NoteContainer from './NoteContainer';
import Editor from '../rich-text-editor/Editor';
import UserRoleDropdown from '../rich-text-editor/UserRoleDropdown';

const PLACEHOLDER_TEXT_TITLE = 'Title';

function Notes(): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const { note, setNote } = useNoteContext();
  const { userRole } = useUserRole();

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    setNote();
  }, []);

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
    </NoteContainer>
  );
}

export default Notes;
