import colors from "tailwindcss/colors";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text } from "react-native";
import { addingPadToString } from "../../utils/addingPadToString";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

interface HeaderProps {
  title: string | number;
}

export function Header({ title }: HeaderProps) {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);

  function handleGoBack() {
    navigation.goBack();
  }

  function handleFavorite() {
    setIsFavorite(!isFavorite);
  }

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
      <TouchableOpacity activeOpacity={0.7} onPress={handleFavorite}>
        <Ionicons
          name={isFavorite ? "ios-heart" : "ios-heart-outline"}
          size={24}
          color={colors.zinc[800]}
        />
      </TouchableOpacity>
    </View>
  );
}
