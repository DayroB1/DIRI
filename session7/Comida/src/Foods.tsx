import { useState } from "react";
import FoodOrder from "./FoodOrder";
import { MenuItem } from "./entities/entities";

interface FoodsProps {
  menuItems: MenuItem[];
  onMenuItemQuantityUpdate: (itemId: number, quantity: number) => void;
}

function Foods({ menuItems, onMenuItemQuantityUpdate }: FoodsProps) {
  const [selectedFood, setSelectedFood] = useState<number | null>(null);

  const handleFoodClick = (food: number) => {
    setSelectedFood(selectedFood === food ? null : food);
  };

  const handleReturnToMenu = () => {
    setSelectedFood(null);
  };

  return (
    <>
      <h4 className="foodTitle">Choose from our Menu</h4>
      <ul className="ulFoods">
        {menuItems.map((item) => (
          <li key={item.id} className="liFoods">
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

            {selectedFood === item.id && (
              <div className="foodOrderWrapper">
                <FoodOrder
                  food={item}
                  onReturnToMenu={handleReturnToMenu}
                  onMenuItemQuantityUpdate={onMenuItemQuantityUpdate}
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