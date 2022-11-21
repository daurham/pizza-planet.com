import { createSlice } from '@reduxjs/toolkit';
import { SupplierType } from './suppliersSlice';

export interface ToppingType {
  id: number;
  name: string;
  price?: string;
  pricingMeasurement?: string;
  img?: string;
  supplier: SupplierType;
  supplierId: number;
}

interface InitState {
  toppings: ToppingType[];
}

const initialState: InitState = {
  toppings: [],
};

export const toppingsSlice = createSlice({
  name: 'toppings',
  initialState,
  reducers: {
    // addSupplier: (state, action) => {
    //   const newSupplier: any = action.payload;
    //   // Assume! This is for when I validate a toppings uniqueness, post to db, THEN get toppings,
    //   //  --I'll add to here.
    //   state.toppings = [newSupplier, ...state.toppings];
    // },
    // removeSupplier: (state, action) => {
    //   // ASSUME, I'll remove the toppings via request first, THEN invoke this fn to ??
    //   // Not 100% wat makes the most since
    //   // ELSE, Why not JUS use "update Supplier"
    //   // invoke a remove function passed in
    //   action.payload.removeFromDB(); // already has the id inside from component
    //   // let filteredSupplier = state.toppings.filter((m) => m.title !== action.payload);
    //   // state.toppings = filteredSupplier;
  },
});

// export const {} = toppingsSlice.actions;
export default toppingsSlice.reducer;
