import { Link, useNavigate } from "react-router-dom";
import { NavLink, Outlet } from "react-router-dom";
import Header from "./Header";

const Boton = () => {
    const navigate = useNavigate();
    return (
        <>
        <button className="btn" onClick={() => navigate(-1)}>Volver</button>
        </>
    )
}

const Ayuda = (): React.JSX.Element =>
    <div>
    <Header/>
    <Boton/>
    <h1>Página Ayuda</h1>
    <p>Esta es la página ayuda de ejemplo</p>
    <nav>
      {/* En la página Ayuda, se define otro menú inferior con dos páginas anidadas llamadas 'Preguntas más frecuentes' y 'Preferencias', en el path se agrega el nombre de cada una después de la ruta de /Ayuda, esto para indicar que están dentro de la otra, algo que también se agrega en la Route de App.tsx */}
      <NavLink
        to="/Ayuda/preguntas"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Preguntas más frecuentes
      </NavLink>{" "}|{" "}
      <NavLink
        to="/Ayuda/referencias"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Referencias
      </NavLink>
    </nav>
    <Outlet />
    </div>

export default Ayuda