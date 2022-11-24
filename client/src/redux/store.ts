// https://react-redux.js.org/using-react-redux/usage-with-typescript
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import pizzasReducer from './slices/pizzasSlice';
import userReducer from './slices/userSlice';
import toppingsReducer from './slices/toppingsSlice';
import siteReducer from './slices/siteSlice';

const combinedReducer = combineReducers({
  toppings: toppingsReducer,
  pizzas: pizzasReducer,
  user: userReducer,
  site: siteReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: combinedReducer,
});
