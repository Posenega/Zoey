import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SharedStyles from "../constants/SharedStyles";

export default function SplashScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.center}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
