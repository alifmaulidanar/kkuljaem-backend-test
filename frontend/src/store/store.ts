import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../features/pokemonSlice';
import userReducer from '../features/userSlice';

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
