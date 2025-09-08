import { HeadingNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import theme from './editor-theme';

function onError(error: Error): void {
  // eslint-disable-next-line
  console.error(error);
}

const editorConfig = {
  namespace: 'Scribe',
  theme,
  onError,
  nodes: [HeadingNode, ListNode, ListItemNode],
  movable: true,
};

export default editorConfig;
