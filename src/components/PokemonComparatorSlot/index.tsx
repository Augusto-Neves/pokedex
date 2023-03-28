import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { ParamsProps } from "../../@types/pokemonParamsProps";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

interface PokemonComparatorSlotProps {
  pokemon: ParamsProps;
}

export function PokemonComparatorSlot({ pokemon }: PokemonComparatorSlotProps) {
  const navigation = useNavigation();

  function handleGoToClickedPokemon(selectedPokemon: any) {
    navigation.navigate("Pokemon", {
      pokemon: {
        ...selectedPokemon,
        sprite:
          selectedPokemon.sprites?.other["official-artwork"].front_default,
      },
    });
  }

  return (
    <TouchableOpacity
      className="items-center justify-center"
      activeOpacity={0.7}
      onPress={() => handleGoToClickedPokemon(pokemon)}
    >
      <View className="w-44 h-32 bg-gray-200 rounded-2xl items-center justify-center">
        <Image source={{ uri: pokemon.sprite }} className="h-20 w-20" />
      </View>
      <Text className="text-sm font-medium mt-3">
        {capitalizeFirstLetter(pokemon.name)}
      </Text>
    </TouchableOpacity>
  );
}
