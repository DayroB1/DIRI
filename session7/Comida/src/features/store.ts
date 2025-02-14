import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "../features/orderSlice";
import loggerMiddleware from "../middleware/loggerMiddleware";

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;