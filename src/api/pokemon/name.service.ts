import { PokemonSchema } from "../../schemas/pokemonSchema";
import { Pokemon } from "../../types/pokemon/pokemon.types";

const environment = "https://pokeapi.co/api/v2/";
const endpoint = (name: string) => `pokemon/${name}`;

type Response = {
  pokemonData: Pokemon;
};

export const fetchPokemonData = async (name: string): Promise<Response> => {
  const response = await fetch(`${environment}${endpoint(name)}`);
  const pokemonData: Pokemon = await response.json();
  const validatedPokemon = PokemonSchema.parse(pokemonData);

  return { pokemonData: validatedPokemon };
};
