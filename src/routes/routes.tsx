import { HomeTabScreen } from "./HomeTabScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PokemonScreen } from "../screens/PokemonScreen";

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
    </Navigator>
  );
}
