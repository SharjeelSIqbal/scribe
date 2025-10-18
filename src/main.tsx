import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import ContextProviderContainer from './contexts/ContextProviderContainer';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextProviderContainer>
      <App />
    </ContextProviderContainer>
  </React.StrictMode>
);

window.ipcRenderer.on('main-process-message', (_event, message) => {
  // eslint-disable-next-line
  console.log(message);
});
