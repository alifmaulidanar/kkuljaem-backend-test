import { QueryFunctionContext } from '@tanstack/react-query';

// Fetch owned Pokemon details from backend
export const fetchMyPokemonDetailBackend = async ({ queryKey }: QueryFunctionContext) => {
  const [, id] = queryKey;
  const response = await fetch(`http://localhost:8080/api/my-pokemon/detail/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};
