import { Middleware, ThunkDispatch, Action } from "@reduxjs/toolkit";
import { RootState } from "../types";
import { fetchNewTime } from "./timeSlice";

const retryMiddleware: Middleware<
 {},
 RootState,
 ThunkDispatch<RootState, unknown, Action<string>>
> = (storeAPI) => (next) => async (action) => {
 if (fetchNewTime.rejected.match(action)) {
 console.warn("⚠ Fallo en llamada a API! Reintentando en 1 segundo...");
 await new Promise((resolve) => setTimeout(resolve, 1000));
 storeAPI.dispatch(fetchNewTime());
 }
 return next(action);
};
export default retryMiddleware;