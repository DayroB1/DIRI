import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LanguageProvider } from './components/LanguageProvider.tsx'
import { Root } from './components/Root.tsx'

//const locale = navigator.language;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
        <Root />
    </LanguageProvider>
  </StrictMode>,
)
