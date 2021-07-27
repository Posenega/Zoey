import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector, useDispatch, connect } from "react-redux";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import { useForm, Controller } from "react-hook-form";
import { logout, verifyUser } from "../../store/actions/auth";
import Colors, { getThemeColor } from "../../constants/Colors";
import BackButton from "../../components/Icons/BackButton";

function VerificationScreen(props) {
  const styles = getStyles(props.theme);
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
      <View style={styles.backButton}>
        <BackButton
          size={40}
          color={getThemeColor("text", props.theme)}
          onPress={() => {
            dispatch(logout());
          }}
        />
      </View>

      <Text
        style={{
          textAlign: "center",
          paddingHorizontal: 18,
          color: getThemeColor("text", props.theme),
        }}
      >
        A verification code has been sent to {email}
      </Text>
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
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    verificationScreen: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: getThemeColor("background", theme),
    },
    input: {
      marginHorizontal: 20,
      marginVertical: 10,
    },
    backButton: {
      position: "absolute",
      left: 25,
      top: 75,
    },
  });

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(VerificationScreen);
