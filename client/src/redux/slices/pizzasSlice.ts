import { createSlice } from "@reduxjs/toolkit";

export interface PizzaType {
  id: number;
  name: string;
  createdBy: string;
  staffId: number;
  popularity?: number;
  price?: string;
  calories?: number;
  instructions?: string;
  notes?: string;
  img?: string;
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
    addPizza: (state, action) => {
      const newPizza: any = action.payload;
      // Assume! This is for when I validate a pizzas uniqueness, post to db, THEN get pizzas, 
      //  --I'll add to here.
      state.pizzas = [ newPizza, ...state.pizzas];
    },
    removePizza: (state, action) => {
      // ASSUME, I'll remove the pizzas via request first, THEN invoke this fn to ?? 
      // Not 100% wat makes the most since
      // ELSE, Why not JUS use "update pizza"

      // invoke a remove function passed in
      action.payload.removeFromDB(); // already has the id inside from component
      // let filteredPizza = state.pizzas.filter((m) => m.title !== action.payload);
      // state.pizzas = filteredpizza;
    },
    updatePizza: (state, action) => {
      // const p = action.payload.pizza;
      // let movie = state.pizzas.filter((m) => m.title === action.payload)[0]
      // movie.hasWatched = !movie.hasWatched;
    },
    getPizza: (state, action) => {

    },

  },
});

export const { addPizza, removePizza, updatePizza, getPizza } = pizzaSlice.actions;
export default pizzaSlice.reducer;