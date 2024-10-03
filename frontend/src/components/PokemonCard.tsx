import React from 'react';

interface PokemonCardProps {
  name: string;
  id: number;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, id }) => {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-center">
      {/* Gambar Pokémon */}
      <img
        src={imageUrl}
        alt={name}
        className="w-20 h-20 mx-auto mb-2 object-contain"
      />
      {/* Nama Pokémon */}
      <p className="text-xl font-semibold capitalize">{name}</p>
    </div>
  );
};

export default PokemonCard;
