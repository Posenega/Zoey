import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import ShowValueInput from '../components/Icons/ShowValueInput';
import { connect } from 'react-redux';
import { getThemeColor } from '../constants/Colors';
function CustomTextInput(props) {
  const styles = StyleSheet.create({
    inputContainer: {
      height: 44,
      flexDirection: 'row',
      alignItems: 'center',
    },
    passwordContainer: {
      backgroundColor: getThemeColor('formBackground', props.theme),
      borderRadius: 10,
      width: '100%',
    },
    input: {
      color: getThemeColor('text', props.theme),
      fontSize: 12,
      backgroundColor: getThemeColor('formBackground', props.theme),
      paddingHorizontal: 12,
      height: '100%',
      width: '100%',
      borderRadius: 10,
    },
    inputPassword: {
      color: getThemeColor('text', props.theme),
      fontSize: 12,
      paddingHorizontal: 12,
      height: 43,
      flex: 5,
      borderRadius: 10,
    },
    inputFocus: {
      borderColor: getThemeColor('inputBorder', props.theme),
      borderWidth: 2,
      backgroundColor: getThemeColor('background', props.theme),
    },
    // borderHack: {
    //   borderWidth: 2,
    //   borderColor: props.error
    //     ? "#FFDCDC"
    //     : getThemeColor("formBackground", props.theme),
    // },
    errorText: {
      fontSize: 10,
      marginLeft: 10,
      marginTop: 0.5,
      color: getThemeColor('placeholder', props.theme),
    },
    errorInput: {
      // backgroundColor: "#FFDCDC",
      borderWidth: 2,
      borderColor: '#E24949',
    },
  });

  const [focus, setFocus] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const focusStyle = focus && styles.inputFocus;
  const focusPasswordStyle = focus && styles.inputFocus;

  let inputStyle;
  if (props.isPassword) {
    inputStyle = styles.inputPassword;
  }
  if (props.error && !props.isPassword) {
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
            ? props.error
              ? {
                  ...styles.inputContainer,
                  ...styles.passwordContainer,
                  ...props.style,
                  ...styles.errorInput,
                  ...focusPasswordStyle,
                }
              : {
                  ...styles.inputContainer,
                  ...styles.passwordContainer,
                  ...props.style,
                  ...focusPasswordStyle,
                }
            : { ...styles.inputContainer, ...props.style }
        }>
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
          placeholderTextColor={props.error ? '#E24949' : '#999999'}
        />

        {props.isPassword ? (
          <TouchableWithoutFeedback
            onPress={() => setPasswordShown(!passwordShown)}>
            <View style={{ marginRight: 6 }}>
              <ShowValueInput
                size={14}
                color={passwordShown ? '#2b2b2b' : '#999999'}
              />
            </View>
          </TouchableWithoutFeedback>
        ) : null}
      </View>
      {props.error && (
        <Text style={styles.errorText}>{props.error}</Text>
      )}
    </>
  );
}

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(CustomTextInput);
