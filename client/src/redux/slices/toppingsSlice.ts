import { createSlice } from '@reduxjs/toolkit';
// import { SupplierType } from './suppliersSlice';

export interface ToppingType {
  id: number;
  name: string;
  price: string;
  pricingMeasurement: string;
  img: string;
  // supplier: SupplierType;
  // supplierId: number;
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
    storeToppings: (state, action) => {
      state.toppings = action.payload;
    },
  },
});

export const { storeToppings } = toppingsSlice.actions;
export default toppingsSlice.reducer;
