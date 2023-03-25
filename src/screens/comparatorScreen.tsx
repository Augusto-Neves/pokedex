import clsx from "clsx";
import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ParamsProps } from "../@types/pokemonParamsProps";
import { PokemonSlot } from "../components/PokemonSlot";
import { RandomCompareButton } from "../components/RandomCompareButton";

export function ComparatorScreen() {
  const [firstPokemon, setFirstPokemon] = useState<ParamsProps | null>(null);
  const [secondPokemon, setSecondPokemon] = useState<ParamsProps | null>(null);
  const isDisabled = !firstPokemon || !secondPokemon;

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="space-x-10 my-8 pr-5">
          <Text className="text-gray-500 text-4xl font-normal ml-10 mt-3 mb-1">
            Comparator
          </Text>
          <Text className="text-gray-400 text-base m-1 leading-6">
            Select two Pokémon and compare them to see who is the strongest!
          </Text>
        </View>

        <View className="items-center justify-center flex-1 mx-6">
          <PokemonSlot pokemon={firstPokemon} setPokemon={setFirstPokemon} />

          <RandomCompareButton
            setFirstPokemon={setFirstPokemon}
            setSecondPokemon={setSecondPokemon}
          />

          <PokemonSlot pokemon={secondPokemon} setPokemon={setSecondPokemon} />

          <TouchableOpacity
            activeOpacity={0.7}
            className={clsx(
              "flex-row items-center justify-evenly h-11 w-full rounded-2xl bg-yellow-400 m-6",
              {
                "opacity-40": isDisabled,
              }
            )}
            disabled={isDisabled}
          >
            <Text className="uppercase">Compare!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
