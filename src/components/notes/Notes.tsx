import { useState, ChangeEvent } from 'react';
import NoteContainer from './NoteContainer';
import Editor from '../rich-text-editor/Editor';
import UserRoleDropdown from '../rich-text-editor/UserRoleDropdown';
import { useUserRole } from '../../contexts/UserRoleContext';
import { USER_ROLE_EDITOR } from '../../libs/constants';

const PLACEHOLDER_TEXT_TITLE = 'Title';

function Notes(): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const { userRole } = useUserRole();

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <NoteContainer>
      <div className="flex w-full flex-col lg:flex-col">
        <div className="py-1.5 relative h-14 flex justify-between items-center">
          <div className="w-[90%] relative">
            <input
              value={title}
              onChange={handleChangeTitle}
              type="text"
              placeholder={userRole === USER_ROLE_EDITOR ? PLACEHOLDER_TEXT_TITLE : ''}
              className="title-input title-no-margin absolute input-ghost input-2xl w-full focus:outline-none bg-transparent focus:bg-transparent text-transparent carat-primary placeholder:text-secondary-content mb-0 bottom-0"
              disabled={userRole !== USER_ROLE_EDITOR}
            />
            <h1 className="note-title title-no-margin mb-0">{title}</h1>
          </div>
          <UserRoleDropdown />
        </div>
        <div className="py-1.5 ">
          <Editor />
        </div>
      </div>
    </NoteContainer>
  );
}

export default Notes;
