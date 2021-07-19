import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function StepFour(props) {
  return (
    <View>
      <Text>An email has been sent to: {props.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
