import { MouseEventHandler, useState } from "react";
import { MenuItem } from "./entities/entities";

interface FoodOrderProps {
    food: MenuItem;
    onQuantityUpdated(id: number, quantity: number): void;
    onReturnToMenu: MouseEventHandler<HTMLButtonElement> | undefined;
}

function FoodOrder(props: FoodOrderProps) {
    const [quantity, setQuantity] = useState();

    const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);

    const handleSubmit = () => {
        console.log('Pedido enviado');
        setIsOrderSubmitted(true);
    };

    // Para el precio total
    const totalPrice = (quantity * props.food.price).toFixed(2);

    // Maneja el cambio en la cantidad
    // const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const newQuantity = Math.max(1, parseInt(event.target.value) || 1); // Al menos 1
    // setQuantity(newQuantity);
    // props.onQuantityUpdated(props.food.id, newQuantity);
    // };


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
            //   onChange={handleQuantityChange}
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
    
          <div className="order-buttons">
            <button className="submit-button" onClick={handleSubmit}>Enviar Pedido</button>
            <button className="return-button" onClick={props.onReturnToMenu}>Volver al menú</button>
          </div>
    
          {isOrderSubmitted && (
            <p className="confirmation-message">
                SU PEDIDO HA SIDO ENVIADO CORRECTAMENTE.
            </p>
        )}
        </div>
    );
}
  
  export default FoodOrder;