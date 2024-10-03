import express from "express";
const router = express.Router();

// Get all pokemons with pagination
router.get("/all", async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await response.json();
    res.json({
      total: data.count,
      found: limit,
      results: data.results,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Pokémon list" });
  }
});

// Get pokemon details by ID or name
router.get("/detail/:idname", async (req, res) => {
  const pokemonId = req.params.idname;
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Pokémon details" });
  }
});

export default router;
