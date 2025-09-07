import { BOLD_VALUE, ITALIC_VALUE } from './contants';
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
};

export default theme;
