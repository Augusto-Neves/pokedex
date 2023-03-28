import { StatInterface } from "../@types/pokemonProps";

export function sumPokemonStats(pokemonStats: StatInterface[]): number {
  const totalBaseStat = pokemonStats.reduce((accumulator, stat) => {
    return accumulator + stat.base_stat;
  }, 0);

  return totalBaseStat;
}
