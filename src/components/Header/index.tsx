import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "tailwindcss/colors";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text } from "react-native";
import { addingPadToString } from "../../utils/addingPadToString";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
interface HeaderProps {
  title: string | number;
  pokemonId?: string | number;
  hasFavoriteButton?: boolean;
}

export function Header({
  title,
  pokemonId,
  hasFavoriteButton = false,
}: HeaderProps) {
  const navigation = useNavigation();
  const [favoriteList, setFavoriteList] = useState<any[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const getFavoriteList = async () => {
    if (hasFavoriteButton) {
      try {
        const jsonValue = await AsyncStorage.getItem("@favorite_pokemon");
        if (jsonValue !== null) {
          const parsedValue = JSON.parse(jsonValue);
          setFavoriteList(parsedValue);
          setIsFavorite(parsedValue.includes(pokemonId));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addToFavoriteList = async () => {
    try {
      const newFavoriteList = [...favoriteList, pokemonId];
      const uniqueFavoriteIds = [...new Set(newFavoriteList)];
      await AsyncStorage.setItem(
        "@favorite_pokemon",
        JSON.stringify(uniqueFavoriteIds)
      );
      setFavoriteList(uniqueFavoriteIds);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromFavoriteList = async () => {
    try {
      const newFavoriteList = favoriteList.filter(
        (id: number) => id !== pokemonId
      );
      setFavoriteList(newFavoriteList);
    } catch (error) {
      console.log(error);
    }
  };

  function handleGoBack() {
    navigation.goBack();
  }

  function handleFavorite() {
    if (isFavorite) {
      removeFromFavoriteList();
      setIsFavorite(!isFavorite);
    } else {
      addToFavoriteList();
      setIsFavorite(!isFavorite);
    }
  }

  useEffect(() => {
    getFavoriteList();
  }, []);

  return (
    <View className="flex-row items-center justify-between">
      <TouchableOpacity activeOpacity={0.7} onPress={handleGoBack}>
        <Ionicons
          name="chevron-back-sharp"
          size={24}
          color={colors.zinc[800]}
        />
      </TouchableOpacity>
      <Text className="text-zinc-800 text-center text-2xl font-normal leading-7 flex-1">
        #{addingPadToString(3, title)}
      </Text>
      {hasFavoriteButton && (
        <TouchableOpacity activeOpacity={0.7} onPress={handleFavorite}>
          <Ionicons
            name={isFavorite ? "ios-heart" : "ios-heart-outline"}
            size={24}
            color={colors.zinc[800]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
