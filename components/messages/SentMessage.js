import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import Colors, { getThemeColor } from "../../constants/Colors";

function SentMessage({ messageText, theme }) {
  const styles = getStyles(theme);
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

const getStyles = (theme) =>
  StyleSheet.create({
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
      backgroundColor: getThemeColor("primary", theme),
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

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(SentMessage);
