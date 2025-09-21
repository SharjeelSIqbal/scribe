import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_CHECK_LIST_COMMAND,
} from '@lexical/list';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect, useRef, useState } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  List,
  ListOrdered,
  LinkIcon,
  Link2Off,
  Undo,
  Redo,
  ListTodo,
  AlignLeft,
} from 'lucide-react';
import { $createHeadingNode } from '@lexical/rich-text';
import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  ElementFormatType,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  REDO_COMMAND,
  TextNode,
  UNDO_COMMAND,
} from 'lexical';
import {
  HEADING_OPTIONS,
  ALIGN_OPTIONS,
  HEADING_OPTIONS_LABEL,
  BOLD_LABEL,
  ITALIC_LABEL,
  UNDERLINE_LABEL,
  STRIKETHROUGH_LABEL,
  BULLET_LIST,
  NUMBERED_LIST,
  CHECKLIST,
  INSERT_LINK,
  REMOVE_LINK,
  UNDO_LABEL,
  REDO_LABEL,
  ALIGNMENT_OPTIONS_LABEL,
  LEFT,
  HEADING_TAGS,
  BOLD_VALUE,
  ITALIC_VALUE,
  UNDERLINE_VALUE,
  STRIKETHROUGH_VALUE,
} from '../../libs/constants';
import registerToolbarCommands from '../../editor/registerCommands';
import ToolbarDropdown from '../layout/ToolbarDropdown';

/**
 * @date 9/20/2025, 9:18:12 AM
 * @description Sets the heading level of the selected text.
 * @author siqbal
 * @param {string} editor:LexicalEditor
 * @param {string} level:0|1|2|3|4|5|6
 * @return {void}
 */
function setHeadingLevel(editor: LexicalEditor, level: 0 | 1 | 2 | 3 | 4 | 5 | 6): void {
  editor.update(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return;

    const nodes = selection.getNodes();

    nodes.forEach((node) => {
      const parent = node.getParent();
      if (!parent) return;

      const isTopLevel = parent.getParent()?.getKey() === $getRoot().getKey();
      if (!isTopLevel) return;

      const newBlock =
        level === 0 ? $createParagraphNode() : $createHeadingNode(HEADING_TAGS[level]);

      parent.replace(newBlock);

      if ($isTextNode(node)) {
        newBlock.append(TextNode.clone(node));
      } else {
        newBlock.append(node);
      }
    });
  });
}

export default function EditorToolbar() {
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [align, setAlign] = useState<ElementFormatType | string>(LEFT);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const linkInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (showLinkInput && linkInputRef.current) {
      linkInputRef.current.focus();
    }
  }, [showLinkInput]);

  useEffect(() => {
    const toolbarCommands = registerToolbarCommands(editor, { setAlign, setCanUndo, setCanRedo });

    return toolbarCommands;
  }, [editor]);

  /**
   * @date 9/20/2025, 9:17:57 AM
   * @description Handles showing the link input field in the link insert toolbar command.
   * @author siqbal
   * @return {void}
   */
  const handleShowLinkInput = () => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        const node = selection.anchor.getNode();
        const parent = node.getParent();

        let linkNode = null;

        if ($isLinkNode(node)) {
          linkNode = node;
        } else if (parent && $isLinkNode(parent)) {
          linkNode = parent;
        }

        if (linkNode) {
          setLinkUrl(linkNode.getURL());
        } else {
          setLinkUrl('');
        }
      }
    });

    setShowLinkInput(true);
  };

  /**
   * @date 9/20/2025, 9:02:33 AM
   * @description Handles submitting of anchor links in the link insert toolbar command.
   * @author siqbal
   * @param {any} e:React.FormEvent<HTMLFormElement>
   * @return {void}
   */

  const handleLinkSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (linkUrl) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
    }
    setShowLinkInput(false);
    setLinkUrl('');
  };

  return (
    <div className="flex items-center flex-wrap gap-1 p-3 border-b border-base-300 bg-base-200">
      {/** --- Text Formatting --- * */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, BOLD_VALUE)}
          className="sidebar-hover p-2 rounded button-hover"
          title={BOLD_LABEL}
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, ITALIC_VALUE)}
          className="sidebar-hover p-2 rounded button-hover"
          title={ITALIC_LABEL}
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, UNDERLINE_VALUE)}
          className="sidebar-hover p-2 rounded button-hover"
          title={UNDERLINE_LABEL}
        >
          <Underline className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, STRIKETHROUGH_VALUE)}
          className="sidebar-hover p-2 rounded button-hover"
          title={STRIKETHROUGH_LABEL}
        >
          <Strikethrough className="w-5 h-5" />
        </button>
      </div>
      <ToolbarDropdown>
        <button
          type="button"
          className="btn btn-sm btn-ghost p-2 button-hover"
          tabIndex={0}
          aria-haspopup="true"
          aria-expanded="false"
          aria-label={HEADING_OPTIONS_LABEL}
          onClick={(e) => e.preventDefault()}
        >
          <Heading1 className="w-5 h-5" />
        </button>
        <ul className="dropdown-content toolbar-dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box">
          {HEADING_OPTIONS.map((heading, index) => (
            <li key={heading.level} tabIndex={index} className="flex-nowrap">
              <button
                type="button"
                onClick={() => setHeadingLevel(editor, heading.level)}
                className={`flex items-center gap-2 sidebar-hover px-2 py-1 ${heading.className} rounded hover:bg-base-300 text-nowrap`}
              >
                {heading.icon}
                {heading.label}
              </button>
            </li>
          ))}
        </ul>
      </ToolbarDropdown>
      {/** --- Lists --- * */}
      <div className="divider divider-horizontal mx-1" />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
          className="sidebar-hover p-2 rounded button-hover"
          title={BULLET_LIST}
        >
          <List className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
          className="sidebar-hover p-2 rounded button-hover"
          title={NUMBERED_LIST}
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined)}
          className="sidebar-hover p-2 rounded button-hover"
          title={CHECKLIST}
        >
          <ListTodo className="w-5 h-5" />
        </button>
      </div>
      {/** --- Link --- * */}
      <div className="divider divider-horizontal mx-1" />
      <div className="flex gap-2 relative">
        <button
          type="button"
          onClick={handleShowLinkInput}
          className="sidebar-hover p-2 rounded button-hover"
          title={INSERT_LINK}
        >
          <LinkIcon className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)}
          className="sidebar-hover p-2 rounded button-hover"
          title={REMOVE_LINK}
        >
          <Link2Off className="w-5 h-5" />
        </button>
        {showLinkInput && (
          <form onSubmit={handleLinkSubmit}>
            <div className="absolute top-15 left-1/2 -translate-x-1/2 bg-base-200 p-3 rounded shadow-lg z-50 w-64">
              <label className="block text-sm font-medium mb-1" htmlFor="link-input">
                Enter link
                <input
                  ref={linkInputRef}
                  type="text"
                  id="link-input"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="input input-sm input-bordered w-full mb-2 rounded"
                />
              </label>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-xs rounded button-no-color-hover"
                  onClick={() => {
                    setShowLinkInput(false);
                    setLinkUrl('');
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-xs btn-primary rounded">
                  Insert
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
      {/** --- Dropdown --- * */}
      <div className="divider divider-horizontal mx-1" />
      <ToolbarDropdown>
        <button
          type="button"
          className="btn btn-sm btn-ghost p-2 button-hover"
          tabIndex={0}
          aria-haspopup="true"
          aria-expanded="false"
          aria-label={ALIGNMENT_OPTIONS_LABEL}
          onClick={(e) => e.preventDefault()}
        >
          {ALIGN_OPTIONS.find((opt) => opt.value === align)?.icon ?? (
            <AlignLeft className="w-5 h-5" />
          )}
        </button>
        <ul className="dropdown-content toolbar-dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-40">
          {ALIGN_OPTIONS.map((option, index) => (
            <li key={option.value} tabIndex={index}>
              <button
                type="submit"
                onSubmit={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, option.value)}
                className={`flex items-center gap-2 sidebar-hover px-2 py-1 rounded hover:bg-base-300 ${
                  align === option.value ? 'bg-base-300 rounded active' : ''
                }`}
              >
                {option.icon}
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </ToolbarDropdown>
      {/** --- Undo/Redo --- * */}
      <div className="divider divider-horizontal mx-1" />
      <div className="flex gap-2 ml-auto">
        <button
          type="button"
          onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
          className="sidebar-hover p-2 rounded button-hover"
          title={UNDO_LABEL}
          disabled={!canUndo}
        >
          <Undo className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
          className="sidebar-hover p-2 rounded button-hover"
          title={REDO_LABEL}
          disabled={!canRedo}
        >
          <Redo className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
