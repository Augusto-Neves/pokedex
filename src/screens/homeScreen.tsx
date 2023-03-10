import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PokemonCard } from "../components/PokemonCard";
import { getPokemonsWithLimit, searchPokemon, server } from "../service/axios";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { RandomButton } from "../components/RandomButton";
import { useNavigation } from "@react-navigation/native";

export function HomeScreen() {
  const [pokemons, setPokemons] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [typedText, setTypedText] = useState("");
  const navigation = useNavigation();

  async function getInitialPokemons() {
    try {
      setTypedText("");
      setIsLoading(true);
      const initialPokemons = await getPokemonsWithLimit("10");

      setPokemons(initialPokemons);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearch = useCallback(async () => {
    try {
      setIsLoading(true);

      const pokemonSearched = await server.get(
        `/pokemon/${typedText.toLowerCase()}`
      );

      setPokemons([pokemonSearched.data]);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [typedText]);

  function handleTextTyped(text: string) {
    setTypedText(text);
  }

  function handlePokemonNavigation(pokemon: any) {
    navigation.navigate("Pokemon", {
      pokemon,
    });
  }
  
  useEffect(() => {
    if (typedText === "") {
      getInitialPokemons();
    }
  }, [typedText]);

  useEffect(() => {
    if (typedText) {
      handleSearch();
    } else {
      getInitialPokemons();
    }
  }, [typedText]);

  return (
    <>
      <SafeAreaView>
        <View className="space-x-10 pr-5">
          <Text className="text-gray-500 text-4xl font-normal ml-10 mt-3 mb-1">
            Pok??dex
          </Text>
          <Text className="text-gray-400 text-base mb-3">
            Use the advanced search to find Pok??mon by type, weakness, ability
            and more!
          </Text>
        </View>
        <View className="flex-row items-center justify-around px-4">
          <View className="flex-row space-x-2  p-3 rounded-lg border border-gray-200 flex-1 items-center">
            <MaterialIcons name="search" size={20} />
            <TextInput
              value={typedText}
              onChangeText={handleTextTyped}
              placeholder="Search a pok??mon"
              keyboardType="web-search"
              className="w-full"
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            className="h-12 w-12 bg-gray-200 items-center justify-center m-4 rounded-2xl"
          >
            <Feather name="filter" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {isLoading ? (
        <ActivityIndicator size="large" color="#6b7280" className="flex-1" />
      ) : (
        <>
          <FlatList
            data={pokemons}
            renderItem={({ item }) => (
              <PokemonCard
                pokemon={{
                  ...item,
                  sprite: item.sprites?.other["official-artwork"].front_default,
                }}
                onPress={handlePokemonNavigation}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 80,
            }}
            numColumns={2}
          />

          <RandomButton />
        </>
      )}
    </>
  );
}
