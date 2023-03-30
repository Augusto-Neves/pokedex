import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import QuizStartImg from "../assets/quizStart.svg";

export function QuizScreen() {
  const navigator = useNavigation();

  function handleNavigation() {
    navigator.navigate("Game");
  }

  return (
    <View className="flex-1 items-center justify-center">
      {/* <Image
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomValue}.png`,
        }}
        className="h-36 w-36"
        style={
          !hasAnswer && {
            tintColor: "black",
          }
        }
      /> */}
      <QuizStartImg width={312} height={229} />
      <TouchableOpacity
        onPress={handleNavigation}
        activeOpacity={0.7}
        className=" items-center justify-center bg-[#FFCC00] w-[312px] h-11 rounded-2xl py-3 px-6 mt-24"
      >
        <Text className="font-medium text-sm text-center uppercase">Start</Text>
      </TouchableOpacity>
    </View>
  );
}
