import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { useUserRole } from '../contexts/UserRoleContext';
import { USER_ROLE_EDITOR } from '../libs/constants';

function EditorEditableToggle() {
  const [editor] = useLexicalComposerContext();
  const { userRole } = useUserRole();
  useEffect(() => {
    editor.setEditable(userRole === USER_ROLE_EDITOR);
  }, [editor, userRole]);

  return null;
}

export default EditorEditableToggle;
