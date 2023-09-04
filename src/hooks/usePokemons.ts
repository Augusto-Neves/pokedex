import { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';

export const usePokemon = () => {
  return useContext(PokemonContext);
};
