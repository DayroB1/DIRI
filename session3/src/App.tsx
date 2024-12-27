import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Pacientes from './ViewModel/Pacientes'
import Ayuda from './View/Pages/Ayuda'
import PreguntasFrecuentes from './View/Pages/PreguntasFrecuentes'
import Referencias from './View/Pages/Referencias'
import NoMatch from './View/Pages/404'

function App() {
  //const [count, setCount] = useState(0)

  return (
     <>
     <Routes>
      <Route path="/" element={<Pacientes/>}></Route>
      <Route path="/Ayuda" element={<Ayuda/>}></Route>

      {/* Páginas anidadas en la página Ayuda */}
      <Route path="/Ayuda/preguntas" element={<PreguntasFrecuentes />} />
      <Route path="/Ayuda/referencias" element={<Referencias />} />

      {/* Para definir la página de ruta no encontrada, se hace uso del componente creado 'NoMatch' al cual con el signo * se le indica que cualquier path que no tenga definida como una ruta, la marque como página desconocida */}
      <Route path="*" element={<NoMatch/>}></Route>
     </Routes>
    </>
   )
}

export default App
