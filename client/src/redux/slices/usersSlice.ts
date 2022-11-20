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
    addUser: (state, action) => {
      // state.array.push(action.payload);
      // Sign up
    },
    checkUserAuthorization: (state, action) => {},
    updateUser: (state, action) => {},
    setUser: (state, action) => {
      // state.user = action.payload;
    },
    getUser: (state, action) => {
    //   console.log('Got User', state.array, action.payload);
    //   console.log(state.array);
    //   state.array.map((a) => console.log(a));
    },
  },
});

export const { addUser, setUser, updateUser, getUser } = usersSlice.actions;
export default usersSlice.reducer;
