import { useNavigate } from "react-router-dom";

const Boton = () => {
  const navigate = useNavigate();
  return (
      <>
      <button className="btn" onClick={() => navigate(-1)}>Volver</button>
      </>
  )
}

const Referencias:React.FC = ():JSX.Element => (
    <div>
      <Boton/>
      <h2>Referencias</h2>
      <p>Página para consulta de referencias de ejemplo</p>
    </div>
  );
  
  export default Referencias;
  