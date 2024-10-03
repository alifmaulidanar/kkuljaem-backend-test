// Fetch Pokemon list from the PokeAPI
export const fetchPokemonList = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon list');
  }
  return response.json();
};

// Fetch data from the PokeAPI
export const fetchPokemonDetail = async (id: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) throw new Error('Failed to fetch Pokémon data');
  return response.json();
};

// Fetch data from the PokeAPI for useQuery
export const fetchPokemonDetailQuery = async ({ queryKey }: { queryKey: string[] }) => {
  const [, id] = queryKey;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  return response.json();
};