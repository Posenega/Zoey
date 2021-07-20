import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import ShowValueInput from "../components/Icons/ShowValueInput";

export default function CustomTextInput(props) {
  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    passwordContainer: {
      backgroundColor: "#ededed",
      borderRadius: 10,
      width: "100%",
    },
    input: {
      color: "#2b2b2b",
      fontSize: 12,
      backgroundColor: "#ededed",
      paddingHorizontal: 12,
      height: 44,
      width: "100%",
      borderRadius: 10,
    },
    inputPassword: {
      color: "#2b2b2b",
      fontSize: 12,
      paddingHorizontal: 12,
      height: 43,
      flex: 5,
      borderRadius: 10,
    },
    inputFocus: {
      borderColor: "#2b2b2b",
      borderWidth: 2,
      backgroundColor: "#f9f9f9",
    },
    inputPasswordFocus: {
      borderColor: "#2b2b2b",
      borderWidth: 2,
      backgroundColor: "#f9f9f9",
    },
    borderHack: {
      borderWidth: 2,
      borderColor: props.error ? "#FFDCDC" : "#ededed",
    },
    errorText: {
      fontSize: 10,
      marginLeft: 10,
      marginTop: 0.5,
      color: "#999999",
    },
    errorInput: {
      backgroundColor: "#FFDCDC",
    },
  });

  const [focus, setFocus] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const focusStyle = focus ? styles.inputFocus : styles.borderHack;
  const focusPasswordStyle = focus
    ? styles.inputPasswordFocus
    : styles.borderHack;

  let inputStyle;
  if (props.isPassword) {
    inputStyle = styles.inputPassword;
  }
  if (props.error) {
    inputStyle = {
      ...styles.inputContainer,
      ...styles.input,
      ...styles.errorInput,
      ...focusStyle,
    };
  }
  if (!props.error && !props.isPassword) {
    inputStyle = { ...styles.input, ...props.style, ...focusStyle };
  }

  return (
    <>
      <View
        style={
          props.isPassword
            ? {
                ...styles.inputContainer,
                ...styles.passwordContainer,
                ...props.style,
                ...focusPasswordStyle,
              }
            : styles.inputContainer
        }
      >
        <TextInput
          secureTextEntry={!passwordShown && props.isPassword}
          passwordRules={true}
          {...props}
          onFocus={() => {
            if (props.onFocus) props.onFocus();
            setFocus(true);
          }}
          onBlur={() => {
            if (props.onBlur) props.onBlur();
            setFocus(false);
          }}
          style={inputStyle}
          placeholderTextColor={props.error ? "#E24949" : "#999999"}
        />

        {props.isPassword ? (
          <TouchableWithoutFeedback
            onPress={() => setPasswordShown(!passwordShown)}
          >
            <View style={{ marginRight: 6 }}>
              <ShowValueInput
                size={14}
                color={passwordShown ? "#2b2b2b" : "#999999"}
              />
            </View>
          </TouchableWithoutFeedback>
        ) : null}
      </View>
      {props.error && <Text style={styles.errorText}>{props.error}</Text>}
    </>
  );
}
