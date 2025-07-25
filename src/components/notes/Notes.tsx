import { useState, ChangeEvent, useRef } from 'react';
import NoteContainer from './NoteContainer';

const PLACEHOLDER_TEXT_NOTES = 'Set a spark to your imagination and start writing.';
const PLACEHOLDER_TEXT_TITLE = 'Title';

function Notes(): JSX.Element {
  const [input, setInput] = useState<string>('');
  const [text, setText] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <NoteContainer>
      <div className="flex w-full flex-col lg:flex-col">
        <div className="py-1.5">
          <input
            value={input}
            onChange={handleChangeInput}
            type="text"
            placeholder={PLACEHOLDER_TEXT_TITLE}
            className="input-ghost input-xl w-full focus:outline-none bg-transparent focus:bg-transparent"
          />
        </div>
        <div className="py-1.5">
          <textarea
            className="textarea-ghost h-full resize-none w-full focus:outline-none focus:bg-transparent"
            placeholder={PLACEHOLDER_TEXT_NOTES}
            value={text}
            onChange={handleChangeText}
            ref={textareaRef}
          />
        </div>
      </div>
    </NoteContainer>
  );
}

export default Notes;
