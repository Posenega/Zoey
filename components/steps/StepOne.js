import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { View, StyleSheet } from "react-native";
import CustomTextInput from "../CustomTextInput";

export default function StepOne(props) {
  const { control, watch } = useForm();

  useEffect(() => {
    props.onChange(watch());
  }, [watch()]);
  return (
    <View>
      <Controller
        name="firstName"
        initialValue=""
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <CustomTextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.textInput}
              placeholder="First Name"
            />
          );
        }}
      />

      <Controller
        name="lastName"
        initialValue=""
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <CustomTextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.textInput}
              placeholder="Last Name"
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    marginBottom: 15,
  },
});
