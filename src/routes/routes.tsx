import { HomeTabScreen } from "./HomeTabScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PokemonScreen } from "../screens/PokemonScreen";
import { ComparatorResultScreen } from "../screens/ComparatorResultScreen";
import { GameScreen } from "../screens/GameScreen";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#ffffff",
        },
      }}
    >
      <Screen name="Home" component={HomeTabScreen} />
      <Screen name="Pokemon" component={PokemonScreen} />
      <Screen name="ComparatorResult" component={ComparatorResultScreen} />
      <Screen name="Game" component={GameScreen} />
    </Navigator>
  );
}
