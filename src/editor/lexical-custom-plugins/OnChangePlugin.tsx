import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { OnChangePluginProps } from '@src/props/LexicalProps';

/**
 * @date 9/20/2025, 9:54:11 AM
 * @description Custom on change plugin for Lexical editor to adjust height as needed.
 * @author siqbal
 * @param {any} {onChange: (state: EditorState) => void}
 * @param {any} editableRef: React.RefObject<HTMLDivElement>
 * @return {void}
 */
function OnChangePlugin({ onChange, editableRef }: OnChangePluginProps) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);

      const el = editableRef.current;
      if (el) {
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
      }
    });
  }, [editor, onChange, editableRef]);
  return null;
}

export default OnChangePlugin;
