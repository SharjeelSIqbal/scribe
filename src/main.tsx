import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserRoleProviderComponent } from './contexts/UserRoleContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserRoleProviderComponent>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </UserRoleProviderComponent>
  </React.StrictMode>
);

window.ipcRenderer.on('main-process-message', (_event, message) => {
  // eslint-disable-next-line
  console.log(message);
});
