import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Colors, { getThemeColor } from "../constants/Colors";

function CustomButton(props) {
  const styles = getStyles(props.theme);
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{ ...styles.customButton, ...props.containerStyle }}>
        <Text style={{ ...styles.customButtonText, ...props.textStyle }}>
          {props.children}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    customButton: {
      marginTop: 10,
      height: 43,
      width: 152,
      backgroundColor: getThemeColor("primary", theme),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      marginBottom: 5,
    },
    customButtonText: {
      color: "white",
      fontSize: 14,
    },
  });

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(CustomButton);
