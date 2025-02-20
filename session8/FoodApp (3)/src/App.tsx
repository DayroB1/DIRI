import { Suspense, useEffect, useState } from 'react';
import './App.css';
import { MenuItem } from './entities/entities';
import React from 'react';
import logger from './services/logging';
import ErrorBoundary from './services/ErrorBoundary';
import { AuthProvider } from './AuthProvider';
//import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import { Role } from './services/IAuthService';
import Navbar from './components/Navbar';


const Foods = React.lazy(() => import("./Foods"));

export const foodItemsContext = React.createContext<MenuItem[]>([]);

function App() {
    const [isChooseFoodPage, setIsChooseFoodPage] = useState(false);
    const [menuItems, _setMenuItems] = useState<MenuItem[]>([
        {
            "id": 1,
            "name": "Hamburguesa de Pollo",
            "quantity": 40,
            "desc": "Hamburguesa de pollo frito - … y mayonesa",
            "price": 24,
            "image": "cb.jpg"
        },
        {
            "id": 2,
            "name": "Hamburguesa de Carne",
            "quantity": 20,
            "desc": "Hamburguesa de carne de ternera y patatas fritas",
            "price": 31,
            "image": "ter.jpg"
        },
        {
            "id": 3,
            "name": "Hamburguesa de Cerdo",
            "quantity": 35,
            "desc": "Hamburguesa de cerdo con salsa de la casa",
            "price": 38,
            "image": "cer.jpg"
        }
    ]);

    //const {user,roles} = useContext(AuthContext);
    const { roles } = useContext(AuthContext);

    useEffect(() => {
        logger.info('Aplicación cargada correctamente');
    }, []);

    const togglePage = () => {
        logger.info(`Cambio de página a: ${isChooseFoodPage ? 'Menús' : 'Pedir Comida'}`);
        setIsChooseFoodPage(!isChooseFoodPage);
    };

    return (
      // <Router> 
        <AuthProvider>
          <Navbar/>
          <foodItemsContext.Provider value={menuItems}>
            {/* <div className="auth-buttons">
              {!user && <Link to="/login" className="button login">Iniciar Sesión</Link>}
              {!user && <Link to="/register" className="button register">Registrarse</Link>}
              {user && <button onClick={() => authService.signOut()}>Cerrar Sesión</button>}
            </div> */}
            <div className='App'>
              <h2 className="title">Comida Rápida Online</h2>
              <button className="toggleButton" onClick={togglePage}>
                {isChooseFoodPage ? "Disponibilidad" : "Pedir Comida"}
              </button>
              {!isChooseFoodPage && (
                <>
                  <h3 className="subTitle">Menús</h3>
                  <h5>Este es el listado de productos que tiene actualmente la tienda de comida, de click en 'Pedir Comida' para ver a detalle cada uno y realizar un pedido</h5> 
                  <ul className="ulApp">
                    {menuItems.map((item) => (
                      <li key={item.id} className="liApp">
                        <p className='itemsColor'> {item.name}</p>
                        {roles?.includes(Role.ADMIN) && <p className='itemsColor'>Disponible: {item.quantity}</p>}
                      </li>
                    ))}
                  </ul>
                  {roles?.includes(Role.ADMIN) && <h5>*Debido a que eres Admistrador, puedes observar el stock disponible para controlar las cantidades del menú</h5>}
                </>
              )}
              {isChooseFoodPage && (
                <ErrorBoundary fallback={<div style={{ color: 'red' }}>¡Error al cargar el menú!</div>}>
                  <Suspense fallback={<div>Cargando menús...</div>}>
                    <Foods />
                  </Suspense>
                </ErrorBoundary>
              )}
            </div>
          </foodItemsContext.Provider>
          
        </AuthProvider>
      // </Router>
    );
  }
  
  export default App;