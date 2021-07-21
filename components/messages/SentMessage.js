import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";

export default function SentMessage({ messageText }) {
  return (
    <View style={styles.rmmc}>
      <View
        style={{
          ...styles.messageContainer,
          ...styles.rmc,
        }}
      >
        <Text style={{ ...styles.textMessage, ...styles.rtm }}>
          {messageText}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rmmc: {
    width: "100%",
    alignItems: "flex-end",
  },
  messageContainer: {
    // minWidth: 100,
    maxWidth: 275,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 10,
    marginVertical: 10,
  },
  rmc: {
    backgroundColor: Colors.primaryColor,
    borderBottomEndRadius: 0,
    color: "white",
  },
  textMessage: {
    fontSize: 10,
    lineHeight: 15,
  },
  rtm: {
    color: "white",
  },
});
