import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { database } from "../services/firebaseConfig";
import { ref, push, get, remove, update } from "firebase/database";

interface Order {
  id?: string | null | undefined;
  item: string;
  quantity: number;
  price: number;
  customerName: string;
  phone: string;
}

interface OrdersState {
  orders: Order[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  status: "idle",
  error: null,
};

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const snapshot = await get(ref(database, "orders"));
  if (snapshot.exists()) {
    return Object.entries(snapshot.val()).map(([id, order]) => ({
      id,
      ...(order as Order),
    }));
  }
  return [];
});

export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async (order: Order) => {
    const orderRef = push(ref(database, "orders"), order);
    return { id: orderRef.key, ...order };
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id: string) => {
    await remove(ref(database, `orders/${id}`));
    return id;
  }
);

export const updateMenuItemQuantity = createAsyncThunk(
  "menuItems/updateQuantity",
  async ({ itemId, quantity }: { itemId: number; quantity: number }) => {
    try {
      await update(ref(database, `menuItems/${itemId}`), { quantity });
      return { itemId, quantity };
    } catch (error) {
      throw error;
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error al obtener pedidos";
      })
      .addCase(addOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.status = "succeeded";
        state.orders.push(action.payload);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error al agregar pedido";
      })
      .addCase(deleteOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteOrder.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = "succeeded";
        state.orders = state.orders.filter((order) => order.id !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error al eliminar pedido";
      })
      .addCase(updateMenuItemQuantity.fulfilled, (state, action) => {
        // No modifica el estado de orders aquí, ya que solo se actualiza el menú
      })
      .addCase(updateMenuItemQuantity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error al actualizar la cantidad del menú";
      });
  },
});

export default ordersSlice.reducer;