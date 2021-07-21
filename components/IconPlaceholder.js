import React from "react";
import { View, StyleSheet } from "react-native";
import ProfileButton from "./Icons/ProfileButton";

export default function IconPlaceholder(props) {
  return (
    <View
      style={{ ...styles.placeholder, height: props.size, width: props.size }}
    >
      <ProfileButton size={props.iconSize} color={"#8f8f8f"} />
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    borderRadius: 60,
    backgroundColor: "#C9C9C9",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    paddingTop: 15,
  },
});
