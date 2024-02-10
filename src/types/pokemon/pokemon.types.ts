import { z } from "zod";
import { PokemonSchema } from "../../schemas/pokemonSchema";

export type Pokemon = z.infer<typeof PokemonSchema>;