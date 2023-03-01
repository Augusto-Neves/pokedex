import axios, { AxiosResponse } from "axios";

interface PokemonInterface {
  name: string;
  url: string;
}

interface PokemonsWithNameAndUrlResponse {
  results: [PokemonInterface];
}

interface allPokemonsInterface {
  id: number;
  name: string;
  height: string;
  baseExperience: number;
  stats: any[];
  types: any[];
  moves: any[];
  sprite: string;
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
    console.error(error);
  }
}
