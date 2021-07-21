import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { View, StyleSheet } from "react-native";
import CustomTextInput from "../CustomTextInput";

export default function StepOne({ control, errors }) {
  return (
    <View>
      <Controller
        name="firstName"
        initialValue=""
        control={control}
        rules={{ required: "Please enter your first name." }}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <CustomTextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="First Name"
              error={errors.firstName?.message}
            />
          );
        }}
      />

      <Controller
        name="lastName"
        initialValue=""
        control={control}
        rules={{ required: "Please enter your last name." }}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <CustomTextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.textInput}
              placeholder="Last Name"
              error={errors.lastName?.message}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 10,
  },
});
