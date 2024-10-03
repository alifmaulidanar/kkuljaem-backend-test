import db from "../config/database.js";

export async function getPokemonData(pokemonId) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const data = await response.json();
  return {
    name: data.name,
    id: data.id,
    types: data.types.map((typeInfo) => typeInfo.type.name),
    image: data.sprites.front_default,
    abilities: data.abilities.map((abilityInfo) => abilityInfo.ability.name),
  };
}

// Get All Caught Pokemons by User
export const getAllCaughtPokemonsByUser = async (userId) => {
  return db.query(
    "SELECT * FROM pokemon WHERE user_id = ? AND is_released = FALSE",
    [userId]
  );
};

// Get Pokémon by ID
export const getPokemonById = async (pokemonId) => {
  return db.query(
    "SELECT * FROM pokemon WHERE pokemon_id = ? AND is_released = FALSE",
    [pokemonId]
  );
};

// Get Pokémon by ID and User
export const getPokemonByIdUser = async (userId, pokemonId) => {
  return db.query(
    "SELECT * FROM pokemon WHERE user_id = ? AND pokemon_id = ? AND is_released = FALSE",
    [userId, pokemonId]
  );
};

// Catch a Pokémon (50% probability)
export const insertCaughtPokemon = async (userId, pokemonId, originalName) => {
  return db.query(
    `INSERT INTO pokemon (user_id, pokemon_id, originalName, rename_count, is_released) VALUES (?, ?, ?, 0, FALSE)`,
    [userId, pokemonId, originalName]
  );
};

// Set Initial Name after Catching Pokémon
export const updateInitialAndNickname = async (userId, pokemonId, nickname) => {
  return db.query(
    `UPDATE pokemon SET initialName = ?, nickname = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ? AND pokemon_id = ?`,
    [nickname, nickname, userId, pokemonId]
  );
};

// Rename Pokémon with Fibonacci
export const updateNicknameWithFibonacci = async (userId, pokemonId, newNickname) => {
  return db.query(
    `UPDATE pokemon SET nickname = ?, rename_count = rename_count + 1, updated_at = CURRENT_TIMESTAMP WHERE user_id = ? AND pokemon_id = ?`,
    [newNickname, userId, pokemonId]
  );
};

// Release Pokémon if Generated Number is Prime
export const releasePokemon = async (userId, pokemonId) => {
  return db.query(
    `UPDATE pokemon SET is_released = TRUE, released_at = NOW() WHERE user_id = ? AND pokemon_id = ? AND is_released = FALSE`,
    [userId, pokemonId]
  );
};
