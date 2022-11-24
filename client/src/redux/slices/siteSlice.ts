import { createSlice } from '@reduxjs/toolkit';

interface InitState {
  listType: 'pizza' | 'topping';
}

const initialState: InitState = {
  listType: 'pizza',
};

export const sitesSlice = createSlice({
  name: 'Sites',
  initialState,
  reducers: {
    switchList: (state) => {
      if (state.listType === 'pizza') {
        state.listType = 'topping';
        return;
        // return 'topping';
      }
      if (state.listType === 'topping') {
        state.listType = 'pizza';
        // return 'pizza';
      }
    },
    setList: (state, action) => {
      state.listType = action.payload;
    },
  },
});

export const { switchList, setList } = sitesSlice.actions;
export default sitesSlice.reducer;
