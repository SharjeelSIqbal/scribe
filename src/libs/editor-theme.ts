import { BOLD_VALUE, ITALIC_VALUE } from './constants';
import {
  UNDERLINE_STYLE,
  STRIKETHROUGH_STYLE,
  UNDERLINE_STRIKETHROUGH_STYLE,
} from './styles-constants';

const theme = {
  paragraph: 'text-base leading-relaxed',
  heading: {
    h1: 'lexical-heading-h1',
    h2: 'lexical-heading-h2',
    h3: 'lexical-heading-h3',
    h4: 'lexical-heading-h4',
    h5: 'lexical-heading-h5',
    h6: 'lexical-heading-h6',
  },
  text: {
    bold: BOLD_VALUE,
    italic: ITALIC_VALUE,
    underline: UNDERLINE_STYLE,
    strikethrough: STRIKETHROUGH_STYLE,
    underlineStrikethrough: UNDERLINE_STRIKETHROUGH_STYLE,
  },

  list: {
    ul: 'pl-6 space-y-1 list-outside',
    ol: 'pl-6 space-y-1 list-outside',

    ulDepth: ['list-disc', 'list-[circle]', 'list-[square]', 'list-disc'],
    olDepth: ['list-decimal', 'list-[lower-alpha]', 'list-[lower-roman]', 'list-decimal'],

    checklist: 'list-none pl-2 scribe-checklist',
    listitemChecked: 'line-through text-base-content/60 scribe-check-checked',
    listitemUnchecked: 'text-base-content scribe-check-unchecked',

    listitem: 'my-1 marker:text-base-content marker:opacity-70',
    nested: { list: 'pl-6', listitem: 'my-1' },
  },
};

export default theme;
