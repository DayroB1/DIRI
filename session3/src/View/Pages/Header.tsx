import { NavLink } from "react-router-dom";

const Header:React.FC = (): JSX.Element => (
  <nav>
    {/* NavLink navega hacia las rutas definidas en el App.tsx y definine que si el link hace 'match' con la locación actual, se marca como 'active' en caso que no, simplmente queda vacío, esa marcación también servirá para definir un estilo en el CSS */}
    <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
      Citas
    </NavLink>{" "}|{" "}
    <NavLink to="/Ayuda" className={({ isActive }) => (isActive ? "active" : "")}>
      Ayuda
    </NavLink>
  </nav>
);

export default Header;
