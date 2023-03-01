import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PokemonCard } from "../components/PokemonCard";
import { getPokemonsWithLimit } from "../service/axios";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export function HomeScreen() {
  const [pokemons, setPokemons] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getInitalPokemons() {
    setIsLoading(true);
    try {
      const initialPokemons = await getPokemonsWithLimit("10");

      setPokemons(initialPokemons);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  useEffect(() => {
    getInitalPokemons();
  }, []);

  if (isLoading) {
    return (
      <ActivityIndicator size="large" color="#6b7280" className="flex-1" />
    );
  }

  return (
    <>
      <SafeAreaView>
        <View className="space-x-10 pr-5">
          <Text className="text-gray-500 text-4xl font-normal ml-10 mt-3 mb-1">
            Pokédex
          </Text>
          <Text className="text-gray-400 text-base mb-3">
            Use the advanced search to find Pokémon by type, weakness, ability
            and more!
          </Text>
        </View>
        <View className="flex-row items-center justify-around px-4">
          <View className="flex-row space-x-2  p-3 rounded-lg border border-gray-200 flex-1 items-center">
            <MaterialIcons name="search" size={20} />
            <TextInput placeholder="Search a pokémon" keyboardType="default" />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            className="h-12 w-12 bg-gray-200 items-center justify-center m-4 rounded-2xl"
          >
            <Feather name="filter" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="w-full"
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          paddingBottom: 80,
        }}
      >
        {pokemons?.map((pokemon: any) => (
          <PokemonCard
            pokemon={{
              ...pokemon,
              sprite: pokemon.sprites.other["official-artwork"].front_default,
            }}
            key={pokemon.name}
          />
        ))}
      </ScrollView>
      <View className="absolute right-4 bottom-4 z-50">
        <TouchableOpacity
          activeOpacity={0.899}
          className="flex-row items-center justify-evenly h-16 w-44 rounded-2xl bg-yellow-400 p-5 pb-5"
        >
          <Image
            source={require("../../assets/random.png")}
            className="w-7 h-7"
          />
          <Text className="font-medium text-base">Random</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
