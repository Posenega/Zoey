import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import { useForm, Controller } from "react-hook-form";
import { logout, verifyUser } from "../../store/actions/auth";
import Colors from "../../constants/Colors";

export default function VerificationScreen() {
  const email = useSelector((state) => state.auth.email);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(verifyUser(data.code, setError));
  };
  return (
    <View style={styles.verificationScreen}>
      <Text>An email has been sent to {email}</Text>
      <Text>Please go to the link in your email.</Text>
      <Controller
        control={control}
        name="code"
        defaultValue=""
        rules={{
          minLength: {
            value: 4,
            message: "Please code should be 4 characters",
          },
          maxLength: {
            value: 4,
            message: "Please code should be 4 characters",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <CustomTextInput
              placeholder="Enter code..."
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.code?.message}
              keyboardType="number-pad"
            />
          );
        }}
      />
      <CustomButton onPress={handleSubmit(onSubmit)}>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.accentColor} />
        ) : (
          "Proceed"
        )}
      </CustomButton>
      <CustomButton
        onPress={() => {
          dispatch(logout());
        }}
      >
        Go back
      </CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  verificationScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
