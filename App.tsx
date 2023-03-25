import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Routes } from "./src/routes";
import {
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

LogBox.ignoreLogs([
  "Request failed with status code 404",
  "Warning: This synthetic event is reused for performance reasons.",
  "Possible Unhandled Promise Rejection",
]);

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <Routes onReady={onLayoutRootView} />
      <StatusBar style="dark" />
    </GestureHandlerRootView>
  );
}
