import { useNavigate } from "react-router-dom";

const Boton = () => {
  const navigate = useNavigate();
  return (
      <>
      <button className="btn" onClick={() => navigate(-1)}>Volver</button>
      </>
  )
}

const PreguntasFrecuentes:React.FC = ():JSX.Element => (
    <div>
      <Boton/>
      <h2>Preguntas más frecuentes</h2>
      <p>Esta es la página para las respuestas a las preguntas más frecuentes de ejemplo</p>
    </div>
  );
  
  export default PreguntasFrecuentes
  