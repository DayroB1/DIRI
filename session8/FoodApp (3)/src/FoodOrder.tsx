import { MouseEventHandler, useState, useContext } from "react";
import { MenuItem } from "./entities/entities";
import logger from "./services/logging";
import { deleteOrderFromFirebase, saveOrderToFirebase, updateOrderToFirebase } from "./services/orderService";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import './styles.css'

interface FoodOrderProps {
    food: MenuItem;
    onReturnToMenu: MouseEventHandler<HTMLButtonElement> | undefined;
}

function FoodOrder(props: FoodOrderProps) {
    const { user } = useContext(AuthContext);
    const [quantity, setQuantity] = useState<number>(1);
    const [customerName, setCustomerName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [orderId, setOrderId] = useState<string | null>(null);
    const totalPrice = (Number(quantity) * props.food.price).toFixed(2);

    if (!user) {
        return <Navigate to="/FoodApp" replace />;
    }

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Math.max(1, parseInt(event.target.value) || 1);
        setQuantity(newQuantity);
        setErrorMessage(null);
    };

    const handleCustomerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerName(event.target.value);
    };

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
            setOrderId(newOrderId);
            setSuccessMessage("¡Pedido guardado exitosamente!");
            setIsOrderSubmitted(true);
        } catch (error) {
            setErrorMessage("Error al guardar el pedido. Inténtalo de nuevo.");
        } finally {
            setIsSaving(false);
        }
    };

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
            setOrderId(null);
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
                    className="order-q"
                /><br />

                <label htmlFor="customerName">Nombre</label>
                <input
                    id="customerName"
                    type="text"
                    placeholder="Tu nombre"
                    className="order-name"
                    value={customerName}
                    onChange={handleCustomerNameChange}
                /> <br />

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

            {isSaving && <p style={{ color: "blue" }}>Guardando pedido...</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

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
        </div>
    );
}

export default FoodOrder;