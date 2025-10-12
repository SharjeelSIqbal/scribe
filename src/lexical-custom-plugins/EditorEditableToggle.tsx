import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { USER_ROLE_EDITOR } from '@src/libs/constants';
import { useUserRole } from '../contexts/UserRoleContext';

function EditorEditableToggle() {
  const [editor] = useLexicalComposerContext();
  const { userRole } = useUserRole();
  useEffect(() => {
    editor.setEditable(userRole === USER_ROLE_EDITOR);
  }, [editor, userRole]);

  return null;
}

export default EditorEditableToggle;
