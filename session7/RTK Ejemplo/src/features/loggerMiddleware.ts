import { Middleware } from '@reduxjs/toolkit';

const loggerMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  console.log('✔ Acción despachada:', action);
  console.log('🔵 Estado anterior:', storeAPI.getState());

  // Pasa la acción al siguiente middleware o al reducer
  const result = next(action);

  console.log('🟢 Nuevo estado:', storeAPI.getState());

  return result;
};

export default loggerMiddleware;