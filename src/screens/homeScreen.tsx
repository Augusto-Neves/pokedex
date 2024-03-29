import { useEffect, useRef } from 'react';
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
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { RandomButton } from '../components/RandomButton';
import { useNavigation } from '@react-navigation/native';
import { fadeInAnimation } from '../utils/fadeInAnimation';
import { Modalize } from 'react-native-modalize';
import { usePokemon } from '../hooks/usePokemons';
import { FilterModal } from '../components/FilterModal';

export function HomeScreen() {
  const { isLoading, pokemons, setTypedText, typedText, setIsLoading } =
    usePokemon();
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const filterModalRef = useRef<Modalize>(null);

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
  }, []);

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

          {/* Filter Modal */}
          <FilterModal filterRef={filterModalRef} />
        </>
      )}
    </Animated.View>
  );
}
