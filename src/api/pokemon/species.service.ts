import { SpeciesSchema } from "../../schemas/speciesSchema";

export const fetchPokemonSpecies = async (speciesUrl: RequestInfo | URL) => {
  const response = await fetch(speciesUrl);
  const speciesData = await response.json();
  const validatedPokemon = SpeciesSchema.parse(speciesData);

  return { speciesData: validatedPokemon };
};
