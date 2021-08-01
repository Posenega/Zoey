import React from "react";
import { View, StyleSheet } from "react-native";

export default function Divider({ style, fullDivider }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {!fullDivider && <View style={styles.ghostDivider} />}
      <View style={{ ...styles.divider, ...style }} />
    </View>
  );
}

const styles = StyleSheet.create({
  ghostDivider: {
    flex: 1,
  },
  divider: {
    marginTop: 5,
    marginBottom: 15,
    height: 1,
    backgroundColor: "#D9D9D9",
    flex: 5,
    flexDirection: "row",
  },
});
