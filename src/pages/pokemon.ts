import { fetchPokemonData } from "../api/pokemon/name.service";
import { fetchPokemonSpecies } from "../api/pokemon/species.service";

export const displayPokemon = async (pokemonName: string) => {
  const { pokemonData } = await fetchPokemonData(pokemonName);
  const { name, height, weight, sprites, stats, species } = pokemonData;

  const { speciesData } = await fetchPokemonSpecies(species.url);

  const flavorTextEntry =
    speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "en" && entry.version.name === "ruby"
    ) ||
    speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
  const description = flavorTextEntry
    ? flavorTextEntry.flavor_text.replace(/[\n\f]/g, " ")
    : "No description available.";

  const pokemonImage = sprites.front_default
    ? `<img class="w-40 h-40" src="${sprites.front_default}" alt="${name}" />`
    : '<div class="text-gray-500">No Image Available</div>';

  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
        <div class="max-w-4xl mx-auto p-5">
          <h1 class="text-3xl font-bold text-center mb-8">PokeApi Test with Vite & TypeScript</h1>

          <!-- Input for new Pokemon search -->
          <div class="text-center mb-8">
            <input type="text" id="pokemonInput" class="border-2 border-gray-300 rounded-md p-2 mr-2" placeholder="Enter Pokemon Name">
            <button id="fetchButton" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 md:mt-0">Fetch Pokemon</button>
          </div>

          <div class="card bg-white rounded-lg overflow-hidden shadow-lg p-5">
            <div class="flex flex-col md:flex-row">
              <div class=" self-align-center flex justify-content-center">${pokemonImage}</div>
              <div class="flex-1 md:ml-4">
                <h2 class="text-2xl font-semibold capitalize">${name}</h2>
                <p class="text-md">Height: ${height}</p>
                <p class="text-md">Weight: ${weight}</p>
                <p class="text-md mt-4 md:mt-2 font-bold">Description: </p> <span>${description}</span>
              </div>
            </div>
            <h2 class="text-2xl font-semibold text-center mt-8 mb-4">Stats:</h2>
            <div class="flex flex-wrap justify-center">
              ${stats
                .map(
                  (stat) =>
                    `<p class="w-1/2 md:w-1/4 p-2 text-center">${stat.stat.name}: ${stat.base_stat}</p>`
                )
                .join("")}
            </div>
          </div>
        </div>
      `;
};

document.addEventListener("click", (event) => {
  if (event.target && event.target.id === "fetchButton") {
    const pokemonName = document
      .querySelector<HTMLInputElement>("#pokemonInput")!
      .value.trim();
    if (pokemonName) {
      displayPokemon(pokemonName);
    } else {
      alert("Please enter a Pokemon name.");
    }
  }
});
