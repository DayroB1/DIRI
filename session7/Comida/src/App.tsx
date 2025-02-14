import { Suspense, useState, useEffect } from 'react';
import './App.css';
import { MenuItem } from './entities/entities';
import React from 'react';
import { useDispatch} from 'react-redux';
import { updateMenuItemQuantity } from './features/orderSlice';
import { AppDispatch } from './features/store';

const Foods = React.lazy(() => import("./Foods"));

function App() {
  const dispatch:AppDispatch = useDispatch();
  //const { orders } = useSelector((state: RootState) => state.orders);
  const [isChooseFoodPage, setIsChooseFoodPage] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    // Aquí simula la obtención de datos desde Firebase, pero deberías usar fetchOrders
    const menuItemsFromFirebase = [
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
    ]
    setMenuItems(menuItemsFromFirebase);
  }, []);

  const handleMenuItemQuantityUpdate = (itemId: number, quantity: number) => {
    dispatch(updateMenuItemQuantity({ itemId, quantity })); // Uso correcto
    setMenuItems((prevMenuItems) =>
      prevMenuItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <div className='App'>
      <button className="toggleButton" onClick={() => setIsChooseFoodPage(!isChooseFoodPage)}>
        {isChooseFoodPage ? "Disponibilidad" : "Pedir Comida"}
      </button>

      <h3 className="title">Comida Rápida Online</h3>
      {!isChooseFoodPage && (
        <>
          <h4 className="subTitle">Menús</h4>
          <ul className="ulApp">
            {menuItems.map((item) => (
              <li key={item.id} className="liApp">
                <p>{item.name}</p><p>Disponible: {item.quantity}</p>
              </li>
            ))}
          </ul>
        </>
      )}
      {isChooseFoodPage && (
        <Suspense fallback={<div>Cargando menús...</div>}>
          <Foods menuItems={menuItems} onMenuItemQuantityUpdate={handleMenuItemQuantityUpdate} />
        </Suspense>
      )}
    </div>
  );
}

export default App;