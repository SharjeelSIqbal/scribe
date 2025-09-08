import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect, useState } from 'react';
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
  REMOVE_LIST,
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

  useEffect(() => {
    const toolbarCommands = registerToolbarCommands(editor, { setAlign, setCanUndo, setCanRedo });

    return toolbarCommands;
  }, [editor]);

  return (
    <div className="flex items-center flex-wrap gap-3 p-3 border-b border-base-300 bg-base-200">
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

      <div className="dropdown dropdown-hover button-hover">
        <button
          type="button"
          className="btn btn-sm btn-ghost p-2"
          tabIndex={0}
          aria-haspopup="true"
          aria-expanded="false"
          aria-label={HEADING_OPTIONS_LABEL}
          onClick={(e) => e.preventDefault()}
        >
          <Heading1 className="w-5 h-5" />
        </button>
        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
          {HEADING_OPTIONS.map((heading, index) => (
            <li key={heading.level} tabIndex={index} className="flex-nowrap">
              <button
                type="button"
                onClick={() => setHeadingLevel(editor, heading.level)}
                className={`flex items-center gap-2 sidebar-hover px-2 py-1 ${heading.className}`}
              >
                {heading.icon}
                {heading.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="divider divider-horizontal mx-0" />

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
          onClick={() => editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)}
          className="sidebar-hover p-2 rounded button-hover"
          title={REMOVE_LIST}
        >
          <ListTodo className="w-5 h-5" />
        </button>
      </div>
      <div className="divider divider-horizontal mx-1" />

      <div className="flex gap-2">
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="sidebar-hover p-2 rounded button-hover"
          title={INSERT_LINK}
        >
          <LinkIcon className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="sidebar-hover p-2 rounded button-hover"
          title={REMOVE_LINK}
        >
          <Link2Off className="w-5 h-5" />
        </button>
        <div className="divider divider-horizontal mx-1" />
        <div className="dropdown dropdown-hover button-hover">
          <button
            type="button"
            className="btn btn-sm btn-ghost p-2"
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
          <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-40">
            {ALIGN_OPTIONS.map((option, index) => (
              <li key={option.value} tabIndex={index}>
                <button
                  type="button"
                  onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, option.value)}
                  className={`flex items-center gap-2 sidebar-hover px-2 py-1 ${
                    align === option.value ? 'bg-base-300 rounded' : ''
                  }`}
                >
                  {option.icon}
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="divider divider-horizontal mx-1" />
      </div>
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
