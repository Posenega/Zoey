import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function NoData({ firstLine, secondLine, onRefresh }) {
  return (
    <View style={styles.noBooks}>
      <Text style={styles.noBooksMessages}>{firstLine}</Text>
      <Text style={styles.noBooksMessages}>{secondLine}</Text>
      {onRefresh && (
        <Button
          onPress={onRefresh}
          title="Refresh"
          style={styles.refreshButton}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  noBooks: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noBooksMessages: {
    color: "#939393",
    fontSize: 15,
    letterSpacing: 1,
    marginBottom: 5,
  },
  refreshButton: {
    color: "blue",
  },
});
