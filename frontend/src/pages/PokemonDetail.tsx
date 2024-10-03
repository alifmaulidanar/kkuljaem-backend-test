/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';
import { fetchPokemonDetailQuery } from '@/api/pokemonAPI';
import { typeStyles } from '@/components/custom/typeStyles';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const PokemonDetail = () => {
  const { id } = useParams();
  const [nickname, setNickname] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const [isCatchSuccess, setIsCatchSuccess] = useState<boolean | null>(null);

  const { data: pokemon, isLoading, isError } = useQuery({
    queryKey: ['pokemon', String(id)],
    queryFn: fetchPokemonDetailQuery,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !pokemon) return <div>Error loading Pokémon data...</div>;

  const primaryType = pokemon.types[0].type.name;
  const typeStyle = typeStyles[primaryType] || typeStyles['normal'];

  // Catch Pokemon
  const handleCatch = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/my-pokemon/catch/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 401) {
        setIsUnauthorized(true);
        return;
      }
      const data = await response.json();

      if (data.success) {
        setIsCatchSuccess(true);
        setIsDialogOpen(true);
      } else {
        setIsCatchSuccess(false);
      }
    } catch (error) {
      console.error('Error catching Pokémon:', error);
      setIsCatchSuccess(false);
    }
  };

  // Save Pokemon nickname
  const handleSaveNickname = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/my-pokemon/set-nickname/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ nickname }),
      });
      const data = await response.json();

      if (data.success) {
        setIsDialogOpen(false);
        setIsFeedbackOpen(true);
      } else {
        console.error('Failed to save nickname:', data.message);
      }
    } catch (error) {
      console.error('Error setting Pokémon nickname:', error);
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
            <BreadcrumbLink href="/">Pokémon List</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <span className="capitalize">{pokemon.name}</span>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Title */}
      <h1 className={`text-3xl font-bold text-center mt-6 capitalize ${typeStyle.textColor}`}>
        {pokemon.name}
      </h1>

      {/* Pokémon Image */}
      <div className="flex justify-center">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-40 h-40 object-cover"
        />
      </div>

      {/* Pokemon Details */}
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Information</h2>
        <ul className="grid grid-cols-2 gap-4">
          <li className="flex flex-col">
            <p className="font-semibold">Height</p>
            <p>{pokemon.height}m</p>
          </li>
          <li className="flex flex-col">
            <p className="font-semibold">Weight</p>
            <p>{pokemon.weight}kg</p>
          </li>
          <li className="flex flex-col">
            <p className="font-semibold">Base XP</p>
            <p>{pokemon.base_experience}</p>
          </li>
          <li className="flex flex-col">
            <p className="font-semibold">Types</p>
            <p className='capitalize'>{pokemon.types.map((type: any) => type.type.name).join(", ")}</p>
          </li>
          <li className="flex flex-col col-span-2">
            <p className="font-semibold">Moves</p>
            <p className='capitalize'>{pokemon.moves.slice(0, 5).map((move: any) => move.move.name).join(", ")}</p>
          </li>
        </ul>
      </div>

      {/* Catch Button */}
      <div className="flex justify-center mt-10">
        <Button
          className={`${typeStyle.bgColor} ${typeStyle.hoverColor} text-white transition-colors duration-200 ease-in-out px-6 py-3 rounded-full shadow-md flex items-center`}
          onClick={handleCatch}
        >
          <span className="mr-2">{typeStyle.icon}</span> Catch Pokémon
        </Button>
      </div>

      {/* Dialog for Nickname Input */}
      <Dialog open={isCatchSuccess === true && isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success! Give your Pokémon a nickname</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Input
              placeholder="Enter nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <Button className="mt-4" onClick={handleSaveNickname}>
              Save Nickname
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Feedback after nickname is saved */}
      <AlertDialog open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Pokémon Saved!</AlertDialogTitle>
            <AlertDialogDescription>
              Your Pokémon <span className='capitalize'>{pokemon.name}</span> with nickname "{nickname}" has been saved successfully!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className="flex flex-col w-full space-y-3">
              <AlertDialogAction 
                className="bg-black text-white w-full px-6 py-2 rounded-md hover:bg-gray-800"
                onClick={() => {
                  setIsFeedbackOpen(false);
                  window.location.href = '/my-pokemon';
                }}
              >
                My Pokemons
              </AlertDialogAction>
              <AlertDialogAction 
                className="bg-white text-black border w-full px-6 py-2 rounded-md hover:bg-gray-200"
                onClick={() => setIsFeedbackOpen(false)}
              >
                Ok
              </AlertDialogAction>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Alert dialog if catching failed */}
      {isCatchSuccess === false && (
        <AlertDialog open={isCatchSuccess === false} onOpenChange={() => setIsCatchSuccess(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Failed!</AlertDialogTitle>
              <AlertDialogDescription>
                <span className='capitalize'>{pokemon.name}</span> escaped! Better luck next time.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setIsCatchSuccess(null)}>
                Try Again
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Unauthorized Alert Dialog */}
      <AlertDialog open={isUnauthorized} onOpenChange={setIsUnauthorized}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unauthorized</AlertDialogTitle>
            <AlertDialogDescription>
              You must be logged in to catch Pokémon. Please log in and try again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsUnauthorized(false)}>
              Ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PokemonDetail;
