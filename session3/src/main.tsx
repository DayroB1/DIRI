import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    {/* <Ejemplo2 name='Dayro' apellido='Bonilla' edad={25} /> */}
    {/* <TaskManager/> */}
    <App/>
    </BrowserRouter>
  </StrictMode>,
)
