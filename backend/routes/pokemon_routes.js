import express from "express";
import { fibonacci, isPrime } from "../utils/mathUtils.js";
import {
  getPokemonData,
  getAllCaughtPokemonsByUser,
  getPokemonById,
  getPokemonByIdUser,
  insertCaughtPokemon,
  updateInitialAndNickname,
  updateNicknameWithFibonacci,
  releasePokemon,
} from "../repository/pokemon_repository.js";

const router = express.Router();

// Get All Caught Pokemons by User
router.get("/all", async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await getAllCaughtPokemonsByUser(userId);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving caught Pokémon" });
  }
});

// Get Pokémon by ID
router.get("/detail/:id", async (req, res) => {
  const userId = req.user.id;
  const pokemonId = parseInt(req.params.id);
  try {
    const [rows] = await getPokemonByIdUser(userId, pokemonId);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Pokémon not found in your list" });
    }

    // Return the pokemon details
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving Pokémon details" });
  }
});

// Catch a pokemon (50% probability)
router.post("/catch/:id", async (req, res) => {
  const userId = req.user.id;
  const pokemonId = parseInt(req.params.id);
  const probability = Math.random();

  if (probability < 0.5) {
    const [existingPokemon] = await getPokemonById(pokemonId);

    if (existingPokemon.length > 0) {
      const isOwnedBySameUser = existingPokemon.some(
        (pokemon) => pokemon.user_id === req.user.id
      );

      if (isOwnedBySameUser) {
        return res.status(400).json({
          message: "You already have this Pokémon, and it has not been released yet.",
        });
      }
    }

    const pokemonData = await getPokemonData(pokemonId);

    try {
      await insertCaughtPokemon(userId, pokemonData.id, pokemonData.name);

      // Return the caught pokemon data
      res.json({
        success: true,
        message: "You caught the Pokémon! Please provide a nickname.",
        pokemon: pokemonData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error catching Pokémon" });
    }
  } else {
    res.json({ success: false, message: "The Pokémon escaped!" });
  }
});

// Set Initial Name after Catching Pokémon
router.post("/set-nickname/:id", async (req, res) => {
  const userId = req.user.id;
  const { nickname } = req.body;
  const pokemonId = parseInt(req.params.id);

  try {
    const [rows] = await getPokemonByIdUser(userId, pokemonId);

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Pokémon not found or already released. Catch the Pokémon first.",
      });
    }

    await updateInitialAndNickname(userId, pokemonId, nickname);

    // Return success message and pokemon data
    res.json({
      success: true,
      message: `Nickname set for Pokémon ${pokemonId}`,
      pokemon: rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error setting Pokémon nickname" });
  }
});

// Rename a pokemon with Fibonacci-based nickname
router.post("/rename/:id", async (req, res) => {
  const userId = req.user.id;
  const pokemonId = parseInt(req.params.id);

  try {
    const [rows] = await getPokemonByIdUser(userId, pokemonId);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Pokémon not found in your list or already released." });
    }

    const pokemon = rows[0];
    const fibonacciNumber = fibonacci(pokemon.rename_count);
    const newNickname = `${pokemon.initialName}-${fibonacciNumber}`;
    await updateNicknameWithFibonacci(userId, pokemonId, newNickname);

    res.json({ success: true, newName: newNickname });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error renaming Pokémon" });
  }
});

// Release Pokémon if Generated Number is Prime
router.post("/release/:id", async (req, res) => {
  const userId = req.user.id;
  const pokemonId = parseInt(req.params.id);

  try {
    const [rows] = await getPokemonByIdUser(userId, pokemonId);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Pokémon not found in your list" });
    }

    // Generate random number and check if it's prime
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const isPrimeNumber = isPrime(randomNumber);

    if (isPrimeNumber) {
      await releasePokemon(userId, pokemonId);

      // Return success message and pokemon data
      res.json({
        success: true,
        message: `Pokémon has been released. Generated number: ${randomNumber} is prime.`,
        pokemon: rows[0],
      });
    } else {
      res.json({
        success: false,
        message: `Release failed. Generated number: ${randomNumber} is not prime.`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error releasing Pokémon" });
  }
});

export default router;
