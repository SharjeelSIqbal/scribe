import ReactChildrenProp from '@src/libs/types/react-children-types';

function NoteContainer({ children }: ReactChildrenProp): JSX.Element {
  return (
    <div className="py-2.5 px-4 bg-base-300 border-neutral-content text-neutral-content w-full relative">
      {children}
    </div>
  );
}

export default NoteContainer;
