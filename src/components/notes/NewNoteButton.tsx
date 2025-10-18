import { Plus } from 'lucide-react';

interface NewNoteButtonProps {
  handleNewNote: () => void;
}

type NewNoteButtonContent = {
  title: string;
  icon: JSX.Element;
};

const NEW_NOTE_DISPLAY: NewNoteButtonContent = {
  title: 'Create new note',
  icon: <Plus className="" />,
};

function NewNoteButton({ handleNewNote }: NewNoteButtonProps): JSX.Element {
  return (
    <button
      type="submit"
      onSubmit={handleNewNote}
      onClick={handleNewNote}
      className="w-2 absolute bottom-2 right-2 btn-circle color-bg-accent-content bg-accent flex justify-center items-center
      "
      title={NEW_NOTE_DISPLAY.title}
    >
      {NEW_NOTE_DISPLAY.icon}
    </button>
  );
}

export default NewNoteButton;
