import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { View, StyleSheet } from "react-native";
import CustomTextInput from "../CustomTextInput";

export default function StepTwo({ control, errors }) {
  return (
    <View>
      <Controller
        name="email"
        initialValue=""
        control={control}
        rules={{ required: "Please enter your email." }}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <CustomTextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Email"
              error={errors.email?.message}
            />
          );
        }}
      />
      <Controller
        name="password"
        initialValue=""
        control={control}
        rules={{ required: "Please enter your password." }}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <CustomTextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.textInput}
              isPassword
              placeholder="Password"
              error={errors.password?.message}
            />
          );
        }}
      />

      <CustomTextInput
        isPassword
        placeholder="Confirm Password"
        style={styles.textInput}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  textInput: {
    marginTop: 10,
  },
});
