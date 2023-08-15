import axios from 'axios';

interface DefaultItems {
  name: string;
  url: string;
}

interface DefaultResponse {
  results: [DefaultItems];
}

export const server = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});

export async function getPokemonsWithLimit(limit: string) {
  try {
    let pokemons: any[];
    let pokemonsEndPoints: string[] = [];

    const response = await server.get(`/pokemon?limit=${limit}`);

    const pokemonsWithNameAndUrl = response.data as DefaultResponse;

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
    const pokemonSearchResult = await server.get(
      `/pokemon/${typedValue.toLowerCase()}`
    );

    pokemons = pokemonSearchResult.data;

    return pokemons;
  } catch (error) {
    console.log(error);
  }
}

export async function getFavoritePokemons(pokemonsIds: any[]) {
  try {
    let favoritesPokemons: any[];
    let favoritesPokemonsEndPoints: string[] = [];

    const sortedPokemonsId = [...pokemonsIds].sort((a, b) => a - b);

    sortedPokemonsId.forEach((id) => {
      const endPoint = `https://pokeapi.co/api/v2/pokemon/${id}`;
      favoritesPokemonsEndPoints?.push(endPoint);
    });

    const allFavoritePokemonsData = await axios.all(
      favoritesPokemonsEndPoints.map(async (endPoint) => {
        const response = await axios.get(endPoint);
        return response.data;
      })
    );

    favoritesPokemons = allFavoritePokemonsData;

    return favoritesPokemons;
  } catch (error) {
    console.log(error);
  }
}

export async function getPokemonsTypes() {
  try {
    let pokemonsTypes: string[] = [];

    const response = await server.get('/type');

    const allTypes = response.data as DefaultResponse;

    allTypes.results.forEach((type) => {
      pokemonsTypes.push(type.name.replace(/\b\w/g, match => match.toUpperCase()));
    });

    console.log(pokemonsTypes);
    
    return pokemonsTypes.sort((a, b) => a.localeCompare(b));
  } catch (error) {
    console.error(error);
  }
}

export async function getPokemonsGenerations() {
  try {
    let generations: string[] = [];

    const response = await server.get('/generation');

    const allGenerationsResponse = response.data as DefaultResponse;

    allGenerationsResponse.results.forEach((generation) => {
      return generations.push(generation.name.replace(/^(.*?)-([ivxlcdm]+)$/i, (_match, part1, part2) => part1.charAt(0).toUpperCase() + part1.slice(1) + '-' + part2.toUpperCase()));
    });

    return generations;
  } catch (error) {
    console.log(error);
  }
}
