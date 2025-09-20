import { EditorState } from 'lexical';

export interface OnChangePluginProps {
  onChange: (state: EditorState) => void;
  editableRef: React.RefObject<HTMLDivElement>;
}
