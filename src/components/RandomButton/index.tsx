import RandomIcon from "../../assets/random.svg";
import { View, TouchableOpacity, Text } from "react-native";
import { searchPokemon } from "../../service/axios";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

interface RandomButtonProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>; 
}

export function RandomButton({ setIsLoading }:RandomButtonProps) {
  const navigation = useNavigation();
  const [isDisabled, setIsDisabled] = useState(false);

  async function handleRandomSearch() {
    setIsLoading(true)
    setIsDisabled(true);
    const minValue = 1;
    const maxValue = 1008;

    let randomValue = (
      Math.random() * (maxValue - minValue) +
      minValue
    ).toFixed();

    try {
      const pokemonResult = (await searchPokemon(randomValue)) as any;

      navigation.navigate("Pokemon", {
        pokemon: {
          ...pokemonResult,
          sprite:
            pokemonResult.sprites?.other["official-artwork"].front_default,
        },
      });

      setIsDisabled(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsDisabled(false);
    }
  }

  return (
    <View className="absolute right-4 bottom-4 z-40">
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row items-center justify-evenly h-16 w-44 rounded-2xl bg-yellow-400 p-5 pb-5"
        onPress={handleRandomSearch}
        disabled={isDisabled}
      >
        <RandomIcon height={40} width={40} />
        <Text className="font-medium text-base">Random</Text>
      </TouchableOpacity>
    </View>
  );
}
