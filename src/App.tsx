import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/themes/theme-provider'
import Home from './components/pages/Home'
import Settings from './components/pages/Settings'

function App() {
  getComputedStyle(document.documentElement).getPropertyValue('--primary')
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  )
}

export default App
