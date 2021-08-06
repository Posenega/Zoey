import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export default function ReceivedMessage({ messageText }) {
  return (
    <View onStartShouldSetResponder={() => true} style={styles.smmc}>
      <View
        style={{
          ...styles.messageContainer,
          ...styles.smc,
        }}>
        <Text style={{ ...styles.textMessage, ...styles.stm }}>
          {messageText}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  smmc: {
    width: "100%",
    alignItems: "flex-start",
  },
  messageContainer: {
    maxWidth: 275,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 1,
  },
  smc: {
    backgroundColor: "white",
    borderBottomStartRadius: 0,
    color: "#2b2b2b",
  },
  textMessage: {
    fontSize: 15,
    lineHeight: 15,
  },
  stm: {
    color: Colors.accentColor,
  },
});
