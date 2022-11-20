// https://react-redux.js.org/using-react-redux/usage-with-typescript
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import pizzasReducer from './slices/pizzasSlice';
import usersReducer from './slices/usersSlice';
import suppliersReducer from './slices/suppliersSlice';
import toppingsReducer from './slices/toppingsSlice';
import siteReducer from './slices/siteSlice';

const combinedReducer = combineReducers({
  toppings: toppingsReducer,
  pizzas: pizzasReducer,
  users: usersReducer,
  suppliers: suppliersReducer,
  site: siteReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;

export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: combinedReducer,
});

