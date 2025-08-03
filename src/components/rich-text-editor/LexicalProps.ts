import { EditorState } from 'lexical';

export interface MyOnChangePluginProps {
  onChange: (state: EditorState) => void;
  editableRef: React.RefObject<HTMLDivElement>;
}
