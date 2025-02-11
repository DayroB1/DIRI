import { AnyAction, configureStore, EnhancedStore, ThunkDispatch } from '@reduxjs/toolkit';
//import timeReducer from './timeSlice';
import loggerMiddleware from './loggerMiddleware';
import { rootReducer, RootState } from '../types';
import retryMiddleware from './retryMiddleware';

//Antes de Enhanced Store (hace uso de petición, mejor compatibilidad con typescript)
// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware)
// });
const store : EnhancedStore<RootState>=configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(loggerMiddleware, retryMiddleware),
})

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction> & typeof store.dispatch;

export default store;