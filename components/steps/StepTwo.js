import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { View, StyleSheet } from "react-native";
import CustomTextInput from "../CustomTextInput";

export default function StepTwo(props) {
  const { control, watch } = useForm();

  useEffect(() => {
    props.onChange(watch());
  }, [watch()]);
  return (
    <View>
      <Controller
        name="email"
        initialValue=""
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <CustomTextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.textInput}
              placeholder="Email"
            />
          );
        }}
      />
      <Controller
        name="password"
        initialValue=""
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <CustomTextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.midInput}
              isPassword
              placeholder="Password"
            />
          );
        }}
      />

      <CustomTextInput isPassword placeholder="Confirm Password" />
    </View>
  );
}
const styles = StyleSheet.create({
  midInput: {
    marginVertical: 15,
  },
});
