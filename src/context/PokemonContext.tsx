import React, { useCallback, useEffect } from 'react';
import { createContext, useMemo, useState } from 'react';
import {
  getPokemonsGenerations,
  getPokemonsTypes,
  getPokemonsWithLimit,
  server,
} from '../service/axios';

interface UsePokemonContextProviderProps {
  children: React.ReactNode;
}

interface IUsePokemon {
  pokemons: any[];
  pokemonsTypes: string[];
  pokemonsGenerations: string[];
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  typedText: string;
  setTypedText: React.Dispatch<React.SetStateAction<string>>;
}

export const PokemonContext = createContext({} as IUsePokemon);

export function PokemonContextProvider({
  children,
}: UsePokemonContextProviderProps) {
  const [fetchedPokemons, setFetchedPokemons] = useState<any>([]);
  const [pokemonsTypes, setPokemonsTypes] = useState<string[]>([]);
  const [pokemonsGenerations, setPokemonsGenerations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [typedText, setTypedText] = useState('');

  async function getInitialPokemons() {
    try {
      setTypedText('');
      setLoading(true);
      const initialPokemons = await getPokemonsWithLimit('10');

      setFetchedPokemons(initialPokemons);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = useCallback(async () => {
    try {
      setLoading(true);

      const pokemonSearched = await server.get(
        `/pokemon/${typedText.toLowerCase()}`
      );

      setFetchedPokemons([pokemonSearched.data]);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [typedText]);

  useEffect(() => {
    (async () => {
      const [allPokemonsTypes, allPokemonsGenerations] = await Promise.all([
        getPokemonsTypes(),
        getPokemonsGenerations(),
      ]);

      setPokemonsTypes(allPokemonsTypes as unknown as string[]);
      setPokemonsGenerations(allPokemonsGenerations as unknown as string[]);
    })();
  }, []);

  useEffect(() => {
    if (typedText === '') {
      getInitialPokemons();
    } else if (typedText) {
      handleSearch();
    } else {
      getInitialPokemons();
    }
  }, [typedText]);

  const value: IUsePokemon = useMemo(
    () => ({
      pokemons: fetchedPokemons || [],
      pokemonsGenerations: pokemonsGenerations || [],
      pokemonsTypes: pokemonsTypes || [],
      isLoading: loading,
      setIsLoading: setLoading,
      typedText: typedText,
      setTypedText: setTypedText,
    }),
    [
      fetchedPokemons,
      loading,
      setLoading,
      typedText,
      setTypedText,
      pokemonsGenerations,
      pokemonsTypes,
    ]
  );

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
}
