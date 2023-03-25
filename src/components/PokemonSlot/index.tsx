import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useRef, useState, useCallback } from "react";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { MaterialIcons } from "@expo/vector-icons";
import { ParamsProps } from "../../@types/pokemonParamsProps";
import { searchPokemon } from "../../service/axios";
import { PokemonCard } from "../PokemonCard";
import RedefineSVG from "../../assets/redefine.svg";

interface PokemonSlotProps {
  pokemon: ParamsProps | null;
  setPokemon: React.Dispatch<React.SetStateAction<ParamsProps | null>>;
}

export function PokemonSlot({ pokemon, setPokemon }: PokemonSlotProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const modalizeRef = useRef<Modalize>(null);

  const getPokemon = useCallback(
    async (textTyped: string) => {
      if (textTyped !== "") {
        try {
          setIsLoading(true);

          const pokemonSearched = (await searchPokemon(textTyped)) as any;

          if (pokemonSearched) {
            setPokemon({
              ...pokemonSearched,
              sprite: pokemonSearched
                ? pokemonSearched?.sprites?.other["official-artwork"]
                    .front_default
                : "",
            } as unknown as ParamsProps);

            setIsLoading(false);
          }
        } catch (error) {
          setIsLoading(false);
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setPokemon(null);
      }
    },
    [searchText]
  );

  async function handleTextTyped(text: string) {
    setSearchText(text);
    getPokemon(text);
  }

  function onOpen() {
    modalizeRef.current?.open();
  }

  function onClose() {
    modalizeRef.current?.close();
  }

  return (
    <>
      {pokemon ? (
        <View className="items-center justify-center h-56 w-full bg-gray-200 m-6 rounded-2xl">
          <Image
            source={{
              uri: pokemon?.sprite,
            }}
            className="h-40 w-40"
          />
          <TouchableOpacity
            activeOpacity={0.7}
            className="absolute left-6 bottom-6 h-6 w-6"
            onPress={onOpen}
          >
            <RedefineSVG height={24} width={24} />
          </TouchableOpacity>
        </View>
      ) : (
        <View className="items-center justify-center h-56 w-full bg-gray-200 m-6 rounded-2xl">
          <TouchableOpacity
            onPress={onOpen}
            activeOpacity={0.5}
            className="bg-gray-100 w-44 h-11 items-center justify-center rounded-2xl"
          >
            <Text className="uppercase text-sm font-medium text-center">
              Add Pokémon
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <SafeAreaView>
        <Portal>
          <Modalize
            ref={modalizeRef}
            HeaderComponent={
              <Text className="text-2xl ml-6 mt-8 mb-6">Choose a Pokémon</Text>
            }
          >
            <View className="flex-1 items-center justify-center h-full">
              <View className="flex-row space-x-2 mt-3 mx-10 p-3 rounded-lg border border-gray-200 flex-1 items-center">
                <MaterialIcons name="search" size={20} />
                <TextInput
                  value={searchText}
                  onChangeText={handleTextTyped}
                  placeholder="Search a pokémon"
                  keyboardType="web-search"
                  className="w-full"
                />
              </View>

              {!pokemon && !isLoading && (
                <Text className="text-gray-400 text-base m-6 font-normal leading-6">
                  It seems that you have not yet chosen a pokémon. Let's do it!
                </Text>
              )}

              {isLoading ? (
                <ActivityIndicator
                  size="large"
                  color="#6b7280"
                  className="flex-1 items-center justify-center mt-60"
                />
              ) : (
                <PokemonCard pokemon={pokemon} onPress={onClose} />
              )}
            </View>
          </Modalize>
        </Portal>
      </SafeAreaView>
    </>
  );
}
