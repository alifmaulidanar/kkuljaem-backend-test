import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string;
  email: string;
  createdAt: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  username: '',
  email: '',
  createdAt: '',
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<Omit<UserState, 'isLoggedIn'>>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.createdAt = action.payload.createdAt;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.username = '';
      state.email = '';
      state.createdAt = '';
      state.isLoggedIn = false;
    },
  },
});

export const { setUserProfile, logout } = userSlice.actions;
export default userSlice.reducer;
