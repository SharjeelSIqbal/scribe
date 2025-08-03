import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  LexicalEditor,
  $getRoot,
  $isTextNode,
  TextNode,
} from 'lexical';
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
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Pilcrow,
  List,
  ListOrdered,
  LinkIcon,
  Link2Off,
  Undo,
  Redo,
  ListTodo,
} from 'lucide-react';
import { $createHeadingNode } from '@lexical/rich-text';

type HeadingOptions = {
  level: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  label: string;
  icon: JSX.Element;
  className: string;
};

const HEADING_OPTIONS: HeadingOptions[] = [
  {
    level: 1,
    label: 'Heading 1',
    icon: <Heading1 className="w-4 h-4" />,
    className: 'text-2xl font-bold',
  },
  {
    level: 2,
    label: 'Heading 2',
    icon: <Heading2 className="w-4 h-4" />,
    className: 'text-xl font-semibold',
  },
  {
    level: 3,
    label: 'Heading 3',
    icon: <Heading3 className="w-4 h-4" />,
    className: 'text-lg font-semibold',
  },
  {
    level: 4,
    label: 'Heading 4',
    icon: <Heading4 className="w-4 h-4" />,
    className: 'text-base font-medium',
  },
  {
    level: 5,
    label: 'Heading 5',
    icon: <Heading5 className="w-4 h-4" />,
    className: 'text-sm font-medium',
  },
  {
    level: 6,
    label: 'Heading 6',
    icon: <Heading6 className="w-4 h-4" />,
    className: 'text-xs font-medium uppercase',
  },
  {
    level: 0,
    label: 'Paragraph',
    icon: <Pilcrow className="w-4 h-4" />,
    className: 'text-sm font-normal',
  },
];

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
        level === 0
          ? $createParagraphNode()
          : $createHeadingNode(`h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6');

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

  useEffect(() => {
    const unregisterUndo = editor.registerCommand<boolean>(
      UNDO_COMMAND,
      (payload) => {
        setCanUndo(payload);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );

    const unregisterRedo = editor.registerCommand<boolean>(
      REDO_COMMAND,
      (payload) => {
        setCanRedo(payload);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );

    return () => {
      unregisterUndo();
      unregisterRedo();
    };
  }, [editor]);

  return (
    <div className="flex items-center flex-wrap gap-3 p-3 border-b border-base-300 bg-base-200">
      {/* Formatting group */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
          className="sidebar-hover p-2 rounded button-hover"
          title="Bold"
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
          className="sidebar-hover p-2 rounded button-hover"
          title="Italic"
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
          className="sidebar-hover p-2 rounded button-hover"
          title="Underline"
        >
          <Underline className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
          className="sidebar-hover p-2 rounded button-hover"
          title="Strikethrough"
        >
          <Strikethrough className="w-5 h-5" />
        </button>
      </div>

      {/* Heading/Paragraph group */}
      <div className="dropdown dropdown-hover button-hover">
        <button
          type="button"
          className="btn btn-sm btn-ghost p-2"
          tabIndex={0}
          aria-haspopup="true"
          aria-expanded="false"
          aria-label="Heading options"
          onClick={(e) => e.preventDefault()}
        >
          <Heading1 className="w-5 h-5" />
        </button>
        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
          {HEADING_OPTIONS.map((heading, index) => (
            <li key={heading.level} tabIndex={index}>
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

      {/* Lists */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
          className="sidebar-hover p-2 rounded button-hover"
          title="Bullet List"
        >
          <List className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
          className="sidebar-hover p-2 rounded button-hover"
          title="Numbered List"
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)}
          className="sidebar-hover p-2 rounded button-hover"
          title="Remove List"
        >
          <ListTodo className="w-5 h-5" />
        </button>
      </div>

      {/* Links (placeholder actions) */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="sidebar-hover p-2 rounded button-hover"
          title="Insert Link"
        >
          <LinkIcon className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="sidebar-hover p-2 rounded button-hover"
          title="Remove Link"
        >
          <Link2Off className="w-5 h-5" />
        </button>
      </div>

      {/* Undo/Redo */}
      <div className="flex gap-2 ml-auto">
        <button
          type="button"
          onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
          className="sidebar-hover p-2 rounded button-hover"
          title="Undo"
          disabled={!canUndo}
        >
          <Undo className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
          className="sidebar-hover p-2 rounded button-hover"
          title="Redo"
          disabled={!canRedo}
        >
          <Redo className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
