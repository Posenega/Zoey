import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export default function CustomButton(props) {
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

const styles = StyleSheet.create({
  customButton: {
    marginTop: 10,
    height: 43,
    width: 152,
    backgroundColor: Colors.primaryColor,
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
