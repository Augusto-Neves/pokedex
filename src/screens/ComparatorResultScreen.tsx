import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ParamsProps } from "../@types/pokemonParamsProps";
import { Header } from "../components/Header";
import { PokemonComparatorSlot } from "../components/PokemonComparatorSlot";
import { StatRow } from "../components/StatRow";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { sumPokemonStats } from "../utils/sumPokemonStats";

interface PokemonsReceivedFromParams {
  firstPokemon: ParamsProps;
  secondPokemon: ParamsProps;
}

export function ComparatorResultScreen() {
  const { params } = useRoute();
  const pokemons = params as PokemonsReceivedFromParams;

  const firstPokemon = pokemons.firstPokemon;
  const secondPokemon = pokemons.secondPokemon;

  const [winnerPokemon, setWinnerPokemon] = useState<ParamsProps>(firstPokemon);
  const [defeatedPokemon, setDefeatedPokemon] =
    useState<ParamsProps>(secondPokemon);
  const [isDrawn, setIsDrawn] = useState(false);

  function pokemonCompareWinner() {
    const firstPokemonStatSum = sumPokemonStats(firstPokemon.stats);
    const secondPokemonStatSum = sumPokemonStats(secondPokemon.stats);

    if (firstPokemonStatSum > secondPokemonStatSum) {
      setWinnerPokemon(firstPokemon);
      setDefeatedPokemon(secondPokemon);
    } else if (secondPokemonStatSum > firstPokemonStatSum) {
      setWinnerPokemon(secondPokemon);
      setDefeatedPokemon(firstPokemon);
    } else {
      setIsDrawn(true);
    }
  }

  useEffect(() => {
    pokemonCompareWinner();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <View className="py-5 px-6">
          <Header title="Comparator" />
        </View>
      </SafeAreaView>

      <View className="flex-row gap-5 items-center justify-center mt-5">
        <View>
          <PokemonComparatorSlot pokemon={firstPokemon} />
        </View>
        <View>
          <PokemonComparatorSlot pokemon={secondPokemon} />
        </View>
      </View>

      <View className="w-80 p-6 mt-10">
        {isDrawn ? (
          <Text className="text-2xl leading-7">Draw!</Text>
        ) : (
          <Text className="text-2xl leading-7">
            {capitalizeFirstLetter(winnerPokemon.name)} wins!
          </Text>
        )}
      </View>

      {firstPokemon.stats.map((data) => (
        <View className="flex-1 my-6" key={data.stat.name}>
          <StatRow
            pokemon={winnerPokemon}
            secondPokemon={defeatedPokemon}
            statsName={data.stat.name}
          />
        </View>
      ))}
    </ScrollView>
  );
}
