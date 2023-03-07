import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../../screens/HomeScreen";
import { PokemonScreen } from "../../screens/PokemonScreen";

const HomeStack = createNativeStackNavigator();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#ffffff",
        },
      }}
    >
      <HomeStack.Screen name="home" component={HomeScreen} />
      <HomeStack.Screen
        name="Pokemon"
        component={PokemonScreen}
        options={{
          presentation: "fullScreenModal",
        }}
      />
    </HomeStack.Navigator>
  );
}
