import { LexicalComposer } from '@lexical/react/LexicalComposer';
import Notes from './components/notes/Notes';
import Sidebar from './components/layout/Sidebar';
import editorConfig from './libs/editor-config';

function App() {
  return (
    <main className="h-full w-full bg-neutral flex drawer-content">
      <Sidebar />
      <LexicalComposer initialConfig={editorConfig}>
        <Notes />
      </LexicalComposer>
    </main>
  );
}

export default App;
