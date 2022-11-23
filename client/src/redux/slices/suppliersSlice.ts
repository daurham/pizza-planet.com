import { createSlice } from '@reduxjs/toolkit';

export interface SupplierType {
  id: number;
  name: string;
  number: string;
  email: string;
  // Topping?: T
}

type InitSuppliers = {
  suppliers: SupplierType[];
};

const initialState: InitSuppliers = {
  suppliers: [],
};

export const suppliersSlice = createSlice({
  name: 'Suppliers',
  initialState,
  reducers: {
    addSupplier: (state, action) => {
      const newSupplier: any = action.payload;
      // Assume! This is for when I validate a Suppliers uniqueness, post to db, THEN get Suppliers,
      //  --I'll add to here.
      state.suppliers = [newSupplier, ...state.suppliers];
    },
    removeSupplier: (state, action) => {
      // ASSUME, I'll remove the suppliers via request first, THEN invoke this fn to ??
      // Not 100% wat makes the most since
      // ELSE, Why not JUS use "update Supplier"

      // invoke a remove function passed in
      action.payload.removeFromDB(); // already has the id inside from component
      // let filteredSupplier = state.suppliers.filter((m) => m.title !== action.payload);
      // state.suppliers = filteredSupplier;
    },
    updateSupplier: (state, action) => {
      const p = action.payload.Supplier;
      // let movie = state.suppliers.filter((m) => m.title === action.payload)[0]
      // movie.hasWatched = !movie.hasWatched;
    },
    getSupplier: (state, action) => {},
  },
});

export const { addSupplier, removeSupplier, updateSupplier, getSupplier } = suppliersSlice.actions;
export default suppliersSlice.reducer;
