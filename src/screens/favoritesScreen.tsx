import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PokemonCard } from "../components/PokemonCard";
import { getFavoritePokemons } from "../service/axios";

export function FavoriteScreen() {
  const navigation = useNavigation();
  const [favoritePokemonsIds, setFavoritePokemonsIds] = useState<any[]>([]);
  const [favoritePokemons, setFavoritePokemons] = useState<any>([]);

  function handlePokemonNavigation(pokemon: any) {
    navigation.navigate("Pokemon", {
      pokemon,
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      const getFavoritePokemonsFromApi = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem("@favorite_pokemon");
          if (jsonValue !== null) {
            const parsedValue = JSON.parse(jsonValue);
            const favoritePokemonsData = await getFavoritePokemons(parsedValue);

            setFavoritePokemonsIds(parsedValue);
            setFavoritePokemons(favoritePokemonsData);
          }
        } catch (error) {
          console.log(error);
        }
      };

      getFavoritePokemonsFromApi();
    }, [])
  );

  return (
    <SafeAreaView className="flex-1">
      <View className="space-x-10 mt-8 pr-5">
        <Text className="text-gray-500 text-4xl font-normal ml-10 mt-3 mb-1">
          Favorites
        </Text>
        <Text className="text-gray-400 text-base m-1">
          This is the list of your favorite Pokémon!
        </Text>
        <Text className="text-gray-400 text-base mb-3">
          Favorite numbers: {favoritePokemonsIds.length}
        </Text>
      </View>
      {favoritePokemonsIds.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-400 text-base mb-3">
            You don't have any favorite Pokémon.
          </Text>
          <Text className="text-gray-400 text-base mb-3">
            Favorite a Pokémon and it will appears here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoritePokemons}
          renderItem={({ item }) => (
            <PokemonCard
              pokemon={{
                ...item,
                sprite: item.sprites?.other["official-artwork"]?.front_default,
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
      )}
    </SafeAreaView>
  );
}
