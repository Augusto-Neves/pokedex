import { View, Text, StyleSheet } from "react-native";

export function QuizScreen() {
  return (
    <View style={styles.container}>
      <Text>Quiz Screen</Text>
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
