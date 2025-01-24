import { MouseEventHandler, useContext, useState } from "react";
import { MenuItem } from "./entities/entities";
import { foodItemsContext } from "./App";

interface FoodOrderProps {
    food: MenuItem;
    //Se comenta onQuantityUpdated y todos los sitios donde se usa para cambiar el props drilling por el context
    //onQuantityUpdated(id: number, quantity: number): void;
    onReturnToMenu: MouseEventHandler<HTMLButtonElement> | undefined;
}

function FoodOrder(props: FoodOrderProps) {
    //const [quantity, setQuantity] = useState<number>(1);
    const [quantity, setQuantity] = useState("");
    const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    //Uso del contexto
    const menuItems = useContext(foodItemsContext);

    // Para el precio total
    const totalPrice = (Number(quantity) * props.food.price).toFixed(2);
    //const totalPrice = (quantity * props.food.price).toFixed(2);


    // Maneja el cambio en el precio total dependiendo de la cantidad
    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, parseInt(event.target.value) || 1); // Al menos 1
    setQuantity(newQuantity);

    setErrorMessage(null);
    };

    const handleSubmit = () => {
        if (quantity > props.food.quantity) {
          setErrorMessage("No hay inventario suficiente.");
          return;
        }
    
        // Es para actualizar la cantidad disponible en App.tsx (vista inicial)
        //props.onQuantityUpdated(props.food.id, quantity);

        // Actualizar la cantidad en el contexto global
        menuItems.map((item) => {
        if (item.id === props.food.id) {
          item.quantity -= quantity;
        }
        return item;
      });
        setIsOrderSubmitted(true); 
      };

    return (
        <div className="food-order-card">
          <h4>{props.food.desc}</h4>
          <p className="price">{totalPrice}€</p>
    
          <div className="order-controls">
            <label htmlFor="quantity">Cantidad</label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              min="1"
               onChange={handleQuantityChange}
            />
    
            <input
              type="text"
              placeholder="Tu nombre"
              className="order-name"
            />
    
            <input
              type="tel"
              placeholder="Tu teléfono"
              className="order-phone"
            />
          </div>
          {errorMessage && (
            <p className="error-message" style={{ color: "red" }}>
            {errorMessage}
            </p>
           )}
    
          <div className="order-buttons">
            <button className="submit-button" onClick={handleSubmit}>Enviar Pedido</button>
            <button className="return-button" onClick={props.onReturnToMenu}>Volver al menú</button>
          </div>
    
          {isOrderSubmitted && !errorMessage && (
            <p className="confirmation-message">
                SU PEDIDO HA SIDO ENVIADO CORRECTAMENTE.
            </p>
        )}
        </div>
    );
}
  
  export default FoodOrder;
