import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import SendButton from "../components/Icons/SendButton";
import Colors from "../constants/Colors";

export default function MessageComposer() {
  return (
    <View style={styles.messageComposer}>
      <View style={styles.customInput}>
        <TextInput
          placeholderTextColor="#999999"
          style={styles.textInputStyle}
          placeholder="Write a message..."
        />
      </View>
      <View style={styles.sendButton}>
        <SendButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageComposer: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    height: 44,
    borderRadius: 10,
  },
  textInputStyle: {
    fontFamily: "rubik-medium",
    fontSize: 12,
  },
  customInput: {
    flex: 1,
  },
  sendButton: {
    height: 34,
    width: 34,
    backgroundColor: Colors.primaryColor,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
});
