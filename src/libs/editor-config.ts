import { HeadingNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { LinkNode } from '@lexical/link';
import theme from './editor-theme';
import { APP_NAME } from './constants';

function onError(error: Error): void {
  // eslint-disable-next-line
  console.error(error);
}

const editorConfig = {
  namespace: APP_NAME,
  theme,
  onError,
  nodes: [HeadingNode, ListNode, ListItemNode, LinkNode],
  movable: true,
  editable: true,
};

export default editorConfig;
