import Profile from "./Profile";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPokemonList } from "@/api/pokemonAPI";
import PokemonCard from '../components/PokemonCard';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbPage, BreadcrumbList } from '../components/ui/breadcrumb';

interface Pokemon {
  name: string;
  url: string;
}

function PokemonList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { data, error, isLoading } = useQuery({
    queryKey: ['pokemonList'],
    queryFn: fetchPokemonList,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error fetching Pokémon list: {error.message}</div>;

  // Filter Pokemon based on search query
  const filteredPokemon = data.results.filter((pokemon: Pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-10 px-8 lg:px-16 xl:px-60 bg-gradient-to-b from-blue-100 via-blue-300 to-blue-500 min-h-screen">
      <div className="flex justify-between items-center mb-8 w-full">
        <div className="flex justify-center ml-6 flex-grow">
          {/* Tabs */}
          <Tabs defaultValue="pokemon-list" className="w-fit">
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
          <Profile />
        </div>
      </div>

      {/* Title Page */}
      <h1 className="text-3xl font-bold text-center mb-6">Pokémon List</h1>

      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Pokémon List</BreadcrumbPage>
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
        {filteredPokemon.map((pokemon: Pokemon) => {
          const pokemonId = parseInt(pokemon.url.split('/').filter(Boolean).pop() || '');
          return (
            <Link key={pokemonId} to={`/pokemon/${pokemonId}`}>
              <PokemonCard name={pokemon.name} id={pokemonId} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default PokemonList;
