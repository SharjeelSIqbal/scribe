import './index.css'
import { Button } from './components/ui/button'

function App() {
  return (
    <div className='App'>
      HELLO WORLD!
      <Button onClick={() => console.log('test')}> Test </Button>
    </div>
  )
}

export default App
