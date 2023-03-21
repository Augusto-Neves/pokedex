import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PokemonProps } from "../@types/pokemonProps";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { pokemonTypesColors } from "../utils/colors";
import { Header } from "../components/Header";
import { PokemonScreenTopTab } from "../routes/PokemonScreenTopTabNavigator";

export function PokemonScreen() {
  const { params } = useRoute();
  const receivedData = params as PokemonProps;
  const pokemonName = capitalizeFirstLetter(receivedData.pokemon.name);
  const pokemonTypeColor =
    (pokemonTypesColors as any)[receivedData.pokemon.types[0].type.name] ||
    "#ffff";

  return (
    <ScrollView className="flex-1 w-full" showsVerticalScrollIndicator={false}>
      <View className="flex-1 flex-shrink">
        <LinearGradient
          colors={[pokemonTypeColor, pokemonTypeColor, "#ffffff"]}
          className="items-center justify-center p-8"
        >
          <SafeAreaView className="items-center justify-center">
            <Header
              title={receivedData.pokemon.id}
              pokemonId={receivedData.pokemon.id}
              hasFavoriteButton
            />
            <Image
              source={{
                uri: receivedData.pokemon.sprite,
              }}
              className="h-64 w-64"
              resizeMode="contain"
            />
          </SafeAreaView>
          <View>
            <Text className="text-center text-2xl font-normal text-zinc-800 leading-7">
              {pokemonName}
            </Text>
            <Text className="text-center text-base leading-6 text-gray-400">
              {capitalizeFirstLetter(receivedData.pokemon.types[0].type.name)}
            </Text>
          </View>
        </LinearGradient>

        <PokemonScreenTopTab pokemon={receivedData.pokemon} />
      </View>
    </ScrollView>
  );
}
