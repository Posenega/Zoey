import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";

import CustomTextInput from "../../components/CustomTextInput";
import FacebookButton from "../../components/Icons/FacebookButton";
import GooglButton from "../../components/Icons/GoogleButton";
import AppleButton from "../../components/Icons/AppleButton";
import Colors from "../../constants/Colors";
import ArrowButton from "../../components/Icons/ArrowButton";
import BackButton from "../../components/Icons/BackButton";
import { loginUser } from "../../store/actions/auth";

export default function SignInScreen(props) {
  const { control, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(loginUser(data.email, data.password));
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.singInScreen}>
        <View style={styles.backButton}>
          <BackButton
            onPress={() => props.navigation.goBack()}
            size={40}
            color="#2b2b2b"
          />
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "flex-start",
            marginBottom: 30,
          }}
        >
          <Text style={styles.header}>Enter your credentials</Text>
        </View>
        <View style={{ marginVertical: 10 }}>
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
                  placeholder="Email"
                />
              );
            }}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
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
                  placeholder="Password"
                  isPassword
                />
              );
            }}
          />
        </View>
        <View style={styles.siginOptions}>
          <View
            style={{
              ...styles.facebook,
              ...styles.partiesButton,
            }}
          >
            <FacebookButton size={14} />
          </View>
          <View
            style={{
              ...styles.google,
              ...styles.partiesButton,
            }}
          >
            <GooglButton size={14} />
          </View>
          <View
            style={{
              ...styles.apple,
              ...styles.partiesButton,
            }}
          >
            <AppleButton size={14} />
          </View>
        </View>
        <TouchableOpacity
          style={{ width: "100%" }}
          onPress={handleSubmit(onSubmit)}
        >
          <View style={styles.signInButton}>
            <Text style={styles.textSignIn}>Sign In</Text>
            <ArrowButton color="white" size={18} />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  singInScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 62,
  },
  backButton: {
    position: "absolute",
    left: 25,
    top: 75,
  },
  header: {
    fontFamily: "rubik-bold",
    fontSize: 20,
    color: "#2b2b2b",
  },
  siginOptions: {
    flexDirection: "row",
    marginTop: 4,
  },
  facebook: {
    backgroundColor: "#1877F2",
    marginRight: 5,
  },
  google: {
    backgroundColor: "white",
    marginHorizontal: 5,
  },
  apple: {
    backgroundColor: "#000000",
    marginLeft: 5,
  },
  partiesButton: {
    height: 30,
    flex: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  signInButton: {
    height: 44,
    width: "100%",
    backgroundColor: Colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 10,
    flexDirection: "row",
  },
  textSignIn: {
    color: "white",
    fontSize: 14,
  },
});
