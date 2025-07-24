import ReactChildrenProp from '../../types/ReactChldrenProps';

function NoteContainer({ children }: ReactChildrenProp): JSX.Element {
  return <div className="py-2.5 px-4">{children}</div>;
}

export default NoteContainer;
