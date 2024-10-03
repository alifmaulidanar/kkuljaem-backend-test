import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';
import { fetchPokemonDetail } from '@/api/pokemonAPI';
import { typeStyles } from '@/components/custom/typeStyles';
import { fetchMyPokemonDetailBackend } from '@/api/backendAPI';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { AlertDialog, AlertDialogAction, AlertDialogContent,AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface PokemonData {
  types: { type: { name: string } }[];
  height: number;
  weight: number;
  base_experience: number;
  moves: { move: { name: string } }[];
}

const MyPokemonDetail = () => {
  const { id } = useParams();
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isReleaseDialogOpen, setIsReleaseDialogOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [pokeAPIData, setPokeAPIData] = useState<PokemonData | null>(null);

  // UseQuery to fetch Pokémon data from the backend
  const { data: pokemon, isLoading, isError, refetch } = useQuery({
    queryKey: ['myPokemon', id],
    queryFn: fetchMyPokemonDetailBackend,
  });

  useEffect(() => {
    if (pokemon) {
      fetchPokemonDetail(pokemon.pokemon_id)
        .then(setPokeAPIData)
        .catch((err) => console.error('Error fetching PokeAPI data:', err));
    }
  }, [pokemon]);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !pokemon) return <div>Error loading Pokémon data...</div>;

  const primaryType = pokeAPIData?.types[0].type.name;
  const typeStyle = primaryType ? typeStyles[primaryType] : typeStyles['normal'];
  const { originalName, nickname, pokemon_id } = pokemon;
  const pokeHeight = pokeAPIData?.height || 0;
  const pokeWeight = pokeAPIData?.weight || 0;
  const pokeBaseExperience = pokeAPIData?.base_experience
  const types = pokeAPIData?.types[0].type.name || [];
  const moves = pokeAPIData?.moves?.map((move: { move: { name: string } }) => move.move.name).slice(0, 5).join(", ") || "N/A";

  // Handle Rename Pokémon
  const handleRenamePokemon = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/my-pokemon/rename/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();

      if (data.success) {
        setFeedbackMessage(`Pokémon renamed to ${data.newName}`);
        refetch();
        setIsRenameDialogOpen(false);
        setIsFeedbackOpen(true);
      } else {
        setFeedbackMessage('Rename failed');
        setIsFeedbackOpen(true);
      }
    } catch (error) {
      console.error('Error renaming Pokémon:', error);
    }
  };

  // Handle Release Pokémon
  const handleReleasePokemon = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/my-pokemon/release/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setFeedbackMessage(`Pokémon released: ${data.message}`);
        setIsReleaseDialogOpen(false);
        setIsFeedbackOpen(true);
      } else {
        setFeedbackMessage(`Release failed: ${data.message}`);
        setIsFeedbackOpen(true);
      }
    } catch (error) {
      console.error('Error releasing Pokémon:', error);
    }
  };

  return (
    <div className={`${typeStyle.background} py-10 px-8 lg:px-16 xl:px-60 min-h-screen max-h-screen`}>
      {/* Page Title */}
      <h1 className={`text-3xl font-bold text-center mb-6 ${typeStyle.textColor}`}>Pokémon Detail</h1>

      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/my-pokemon">My Pokémon List</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <span className="capitalize">{originalName}</span>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center mt-6 capitalize">
        {nickname} <br /><span className='text-lg capitalize'>({pokemon.originalName})</span>
      </h1>

      {/* Pokémon Image */}
      <div className="flex justify-center">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon_id}.png`}
          alt={nickname || originalName}
          className="w-40 h-40 object-cover"
        />
      </div>

      {/* Pokémon Details */}
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Information</h2>
        <ul className="grid grid-cols-2 gap-4">
          <li className="flex flex-col">
            <p className="font-semibold">Caught At</p>
            <p>{pokemon.caught_at ? new Date(pokemon.caught_at).toLocaleDateString() : 'N/A'}</p>
          </li>
          <li className="flex flex-col">
            <p className="font-semibold">Rename Count</p>
            <p>{pokemon.rename_count !== undefined ? pokemon.rename_count : 'N/A'}</p>
          </li>
          <li className="flex flex-col">
            <p className="font-semibold">Height</p>
            <p>{pokeHeight ? `${pokeHeight}m` : 'N/A'}</p>
          </li>
          <li className="flex flex-col">
            <p className="font-semibold">Weight</p>
            <p>{pokeWeight ? `${pokeWeight}kg` : 'N/A'}</p>
          </li>
          <li className="flex flex-col">
            <p className="font-semibold">Base XP</p>
            <p>{pokeBaseExperience || 'N/A'}</p>
          </li>
          <li className="flex flex-col">
            <p className="font-semibold">Types</p>
            <p className='capitalize'>{types || 'N/A'}</p>
          </li>
          <li className="flex flex-col col-span-2">
            <p className="font-semibold">Moves</p>
            <p className='capitalize'>{moves || 'N/A'}</p>
          </li>
        </ul>
      </div>

      {/* Buttons for Rename and Release */}
      <div className="flex justify-center space-x-4 mt-10">
        <Button
          className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 ease-in-out px-6 py-3 rounded-full shadow-md"
          onClick={() => setIsRenameDialogOpen(true)}
        >
          Rename
        </Button>
        <Button
          className="bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 ease-in-out px-6 py-3 rounded-full shadow-md"
          onClick={() => setIsReleaseDialogOpen(true)}
        >
          Release
        </Button>
      </div>

      {/* Rename Dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Pokémon</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p>Are you sure you want to rename this Pokémon? The new nickname will be based on Fibonacci sequence.</p>
            <Button className="mt-4" onClick={handleRenamePokemon}>
              Confirm Rename
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Release Dialog */}
      <Dialog open={isReleaseDialogOpen} onOpenChange={setIsReleaseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Release Pokémon</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p>Are you sure you want to release this Pokémon? It will only be released if a prime number is generated.</p>
            <Button className="mt-4" onClick={handleReleasePokemon}>
              Confirm Release
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Feedback Dialog */}
      <AlertDialog open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Action Result</AlertDialogTitle>
            <AlertDialogDescription>
              {feedbackMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsFeedbackOpen(false)}>
              Ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyPokemonDetail;
