import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Ejemplo from './Ejemplo.tsx'
import Ejemplo1 from './Ejemplo1.tsx'
import Ejemplo2 from './Ejemplo2.tsx'
import Ejemplo3 from './Ejemplo3.tsx'
import JAJA from './Ejemplo.tsx'
import JAJA1 from './Ejemplo.tsx'
import TaskManager from './TaskManager.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    {/* <Ejemplo2 name='Dayro' apellido='Bonilla' edad={25} /> */}
    {/* <TaskManager/> */}
    <App/>
    {/* <JAJA1/> */}
    </BrowserRouter>
  </StrictMode>,
)
