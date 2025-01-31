import { ref, push, update, remove } from "firebase/database";
import { db } from "./firebaseConfig";
import logger from "./logging";

export interface Order {
  id?: string
  foodName: string;
  quantity: number;
  totalPrice: number;
  customerName: string;
  phone: string;
  timestamp: string;
}

export const saveOrderToFirebase = async (order: Order): Promise<string> => {
  try {
    logger.info(`Guardando pedido: ${JSON.stringify(order)}`);
    
    const ordersRef = ref(db, "orders");
    const newOrderRef = await push(ordersRef, order);
    
    logger.info(`Pedido guardado exitosamente en Firebase con ID: ${newOrderRef.key}`);

    return newOrderRef.key as string;
  } catch (error) {
    logger.error("Error al guardar el pedido en Firebase: " + error);
    throw error;
  }
};

export const updateOrderToFirebase = async (orderId:string, updatedOrder:Partial<Order>): Promise<void> => {
    try {
      logger.info(`Modificando pedido ${orderId}: ${JSON.stringify(updatedOrder)}`);
      
      const orderRef = ref(db, `orders/${orderId}`);
      await update (orderRef, updatedOrder);
      
      logger.info("Pedido modificado exitosamente en Firebase.");
    } catch (error) {
      logger.error(`Error al modificar el pedido ${orderId}: ${error}`);
      throw error;
    }
  };

  export const deleteOrderFromFirebase = async (orderId: string): Promise<void> => {
    try {
      logger.warn(`Eliminando pedido ${orderId}`);
      const orderRef = ref(db, `orders/${orderId}`);
      await remove(orderRef);
      logger.info("Pedido eliminado exitosamente.");
    } catch (error) {
      logger.error(`Error al eliminar el pedido ${orderId}: ${error}`);
      throw error;
    }
  };
