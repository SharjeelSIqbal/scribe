import { useState, ChangeEvent } from 'react';
import NoteContainer from './NoteContainer';

const PLACEHOLDER_TEXT = 'Set a spark to your imagination and start writing.';

function Notes(): JSX.Element {
  const [text, setText] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <NoteContainer>
      <div className="flex w-full flex-col lg:flex-row">
        <div className="card bg-base-300 rounded-box grid h-18 grow place-items-center" />
        <div className="card bg-base-300 rounded-box grid h-full grow place-items-center">
          <textarea
            className="textarea-ghost h-full resize-none"
            placeholder={PLACEHOLDER_TEXT}
            value={text}
            onChange={handleChange}
          />
        </div>
      </div>
    </NoteContainer>
  );
}

export default Notes;
