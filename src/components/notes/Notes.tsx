import { useState, ChangeEvent, useRef, useEffect } from 'react';
import NoteContainer from './NoteContainer';
// import { ipcRenderer } from 'electron';
// import { DEBOUNCE_DELAY } from '../../libs/contants';

const PLACEHOLDER_TEXT_NOTES = 'Start jotting down your ideas.';
const PLACEHOLDER_TEXT_TITLE = 'Title';

function Notes(): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  useEffect(() => {}, [text, title]);

  return (
    <NoteContainer>
      <div className="flex w-full flex-col lg:flex-col">
        <div className="py-1.5">
          <input
            value={title}
            onChange={handleChangeTitle}
            type="text"
            placeholder={PLACEHOLDER_TEXT_TITLE}
            className="input-ghost input-2xl w-full focus:outline-none bg-transparent focus:bg-transparent"
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
