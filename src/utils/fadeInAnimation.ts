import { Animated } from "react-native";

export function fadeInAnimation(fadeAnim: Animated.Value | Animated.ValueXY) {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();
}
