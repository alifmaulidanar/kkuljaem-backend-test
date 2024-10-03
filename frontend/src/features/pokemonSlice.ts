import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PokemonState {
  name: string;
  moves: string[];
}

const initialState: PokemonState = {
  name: '',
  moves: [],
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemon(state, action: PayloadAction<PokemonState>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
