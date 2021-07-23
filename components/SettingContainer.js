import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { getThemeColor } from "../constants/Colors";
import ArrowButton from "./Icons/ArrowButton";

function SettingContainer({ style, children, icon, theme }) {
  const styles = getStyles(theme);

  return (
    <View style={{ ...styles.container, ...style }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon}
        {/* <ProfileButton size={20} color='#2b2b2b' /> */}
        <Text style={styles.text}>{children}</Text>
      </View>
      <ArrowButton size={20} color={getThemeColor("text", theme)} />
    </View>
  );
}
const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginVertical: 20,
      paddingHorizontal: 10,
      height: 30,
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
    },
    text: {
      marginLeft: 15,
      fontSize: 14,
      fontFamily: "rubik-medium",
      color: getThemeColor("text", theme),
    },
  });

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(SettingContainer);
