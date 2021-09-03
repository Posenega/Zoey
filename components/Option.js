import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { getThemeColor } from "../constants/Colors";

function Option({ onChange, children, value, theme, isError }) {
  const isEnabled = value;
  const styles = getStyles(theme);

  return (
    <TouchableOpacity
      onPress={() => {
        if (onChange) {
          onChange(!isEnabled);
        }
      }}
    >
      <View
        style={
          isError
            ? {
                ...styles.editableContainer,
                backgroundColor: "red",
              }
            : isEnabled
            ? {
                ...styles.editableContainer,
                backgroundColor: getThemeColor("badgeBackground", theme),
              }
            : styles.editableContainer
        }
      >
        <View
          style={
            isEnabled
              ? { ...styles.listDesign, backgroundColor: "#FFC300" }
              : styles.listDesign
          }
        />
        <Text
          style={
            isEnabled
              ? { ...styles.editableText, color: "#FFC300" }
              : styles.editableText
          }
        >
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    editableContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      backgroundColor: getThemeColor("formBackground", theme),
      borderRadius: 8,
      paddingVertical: 5,
      paddingHorizontal: 15,
      marginRight: 15,
    },
    editableText: {
      fontSize: 12,
      color: "#999999",
    },
    listDesign: {
      height: 6,
      width: 6,
      backgroundColor: "#999999",
      borderRadius: 60,
      marginRight: 4,
    },
  });

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(Option);
