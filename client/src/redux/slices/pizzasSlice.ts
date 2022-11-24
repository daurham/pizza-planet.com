import { createSlice } from '@reduxjs/toolkit';

export interface PizzaType {
  id: number;
  name: string;
  // createdBy: string;
  // staffId: number;
  popularity: number;
  price: string;
  calories: number;
  instructions: string;
  notes: string;
  img: string;
  toppings: string;
}

interface InitState {
  pizzas: PizzaType[];
}

const initialState: InitState = {
  pizzas: [],
};

export const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    storePizzas: (state, action) => {
      state.pizzas = action.payload;
    },
  },
});

export const { storePizzas } = pizzaSlice.actions;
export default pizzaSlice.reducer;
