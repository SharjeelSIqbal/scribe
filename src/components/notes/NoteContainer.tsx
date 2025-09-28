import ReactChildrenProp from '../../types/ReactChldrenProps';

function NoteContainer({ children }: ReactChildrenProp): JSX.Element {
  return (
    <div className="py-2.5 px-4 bg-base-300 border-neutral-content text-neutral-content w-full">
      {children}
    </div>
  );
}

export default NoteContainer;
