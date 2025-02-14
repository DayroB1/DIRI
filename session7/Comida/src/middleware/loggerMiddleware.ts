import { Middleware } from '@reduxjs/toolkit';

const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  console.log('✔ Acción despachada:', action);
  const result = next(action);
  console.log('🔵 Estado anterior:', store.getState());
  return result;
};

export default loggerMiddleware;