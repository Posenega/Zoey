import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Colors, { getThemeColor } from "../constants/Colors";

const Badge = ({
  category,
  color,
  backgroundColor,
  style,
  children,
  theme,
}) => {
  const styles = getStyles(theme);
  let catColor;
  let catBackgroundColor;

  if (category === "Technology") {
    catColor = getThemeColor("primary", theme);
    catBackgroundColor = getThemeColor("badgeBackground", theme);
  } else if (category === "Science") {
    catColor = getThemeColor("primary", theme);
    catBackgroundColor = getThemeColor("badgeBackground", theme);
  } else {
    catColor = "#FFC300";
    catBackgroundColor = "#FFF0C1";
  }

  return (
    <View
      style={{
        ...styles.category,
        backgroundColor:
          category == null ? backgroundColor : catBackgroundColor,
        ...style,
      }}>
      <Text
        numberOfLines={1}
        style={{
          ...styles.categoryText,
          color: category == null ? color : catColor,
        }}>
        {children}
      </Text>
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    categoryText: {
      fontSize: 9,
    },
    category: {
      width: "40%",
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 5,
      alignItems: "center",
      fontFamily: "rubik-medium",
    },
  });

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(Badge);
