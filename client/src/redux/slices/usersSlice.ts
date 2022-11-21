import { createSlice } from '@reduxjs/toolkit';

export interface UserType {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

interface InitState {
  users: UserType[];
  user: null | UserType;
}

const initialState: InitState = {
  users: [],
  user: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log('Seeting thi as user data:', action.payload);
      state.user = action.payload;
    },
  },
});

export const { setUser } = usersSlice.actions;
export default usersSlice.reducer;
