// zhennova-ecommerce-client/src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import productsReducer from './productsSlice'; // 👈 IMPORTANTE

export const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer, // 👈 Añadimos el nuevo reducer
  },
});