import Notes from './components/notes/Notes';
import Sidebar from './components/layout/Sidebar';

function App() {
  return (
    <main className="h-full w-full bg-neutral flex drawer-content">
      <Sidebar />
      <Notes />
    </main>
  );
}

export default App;
