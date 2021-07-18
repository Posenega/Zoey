import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const Badge = ({ category, color, backgroundColor, style, children }) => {
  let catColor;
  let catBackgroundColor;

  if (category === "Technology") {
    catColor = Colors.techTextColors;
    catBackgroundColor = Colors.techBackgroundColor;
  } else if (category === "Science") {
    catColor = Colors.scienceTextColor;
    catBackgroundColor = Colors.scienceBackgroundColor;
  }

  return (
    <View
      style={{
        ...styles.category,
        backgroundColor:
          category == null ? backgroundColor : catBackgroundColor,
        ...style,
      }}
    >
      <Text
        style={{
          ...styles.categoryText,
          color: category == null ? color : catColor,
        }}
      >
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryText: {
    fontSize: 9,
  },
  category: {
    width: "40%",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
    alignItems: "center",
  },
});

export default Badge;
