// import React from "react";
// import { Link } from "react-router-dom";
// import "../styles.css"

// const Home: React.FC = () => {
//   return (
//     <div className="">
//       <h1 className="">Bienvenido a la App</h1>
//       <p className="">Explora nuestras funcionalidades.</p>
//       <div className="button-container">
//         <Link to="/login" className="button login">
//           Iniciar Sesión
//         </Link>
//         <Link to="/register" className="button register">
//           Registrarse
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Home;
import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Bienvenido a la App</h1>
      <p>Explora nuestras funcionalidades.</p>
      <div className="button-container">
        <Link to="/login" className="button login">Iniciar Sesión</Link>
        <Link to="/register" className="button register">Registrarse</Link>
      </div>
    </div>
  );
};

export default Home;