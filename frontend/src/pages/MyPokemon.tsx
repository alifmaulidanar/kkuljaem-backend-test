import Profile from './Profile';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PokemonCard from '../components/PokemonCard';
import { Tabs,TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthRedirect } from '@/components/hooks/authRedirect';
import { Breadcrumb, BreadcrumbItem, BreadcrumbPage, BreadcrumbList } from '../components/ui/breadcrumb';

// Fetch caught Pokemon from backend
const fetchCaughtPokemons = async () => {
  const response = await fetch('http://localhost:8080/api/my-pokemon/all', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch caught Pokémon');
  return response.json();
};

const MyPokemon = () => {
  useAuthRedirect();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const token = localStorage.getItem('token');

  // Fetch caught Pokémon data using useQuery
  const { data, error, isLoading } = useQuery({
    queryKey: ['caughtPokemons'],
    queryFn: fetchCaughtPokemons,
    enabled: !!token,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error fetching caught Pokémon: {error.message}</div>;
  if (!data) return null;

  // Filter Pokemon based on search query
  const filteredPokemon = data?.filter((pokemon: { nickname: string, originalName: string }) =>
    pokemon.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pokemon.originalName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-10 px-8 lg:px-16 xl:px-60 bg-gradient-to-b from-red-100 via-red-300 to-red-500 min-h-screen">
      <div className="flex justify-between items-center mb-8 w-full">
        {/* Tabs */}
        <div className="flex justify-center ml-6 flex-grow">
          <Tabs defaultValue="my-pokemon" className="w-fit">
            <TabsList className="flex justify-center">
              <TabsTrigger
                value="pokemon-list"
                onClick={() => navigate('/')}
              >
                Pokémon List
              </TabsTrigger>
              <TabsTrigger
                value="my-pokemon"
                onClick={() => navigate('/my-pokemon')}
              >
                My Pokémon
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Profile */}
        <div className="flex items-center justify-end w-fit">
          <Profile/>
        </div>
      </div>
      
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-6">My Pokémon</h1>

      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>My Pokémon List</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Search Bar */}
      <div className="my-6 flex justify-center">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg shadow-md"
        />
      </div>

      {/* Pokemon Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
        {filteredPokemon.map((pokemon: { id: number, nickname: string, originalName: string, pokemon_id: number }) => (
          <Link key={pokemon.id} to={`/my-pokemon/${pokemon.pokemon_id}`}>
            <PokemonCard 
              name={pokemon.nickname} 
              id={pokemon.pokemon_id} 
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MyPokemon;
