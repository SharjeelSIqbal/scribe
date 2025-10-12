import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Pilcrow,
  Eye,
  Edit3,
} from 'lucide-react';
import { HeadingOption, AlignOption, HeadingTag, UserRolesOptions } from './types/lexical-types';

const APP_NAME = 'Scribe';
const SOME_PLACE_HODLER = 'Some Place Holder';
const DEBOUNCE_DELAY = 500;
const USER_ROLE_EDITOR = 'editor';
const USER_ROLE_VIEWER = 'viewer';
const USER_ROLE_EDITOR_LABEL = 'Editor';
const USER_ROLE_VIEWER_LABEL = 'Viewer';

// Toolbar Constants
const HEADING_1 = 'Heading 1';
const HEADING_2 = 'Heading 2';
const HEADING_3 = 'Heading 3';
const HEADING_4 = 'Heading 4';
const HEADING_5 = 'Heading 5';
const HEADING_6 = 'Heading 6';
const PARAGRAPH = 'Paragraph';

const H1 = 'h1';
const H2 = 'h2';
const H3 = 'h3';
const H4 = 'h4';
const H5 = 'h5';
const H6 = 'h6';

const HEADING_OPTIONS_LABEL = 'Heading Options';
const ALIGNMENT_OPTIONS_LABEL = 'Alignment Options';
const USER_ROLE_OPTIONS_LABEL = 'User Role Options';

const BOLD_LABEL = 'Bold';
const ITALIC_LABEL = 'Italic';
const UNDERLINE_LABEL = 'Underline';
const STRIKETHROUGH_LABEL = 'Strikethrough';
const BOLD_VALUE = 'bold';
const ITALIC_VALUE = 'italic';
const UNDERLINE_VALUE = 'underline';
const STRIKETHROUGH_VALUE = 'strikethrough';

const BULLET_LIST = 'Bullet List';
const NUMBERED_LIST = 'Numbered List';
const CHECKLIST = 'Check List';

const INSERT_LINK = 'Insert Link';
const REMOVE_LINK = 'Remove Link';

const UNDO_LABEL = 'Undo';
const REDO_LABEL = 'Redo';

const ALIGN_LEFT_LABEL = 'Align Left';
const LEFT = 'left';
const ALIGN_CENTER_LABEL = 'Align Center';
const CENTER = 'center';
const ALIGN_RIGHT_LABEL = 'Align Right';
const RIGHT = 'right';
const ALIGN_JUSTIFY_LABEL = 'Align Justify';
const JUSTIFY = 'justify';

const PLACEHOLDER_TEXT = 'Start writing...';

const HEADING_TAGS: Record<1 | 2 | 3 | 4 | 5 | 6, HeadingTag> = {
  1: H1,
  2: H2,
  3: H3,
  4: H4,
  5: H5,
  6: H6,
};

const HEADING_OPTIONS: HeadingOption[] = [
  {
    level: 1,
    label: HEADING_1,
    icon: <Heading1 className="w-4 h-4" />,
    className: 'text-4xl font-semibold',
  },
  {
    level: 2,
    label: HEADING_2,
    icon: <Heading2 className="w-4 h-4" />,
    className: 'text-3xl font-semibold',
  },
  {
    level: 3,
    label: HEADING_3,
    icon: <Heading3 className="w-4 h-4" />,
    className: 'text-2xl font-medium',
  },
  {
    level: 4,
    label: HEADING_4,
    icon: <Heading4 className="w-4 h-4" />,
    className: 'text-xl font-medium',
  },
  {
    level: 5,
    label: HEADING_5,
    icon: <Heading5 className="w-4 h-4" />,
    className: 'text-lg font-medium',
  },
  {
    level: 6,
    label: HEADING_6,
    icon: <Heading6 className="w-4 h-4" />,
    className: 'text-base font-medium',
  },
  {
    level: 0,
    label: PARAGRAPH,
    icon: <Pilcrow className="w-4 h-4" />,
    className: 'text-sm font-normal',
  },
];

const ALIGN_OPTIONS: AlignOption[] = [
  {
    value: LEFT,
    label: ALIGN_LEFT_LABEL,
    icon: <AlignLeft className="w-4 h-4" />,
  },
  {
    value: CENTER,
    label: ALIGN_CENTER_LABEL,
    icon: <AlignCenter className="w-4 h-4" />,
  },
  {
    value: RIGHT,
    label: ALIGN_RIGHT_LABEL,
    icon: <AlignRight className="w-4 h-4" />,
  },
  {
    value: JUSTIFY,
    label: ALIGN_JUSTIFY_LABEL,
    icon: <AlignJustify className="w-4 h-4" />,
  },
];

const USER_ROLES_OPTIONS: UserRolesOptions = [
  {
    value: USER_ROLE_EDITOR,
    label: USER_ROLE_EDITOR_LABEL,
    icon: <Edit3 className="w-4 h-4" />,
  },
  {
    value: USER_ROLE_VIEWER,
    label: USER_ROLE_VIEWER_LABEL,
    icon: <Eye className="w-4 h-4" />,
  },
  // Not an option yet
  // {
  //   value: 'presenter',
  //   label: 'presenter',
  //   icon: <Play className="w-4 h-4" />,
  // },
];

export {
  APP_NAME,
  SOME_PLACE_HODLER,
  DEBOUNCE_DELAY,
  ALIGN_OPTIONS,
  USER_ROLE_OPTIONS_LABEL,
  HEADING_OPTIONS,
  HEADING_OPTIONS_LABEL,
  BOLD_LABEL,
  ITALIC_LABEL,
  UNDERLINE_LABEL,
  STRIKETHROUGH_LABEL,
  BOLD_VALUE,
  ITALIC_VALUE,
  UNDERLINE_VALUE,
  STRIKETHROUGH_VALUE,
  BULLET_LIST,
  NUMBERED_LIST,
  CHECKLIST,
  INSERT_LINK,
  REMOVE_LINK,
  UNDO_LABEL,
  REDO_LABEL,
  ALIGNMENT_OPTIONS_LABEL,
  ALIGN_LEFT_LABEL,
  LEFT,
  ALIGN_CENTER_LABEL,
  CENTER,
  ALIGN_RIGHT_LABEL,
  RIGHT,
  ALIGN_JUSTIFY_LABEL,
  JUSTIFY,
  HEADING_TAGS,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  PARAGRAPH,
  PLACEHOLDER_TEXT,
  USER_ROLES_OPTIONS,
  USER_ROLE_EDITOR,
  USER_ROLE_VIEWER,
  USER_ROLE_EDITOR_LABEL,
  USER_ROLE_VIEWER_LABEL,
};
