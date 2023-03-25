import { HomeScreen } from "../../screens/HomeScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ComparatorScreen } from "../../screens/ComparatorScreen";
import { FavoriteScreen } from "../../screens/FavoritesScreen";
import { QuizScreen } from "../../screens/QuizScreen";
import { Host } from "react-native-portalize";

const Tab = createBottomTabNavigator();

export function HomeTabScreen() {
  return (
    <Host>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName: any;

            switch (route.name) {
              case "HomeTab":
                iconName = focused ? "home" : "home";
                break;
              case "Comparator":
                iconName = focused ? "compare-arrows" : "compare-arrows";
                break;
              case "Quiz":
                iconName = focused ? "question-answer" : "question-answer";
                break;
              case "Favorite":
                iconName = focused ? "favorite" : "favorite";
                break;
              default:
                iconName = "";
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#283141",
          tabBarInactiveTintColor: "#8D9DB9",
          headerShown: false,
          tabBarLabelStyle: {
            paddingBottom: 10,
            fontSize: 10,
            fontWeight: "600",
          },
          tabBarStyle: {
            padding: 10,
            height: 70,
          },
        })}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Tab.Screen
          name="Comparator"
          component={ComparatorScreen}
          options={{ title: "Comparator" }}
        />
        <Tab.Screen
          name="Quiz"
          component={QuizScreen}
          options={{ title: "Quiz" }}
        />
        <Tab.Screen
          name="Favorite"
          component={FavoriteScreen}
          options={{ title: "Favorites" }}
        />
      </Tab.Navigator>
    </Host>
  );
}
