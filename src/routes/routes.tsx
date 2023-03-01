import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ComparatorScreen } from "../screens/comparatorScreen";
import { FavoriteScreen } from "../screens/favoritesScreen";
import { HomeScreen } from "../screens/homeScreen";
import { QuizScreen } from "../screens/quizScreen";

const Tab = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName: any;

          switch (route.name) {
            case "Home":
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
        name="Home"
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
  );
}
