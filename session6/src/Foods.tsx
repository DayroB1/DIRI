import { useContext, useState } from "react";
import FoodOrder from "./FoodOrder";
import { foodItemsContext } from "./App";
import logger from "./services/logging";
import ErrorBoundary from "./services/ErrorBoundary";

function Foods() {
    const menuItems = useContext(foodItemsContext)

    const [selectedFood, setSelectedFood] = useState<number | null>(null);

    // Para hacer click en cada hamburguesa
  const handleFoodClick = (food: number) => {
    logger.info(`Comida seleccionada: ${menuItems.find((item) => item.id === food)?.name}`);
    setSelectedFood(selectedFood === food ? null : food); 
  };

  // Para regresar
  const handleReturnToMenu = () => {
    logger.info('Volviendo al menú principal')
    setSelectedFood(null); 
  };

    return (
    <>
      <h4 className="foodTitle">Choose from our Menu</h4>
      <ul className="ulFoods">
        {menuItems.map((item) => (
          <li key={item.id} className="liFoods">

            {/* Tarjeta de cada producto (hamburguesa) */}
            <div onClick={() => handleFoodClick(item.id)}>
              <img
                className="foodImg"
                src={`/images/${item.image}`}
                alt={item.name}
              />
              <div className="foodItem">
                <p className="foodDesc">{item.desc}</p>
                <p className="foodPrice">{item.price}€</p>
              </div>
            </div>

            {/* Esto es para FoodOrder */}
            {selectedFood === item.id && (
              <div className="foodOrderWrapper">
                <ErrorBoundary fallback={<div style={{ color: 'red' }}>¡Error al procesar el pedido!</div>}>
                <FoodOrder
                  food={item} 
                //onQuantityUpdated={props.onFoodOrder}
                //   onQuantityUpdated={(id, quantity) =>
                //     console.log(`Cantidad actualizada para ID ${id}: ${quantity}`)
                //   }
                  onReturnToMenu={handleReturnToMenu}
                  
                />
                </ErrorBoundary>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Foods;