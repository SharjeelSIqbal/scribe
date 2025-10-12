import { useState, ChangeEvent } from 'react';
import { USER_ROLE_EDITOR, USER_ROLE_VIEWER } from '@src/libs/constants';
import NoteContainer from './NoteContainer';
import Editor from '../rich-text-editor/Editor';
import UserRoleDropdown from '../rich-text-editor/UserRoleDropdown';
import { useUserRole } from '../../contexts/UserRoleContext';

const PLACEHOLDER_TEXT_TITLE = 'Title';

function Notes(): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const { userRole } = useUserRole();

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleExampleIpcRendererFunctionCall = async () => {
    // Call the example method exposed in preload.ts
    const notesBody = {
      noteTitle: 'Example Note',
      body: { content: 'This is an example note content.' },
    };

    console.log(notesBody);

    const response = await window.notes.saveNote('Example Note', {
      content: 'This is an example note content.',
    });
    console.log('Got this back from main:', response);
    alert(JSON.stringify(response, null, 2));
  };

  return (
    <NoteContainer>
      <button type="button" onClick={handleExampleIpcRendererFunctionCall}>
        Hit me{' '}
      </button>
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
        </div>
      </div>
    </NoteContainer>
  );
}

export default Notes;
