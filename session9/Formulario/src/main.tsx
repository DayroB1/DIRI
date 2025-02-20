import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { LanguageProvider } from './components/LanguageProvider';
import { Root } from './components/Root';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <Root />
    </LanguageProvider>
  </StrictMode>,
);