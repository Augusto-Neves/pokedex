import { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PokemonCard } from '../components/PokemonCard';
import {
  getPokemonsGenerations,
  getPokemonsTypes,
  getPokemonsWithLimit,
  server,
} from '../service/axios';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { RandomButton } from '../components/RandomButton';
import { useNavigation } from '@react-navigation/native';
import { fadeInAnimation } from '../utils/fadeInAnimation';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { FilterComponent } from '../components/FilterComponent';

export function HomeScreen() {
  const [pokemons, setPokemons] = useState<any>([]);
  const [pokemonsTypes, setPokemonsTypes] = useState<string[]>([]);
  const [pokemonsGenerations, setPokemonsGenerations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [typedText, setTypedText] = useState('');

  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const filterModalRef = useRef<Modalize>(null);

  async function getInitialPokemons() {
    try {
      setTypedText('');
      setIsLoading(true);
      const initialPokemons = await getPokemonsWithLimit('10');

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
    navigation.navigate('Pokemon', {
      pokemon,
    });
  }

  function handleOpenFilterModal() {
    filterModalRef.current?.open();
  }

  useEffect(() => {
    fadeInAnimation(fadeAnim);

    (async () => {
      const [allPokemonsTypes, allPokemonsGenerations] = await Promise.all([
        getPokemonsTypes(),
        getPokemonsGenerations(),
      ]);

      setPokemonsTypes(allPokemonsTypes as unknown as string[]);
      setPokemonsGenerations(allPokemonsGenerations as unknown as string[]);
    })();
  }, []);

  useEffect(() => {
    if (typedText === '') {
      getInitialPokemons();
    } else if (typedText) {
      handleSearch();
    } else {
      getInitialPokemons();
    }
  }, [typedText]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}
      className="flex-1"
    >
      <SafeAreaView>
        <View className="space-x-10 mt-8 pr-5">
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
            <TextInput
              value={typedText}
              onChangeText={handleTextTyped}
              placeholder="Search a pokémon"
              keyboardType="web-search"
              className="w-full"
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            className="h-12 w-12 bg-gray-200 items-center justify-center m-4 rounded-2xl"
            onPress={handleOpenFilterModal}
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
                  sprite: item.sprites?.other['official-artwork'].front_default,
                }}
                onPress={handlePokemonNavigation}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: 80,
            }}
            numColumns={2}
          />

          <RandomButton setIsLoading={setIsLoading} />

          <Portal>
            <Modalize
              ref={filterModalRef}
              modalTopOffset={80}
              modalStyle={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              FooterComponent={
                <TouchableOpacity className="items-center justify-center h-11 w-96 rounded-2xl bg-yellow-400 mb-16 py-3">
                  <Text>Apply</Text>
                </TouchableOpacity>
              }
            >
              <Text className="text-2xl ml-6 mt-8 mb-8">Filters</Text>

              {/* Generations */}
              <FilterComponent
                items={pokemonsGenerations}
                title="Generations"
              />

              {/* Types */}
              <FilterComponent items={pokemonsTypes} title="Types" hasIcon />

              {/* Strong */}
              <FilterComponent items={pokemonsTypes} title="Strong" hasIcon />

              {/* Weakness */}
              <FilterComponent items={pokemonsTypes} title="Weakness" hasIcon />
            </Modalize>
          </Portal>
        </>
      )}
    </Animated.View>
  );
}
