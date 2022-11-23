import { createSlice } from '@reduxjs/toolkit';

export interface UserType {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

interface InitState {
  user: null | UserType;
}

const initialState: InitState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logInUser: (state, action) => {
      // console.log('Seeting thi as user data:', action.payload);
      state.user = action.payload;
    },
    logOutUser: (state) => {
      state.user = null;
    },
  },
});

export const { logInUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;
