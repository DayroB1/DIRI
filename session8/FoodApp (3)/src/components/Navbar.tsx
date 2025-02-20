import React, { useContext } from 'react';
import { Link} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { authService } from '../services/AuthService';
import '../styles.css';
import { Role } from '../services/IAuthService';

const Navbar: React.FC = () => {
  const { user, roles } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <ul className="nav-menu">
        <li><Link to="/FoodApp">Home</Link></li>
        {user && roles?.includes(Role.USER) && <li><Link to="/dashboard">Dashboard</Link></li>}
        {user && roles?.includes(Role.ADMIN) && <li><Link to="/admin">Admin</Link></li>}
        
        {!user && <Link to="/login" className="buton login">Iniciar Sesión</Link>}
        {!user && <Link to="/register" className="buton register">Registrarse</Link>}
        {user && <button onClick={() => authService.signOut()}>Cerrar Sesión</button>}
      </ul>
    </nav>
  );
};

export default Navbar;