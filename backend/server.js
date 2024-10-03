import cors from "cors";
import express from "express";
import db from "./config/database.js";
import pokemonRoutes from "./routes/pokemon.js";
import userRoutes from "./routes/user_routes.js";
import { authMiddleware } from "./middleware/auth.js";
import myPokemonRoutes from "./routes/pokemon_routes.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to database: ", err);
  } else {
    console.log("Connected to database!");
  }
});

app.use("/user", userRoutes);
app.use("/api/pokemon", pokemonRoutes);
app.use("/api/my-pokemon", authMiddleware, myPokemonRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
