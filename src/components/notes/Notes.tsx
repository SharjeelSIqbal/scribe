import { useState, ChangeEvent } from 'react';

const PLACEHOLDER_TEXT = 'Set a spark to your imagination and start writing.';

function Notes(): JSX.Element {
  const [text, setText] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <textarea
      className="textarea-ghost h-full resize-none"
      placeholder={PLACEHOLDER_TEXT}
      value={text}
      onChange={handleChange}
    />
  );
}

export default Notes;
