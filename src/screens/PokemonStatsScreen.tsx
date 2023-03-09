import { useRoute } from "@react-navigation/native";
import { ParamsProps } from "../@types/pokemonParamsProps";
import { StatRow } from "../components/StatRow";

export function PokemonStatsScreen() {
  const route = useRoute();
  const pokemon = route.params as ParamsProps;

  return (
    <>
      {pokemon.stats.map((data) => (
        <StatRow
          pokemon={pokemon}
          statsName={data.stat.name}
          key={data.stat.name}
        />
      ))}
    </>
  );
}
