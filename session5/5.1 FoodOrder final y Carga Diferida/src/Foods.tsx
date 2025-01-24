import { useState } from "react";
import { MenuItem } from "./entities/entities";
import FoodOrder from "./FoodOrder";

interface FoodsProps {
    foodItems: MenuItem[];
    onFoodOrder: (id: number, quantity: number) => void;
}

function Foods(props: FoodsProps) {

    const [selectedFood, setSelectedFood] = useState<number | null>(null);

    // Para hacer click en cada hamburguesa
  const handleFoodClick = (food: number) => {
    setSelectedFood(selectedFood === food ? null : food); 
  };

  // Para regresar
  const handleReturnToMenu = () => {
    setSelectedFood(null); 
  };

    return (
    <>
      <h4 className="foodTitle">Choose from our Menu</h4>
      <ul className="ulFoods">
        {props.foodItems.map((item) => (
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
                <FoodOrder
                  food={item}
                  onQuantityUpdated={props.onFoodOrder}
                //   onQuantityUpdated={(id, quantity) =>
                //     console.log(`Cantidad actualizada para ID ${id}: ${quantity}`)
                //   }
                  onReturnToMenu={handleReturnToMenu}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Foods;