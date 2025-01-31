import { MouseEventHandler, useState } from "react";
import { MenuItem } from "./entities/entities";
//import { foodItemsContext } from "./App";
import logger from "./services/logging";
import { deleteOrderFromFirebase, saveOrderToFirebase, updateOrderToFirebase } from "./services/orderService";


interface FoodOrderProps {
    food: MenuItem;
    //Se comenta onQuantityUpdated y todos los sitios donde se usa para cambiar el props drilling por el context
    //onQuantityUpdated(id: number, quantity: number): void;
    onReturnToMenu: MouseEventHandler<HTMLButtonElement> | undefined;
}

function FoodOrder(props: FoodOrderProps) {
    const [quantity, setQuantity] = useState<number>(1);
    const [customerName, setCustomerName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    //const [quantity, setQuantity] = useState("");
    const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    //Estados para Firebase 
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [orderId, setOrderId] = useState<string | null>(null);


    //Uso del contexto
    //const menuItems = useContext(foodItemsContext);

    // Para el precio total
    const totalPrice = (Number(quantity) * props.food.price).toFixed(2);
    //const totalPrice = (quantity * props.food.price).toFixed(2);


    // Maneja el cambio en el precio total dependiendo de la cantidad
    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, parseInt(event.target.value) || 1); // Al menos 1
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

    const handleSubmit = async () => {
        if (quantity > props.food.quantity) {
          logger.warn(`Intento de pedido excede el inventario: ${props.food.name}`);
          setErrorMessage("No hay inventario suficiente.");
          return;
        }

        if (!customerName.trim() || !phone.trim()) {
          setErrorMessage("Por favor, ingresa tu nombre y teléfono.");
          return;
      }
    
        setIsSaving(true);
        setSuccessMessage(null);
        setErrorMessage(null);


        
        // Es para actualizar la cantidad disponible en App.tsx (vista inicial)
        //props.onQuantityUpdated(props.food.id, quantity);

        
        // Actualizar la cantidad en el contexto global
      //   menuItems.map((item) => {
      //   if (item.id === props.food.id) {
      //     item.quantity -= quantity;
      //   }
      //   return item;
      // });
      //   logger.info(`Pedido enviado: ${quantity} x ${props.food.name}`);
      //   setIsOrderSubmitted(true); 

      const order = {
        foodName: props.food.name,
        quantity,
        totalPrice: Number(quantity) * props.food.price,
        customerName,
        phone,
        timestamp: new Date().toISOString(),
    };
    
    try {
      const newOrderId = await saveOrderToFirebase(order);
      logger.info(`Pedido enviado: ${quantity} x ${props.food.name} por ${customerName}`);
      setOrderId(newOrderId)
      setSuccessMessage("¡Pedido guardado exitosamente!");
      setIsOrderSubmitted(true);
      } catch (error) {
      setErrorMessage("Error al guardar el pedido. Inténtalo de nuevo.");
      } finally {
      setIsSaving(false);
      }
      };


      // Modificar el pedido en Firebase
    const handleUpdateOrder = async () => {
      if (!orderId) {
          setErrorMessage("No se puede modificar un pedido inexistente.");
          return;
      }

      setIsSaving(true);
      setSuccessMessage(null);
      setErrorMessage(null);

      const updatedOrder = {
          quantity,
          totalPrice: Number(quantity) * props.food.price,
          customerName,
          phone,
      };

      try {
          await updateOrderToFirebase(orderId, updatedOrder);
          logger.info(`Pedido actualizado: ${quantity} x ${props.food.name} por ${customerName}`);
          setSuccessMessage("¡Pedido modificado exitosamente!");
      } catch (error) {
          setErrorMessage("Error al modificar el pedido.");
      } finally {
          setIsSaving(false);
      }
  };


  // Eliminar el pedido en Firebase
  const handleDeleteOrder = async () => {
    if (!orderId) {
        setErrorMessage("No se puede eliminar un pedido inexistente.");
        return;
    }

    setIsSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
        await deleteOrderFromFirebase(orderId);
        logger.warn(`Pedido eliminado: ${props.food.name} - ${customerName}`);
        setSuccessMessage("Pedido eliminado correctamente.");
        setOrderId(null); // Resetear el ID después de eliminar
    } catch (error) {
        setErrorMessage("Error al eliminar el pedido.");
    } finally {
        setIsSaving(false);
    }
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
            {/* <input
              type="text"
              placeholder="Tu nombre"
              className="order-name"
            />
    
            <input
              type="tel"
              placeholder="Tu teléfono"
              className="order-phone"
            /> */}
          </div>
          {errorMessage && (
            <p className="error-message" style={{ color: "red" }}>
            {errorMessage}
            </p>
           )}

          {isSaving && <p style={{ color: "blue" }}>Guardando pedido...</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    
          {/* <div className="order-buttons">
            <button className="submit-button" onClick={handleSubmit}>Enviar Pedido</button>
            <button className="return-button" onClick={props.onReturnToMenu}>Volver al menú</button>
          </div> */}
          <div className="order-buttons">
                {!isOrderSubmitted ? (
                    <button className="submit-button" onClick={handleSubmit}>Enviar Pedido</button>
                ) : (
                    <>
                        <button className="update-button" onClick={handleUpdateOrder}>Modificar Pedido</button>
                        <button className="delete-button" onClick={handleDeleteOrder}>Eliminar Pedido</button>
                    </>
                )}
                <button className="return-button" onClick={props.onReturnToMenu}>Volver al menú</button>
            </div>
    
          {isOrderSubmitted && !errorMessage && (
            <p className="confirmation-message">
                SU PEDIDO HA SIDO ENVIADO CORRECTAMENTE.
            </p>
        )}

        
        {/* {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} */}

        </div>

        
    );
}
  
  export default FoodOrder;
