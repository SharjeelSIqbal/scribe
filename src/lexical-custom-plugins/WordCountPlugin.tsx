import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot } from 'lexical';
import { useEffect, useState } from 'react';

/**
 * @date 10/12/2025, 3:13:33 PM
 * @description Counts the word in the editor and returns a simple component with the word count.
 * @author siqbal
 * @return {JSX.Element}
 */

function WordCountPlugin() {
  const [editor] = useLexicalComposerContext();
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = $getRoot();
        const text = root.getTextContent();
        const words = text.split(/\s+/).filter(Boolean);
        setWordCount(words.length);
      });
    });
  }, [editor]);

  return <div className="text-sm text-neutral-content">Word count: {wordCount}</div>;
}

export default WordCountPlugin;
