import { createSlice } from '@reduxjs/toolkit';

interface InitState {
  listType: 'pizza' | 'topping';
}

const initialState: InitState = {
  listType: 'topping',
};

export const SitesSlice = createSlice({
  name: 'Sites',
  initialState,
  reducers: {
    switchList: (state) => {
      if (state.listType === 'pizza') {
        state.listType = 'topping';
        return;
      }
      if (state.listType === 'topping') {
        state.listType = 'pizza';
        return;
      } 
      if (state.listType === null) {
        state.listType = 'topping';
        return;
      } 
    },
  },
});

export const { switchList } = SitesSlice.actions;
export default SitesSlice.reducer;
