import clsx from "clsx";
import { View } from "react-native";
import { generateStatsBarPercentage } from "../../utils/generateStatsBarPercentage";

interface ProgressBarProps {
  pokemonType: string;
  stat: number;
}

export function StatsBar({ pokemonType, stat }: ProgressBarProps) {
  const percentage = generateStatsBarPercentage(stat);

  return (
    <View className="w-full h-3 rounded-xl bg-zinc-200 flex-1 -ml-4">
      <View
        className={clsx("h-3 rounded-xl", {
          "bg-pokemon-type-grass": pokemonType === "grass",
          "bg-pokemon-type-fire": pokemonType === "fire",
          "bg-pokemon-type-water": pokemonType === "water",
          "bg-pokemon-type-bug": pokemonType === "bug",
          "bg-pokemon-type-normal": pokemonType === "normal",
          "bg-pokemon-type-poison": pokemonType === "poison",
          "bg-pokemon-type-electric": pokemonType === "electric",
          "bg-pokemon-type-ground": pokemonType === "ground",
          "bg-pokemon-type-rock": pokemonType === "rock",
          "bg-pokemon-type-psychic": pokemonType === "psychic",
          "bg-pokemon-type-fighting": pokemonType === "fighting",
          "bg-pokemon-type-ghost": pokemonType === "ghost",
          "bg-pokemon-type-flying": pokemonType === "flying",
          "bg-pokemon-type-fairy": pokemonType === "fairy",
          "bg-pokemon-type-ice": pokemonType === "ice",
          "bg-pokemon-type-dragon": pokemonType === "dragon",
          "bg-pokemon-type-dark": pokemonType === "dark",
          "bg-pokemon-type-steel": pokemonType === "steel",
        })}
        style={{ width: `${percentage}%` }}
      />
    </View>
  );
}
