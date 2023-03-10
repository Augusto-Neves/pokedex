import axios from "axios";

interface PokemonInterface {
  name: string;
  url: string;
}

interface PokemonsWithNameAndUrlResponse {
  results: [PokemonInterface];
}

export const server = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export async function getPokemonsWithLimit(limit: string) {
  try {
    let pokemons: any[];
    let pokemonsEndPoints: string[] = [];

    const response = await server.get(`/pokemon?limit=${limit}`);

    const pokemonsWithNameAndUrl =
      response.data as PokemonsWithNameAndUrlResponse;

    pokemonsWithNameAndUrl.results.forEach((pokemon) => {
      pokemonsEndPoints.push(pokemon.url);
    });

    const allPokemons = await axios.all(
      pokemonsEndPoints.map(async (endPoint) => {
        const response = await axios.get(endPoint);
        return response.data;
      })
    );

    pokemons = allPokemons;

    return pokemons;
  } catch (error) {
    console.log(error);
  }
}

export async function searchPokemon(typedValue: string) {
  try {
    let pokemons: any[];
    const pokemonSearchResult = await server.get(`/pokemon/${typedValue}`);

    pokemons = pokemonSearchResult.data;

    return pokemons;
  } catch (error) {
    console.log(error);
  }
}
