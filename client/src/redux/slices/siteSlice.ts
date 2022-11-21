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
        return;
        // return 'pizza';
      }
    },
  },
});

export const { switchList } = sitesSlice.actions;
export default sitesSlice.reducer;
