import { View, Text, StyleSheet } from "react-native";

export function FavoriteScreen() {
  return (
    <View style={styles.container}>
      <Text>Favorites Pókemons Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
