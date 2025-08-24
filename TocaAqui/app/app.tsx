import { View, StyleSheet } from "react-native";
import Navigate from "../navigation/Navigate";
import React from "react";

export default function App() {
  return (
    <View style={styles.container}>
      <Navigate />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
