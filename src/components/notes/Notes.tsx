import { useState, ChangeEvent } from 'react';
import NoteContainer from './NoteContainer';
import Editor from '../rich-text-editor/Editor';

const PLACEHOLDER_TEXT_TITLE = 'Title';

function Notes(): JSX.Element {
  const [title, setTitle] = useState<string>('');

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <NoteContainer>
      <div className="flex w-full flex-col lg:flex-col">
        <div className="py-1.5 relative h-14">
          <input
            value={title}
            onChange={handleChangeTitle}
            type="text"
            placeholder={PLACEHOLDER_TEXT_TITLE}
            className="absolute title-input input-ghost input-2xl w-full focus:outline-none bg-transparent focus:bg-transparent text-transparent carat-primary placeholder:text-secondary-content"
          />
          <h1 className="note-title">{title}</h1>
        </div>
        <div className="py-1.5">
          <Editor />
        </div>
      </div>
    </NoteContainer>
  );
}

export default Notes;
