import { ParamsProps } from "../@types/pokemonParamsProps";
import { StatInterface } from "../@types/pokemonProps";

export function returnStatsValue(statName: string, pokemon: ParamsProps): any {
  const filteredStat: StatInterface[] = pokemon.stats.filter(
    (stats) => stats.stat.name === statName.toLowerCase()
  );

  const statValue = filteredStat.map((stat) => stat.base_stat);

  return statValue;
}
