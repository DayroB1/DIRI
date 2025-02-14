import { MouseEventHandler, useState } from "react";
import { MenuItem } from "./entities/entities";
import { useDispatch } from "react-redux";
import { addOrder } from "./features/orderSlice";
import { AppDispatch } from "./features/store";

interface FoodOrderProps {
  food: MenuItem;
  onReturnToMenu: MouseEventHandler<HTMLButtonElement> | undefined;
  onMenuItemQuantityUpdate: (itemId: number, quantity: number) => void;
}

function FoodOrder({ food, onReturnToMenu, onMenuItemQuantityUpdate }: FoodOrderProps) {
  const dispatch:AppDispatch = useDispatch();
  const [quantity, setQuantity] = useState<number>(1);
  const [customerName, setCustomerName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const totalPrice = (Number(quantity) * food.price).toFixed(2);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, parseInt(event.target.value) || 1);
    setQuantity(newQuantity);
    setErrorMessage(null);
  };

  // Maneja el cambio en el nombre del cliente
  const handleCustomerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerName(event.target.value);
};

// Maneja el cambio en el teléfono del cliente
const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
};

  const handleSubmit = () => {
    if (quantity > food.quantity) {
      setErrorMessage("No hay inventario suficiente.");
      return;
    }

    if (!customerName || !phone) {
      setErrorMessage("Por favor, ingresa tu nombre y teléfono.");
      return;
    }

    onMenuItemQuantityUpdate(food.id, food.quantity - quantity);

    const order = {
      item: food.name,
      quantity,
      price: food.price * quantity,
      customerName,
      phone
    };
    dispatch(addOrder(order));

    setIsOrderSubmitted(true);
  };

  return (
    <div className="food-order-card">
      <h4>{food.desc}</h4>
      <p className="price">{totalPrice}€</p>

      <div className="order-controls">
        <label htmlFor="quantity">Cantidad</label>
        <input
          id="quantity"
          type="number"
          value={quantity}
          min="1"
          onChange={handleQuantityChange}
        /><br/>

        <label htmlFor="customerName">Nombre</label>
            <input
               id="customerName"
               type="text"
               placeholder="Tu nombre"
               className="order-name"
               value={customerName}
               onChange={handleCustomerNameChange}
            /> <br/>

        <label htmlFor="phone">Teléfono</label>
            <input
               id="phone" 
               type="tel"
               placeholder="Tu teléfono"
               className="order-phone"
               value={phone}
               onChange={handlePhoneChange}
             />
            </div>
      {errorMessage && (
        <p className="error-message" style={{ color: "red" }}>
          {errorMessage}
        </p>
      )}

      <div className="order-buttons">
        <button className="submit-button" onClick={handleSubmit}>Enviar Pedido</button>
        <button className="return-button" onClick={onReturnToMenu}>Volver al menú</button>
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