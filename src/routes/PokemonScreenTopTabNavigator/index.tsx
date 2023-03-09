import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions } from "react-native";
import { PokemonProps } from "../../@types/pokemonProps";
import { PokemonAboutScreen } from "../../screens/PokemonAboutScreen";
import { PokemonEvolutionsScreen } from "../../screens/PokemonEvolutionsScreen";
import { PokemonMovesScreen } from "../../screens/PokemonMovesScreen";
import { PokemonStatsScreen } from "../../screens/PokemonStatsScreen";
import { pokemonTypesColors } from "../../utils/colors";

const Tab = createMaterialTopTabNavigator();

export function PokemonScreenTopTab({ pokemon }: PokemonProps) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "500",
          textTransform: "capitalize",
          color: "#283141",
        },
        tabBarIndicatorStyle: {
          borderBottomColor: (pokemonTypesColors as any)[
            pokemon.types[0].type.name
          ],
          borderBottomWidth: 3,
          borderRadius: 3,
        },
        tabBarStyle: {
          justifyContent: "center",
          elevation: 0,
          borderBottomWidth: 0,
        },
      }}
      initialLayout={{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      }}
      style={{
        flex: 1,
        minHeight: 600,
      }}
      sceneContainerStyle={{
        backgroundColor: "#ffffff",
        flex: 1,
      }}
    >
      <Tab.Screen
        name="About"
        options={{ title: "About" }}
        component={PokemonAboutScreen}
        initialParams={pokemon}
      />
      <Tab.Screen
        name="Stats"
        options={{ title: "Stats" }}
        component={PokemonStatsScreen}
        initialParams={pokemon}
      />

      <Tab.Screen
        name="Moves"
        options={{ title: "Moves" }}
        component={PokemonMovesScreen}
        initialParams={pokemon}
      />

      <Tab.Screen
        name="Evolutions"
        options={{ title: "Evolutions" }}
        component={PokemonEvolutionsScreen}
      />
    </Tab.Navigator>
  );
}
