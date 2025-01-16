import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MenuItem } from './entities/entities'
import Foods from './Foods'

function App() {
  const[isChooseFoodPage,setIsChooseFoodPage]=useState(false)
  const[menuItems,setMenuItems]=useState<MenuItem[]>([
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
    const updateFoodQuantity = (id: number, quantity: number) => {
      setMenuItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity: item.quantity - quantity } : item
        )
      );
    };

  return (
    <div className='App'>
      <button className="toggleButton" onClick={() =>
        setIsChooseFoodPage
        (!isChooseFoodPage)}>
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
      {isChooseFoodPage && <Foods foodItems={menuItems} onFoodOrder={updateFoodQuantity}></Foods>}
      </div>
      );
}
export default App
