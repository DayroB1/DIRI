import { Suspense, useEffect, useState } from 'react'
import './App.css'
import { MenuItem } from './entities/entities'
import React from 'react'
import logger from './services/logging';
import ErrorBoundary from './services/ErrorBoundary';
//import Foods from './Foods'
const Foods = React.lazy(() => import("./Foods"));

export const foodItemsContext = React.createContext<MenuItem[]>([])

function App() {
  const[isChooseFoodPage,setIsChooseFoodPage]=useState(false)
  const[menuItems,_setMenuItems]=useState<MenuItem[]>([
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
      "name": "Hamburguesa de cerdo",
      "quantity": 35,
      "desc": "Hamburguesa de cerdo con salsa de la casa",
      "price": 38,
      "image": "cer.jpg"
    }
  ])

    // Función para actualizar la cantidad disponible
    // const updateFoodQuantity = (id: number, quantity: number) => {
    //   setMenuItems(prevItems =>
    //     prevItems.map(item =>
    //       item.id === id ? { ...item, quantity: item.quantity - quantity } : item
    //     )
    //   );
    // };

    // Log inicial al cargar la aplicación
  useEffect(() => {
    logger.info('Aplicación cargada correctamente');
  }, []);

  const togglePage = () => {
    logger.info(`Cambio de página a: ${isChooseFoodPage ? 'Menús' : 'Pedir Comida'}`);
    setIsChooseFoodPage(!isChooseFoodPage);
  };

  return (
    <foodItemsContext.Provider value={menuItems}>
    <div className='App'>
      <button className="toggleButton" onClick={togglePage}>
        {isChooseFoodPage ? "Disponibilidad" : "Pedir Comida"}
      </button>

      <h3 className="title">Comida Rápida Online</h3>
        {!isChooseFoodPage && (
        <>

      <h4 className="subTitle">Menús</h4>
      <ul className="ulApp">
      {menuItems.map((item) => {

      return (
      <li key={item.id} className="liApp">
      <p>{item.name}</p><p>Disponible: {item.quantity}</p>
      </li>
      );

      })}
      </ul>
      </>
      )}
      {isChooseFoodPage && (
        //Para la carga diferida y ErrorBoundary
        <ErrorBoundary fallback={<div style={{ color: 'red' }}>¡Error al cargar el menú!</div>}>
        
        
        <Suspense fallback={<div>Cargando menús...</div>}>
          <Foods/>
        </Suspense>
        </ErrorBoundary>
      )}
      </div>
      </foodItemsContext.Provider>
      );
}
export default App
