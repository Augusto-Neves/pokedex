import { View, Text } from "react-native";
import { Ability } from "../../@types/pokemonAbilityType";
import { StatInterface, PokemonTypes, Moves } from "../../@types/pokemonProps";
import { returnStatsValue } from "../../utils/returnStatsValue";
import { StatsBar } from "../StatsBar";

interface PokemonProps {
  id: number;
  name: string;
  moves: Moves[];
  height: number;
  weight: number;
  baseExperience: number;
  abilities: Ability[];
  stats: StatInterface[];
  types: PokemonTypes[];
  sprite: string;
}

interface StatRowProps {
  statsName: string;
  pokemon: PokemonProps;
  secondPokemon?: PokemonProps;
}

export function StatRow({ statsName, pokemon, secondPokemon }: StatRowProps) {
  const statsTitles = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp.Atk",
    "special-defense": "Sp.Def",
    speed: "Speed",
  };
  const rowTitle = (statsTitles as any)[statsName];
  
  return (
    <View className="flex-row justify-evenly items-center px-9 flex-1">
      <View className="flex-1">
        <Text className="mr-8 font-normal text-base text-gray-600">
          {rowTitle}
        </Text>
      </View>

      <Text className="mr-9 -ml-28 text-zinc-800 text-base">
        {returnStatsValue(statsName, pokemon)}
      </Text>
      <StatsBar
        pokemonType={pokemon.types[0].type.name}
        stat={returnStatsValue(statsName, pokemon)}
      />

      {secondPokemon && (
        <Text className="text-zinc-800 text-base ml-5">
          {returnStatsValue(statsName, secondPokemon)}
        </Text>
      )}
    </View>
  );
}
