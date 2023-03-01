import { View, Text, StyleSheet } from "react-native";

export function ComparatorScreen() {
  return (
    <View style={styles.container}>
      <Text>Comparator Screen</Text>
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
