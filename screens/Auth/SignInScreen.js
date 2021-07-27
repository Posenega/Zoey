import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { useForm, Controller } from 'react-hook-form';
import { connect, useDispatch, useSelector } from 'react-redux';

import CustomTextInput from '../../components/CustomTextInput';
import FacebookButton from '../../components/Icons/FacebookButton';
import GooglButton from '../../components/Icons/GoogleButton';
import AppleButton from '../../components/Icons/AppleButton';

import ArrowButton from '../../components/Icons/ArrowButton';
import BackButton from '../../components/Icons/BackButton';
import { loginUser } from '../../store/actions/auth';
import Colors, { getThemeColor } from '../../constants/Colors';

function SignInScreen(props) {
  const styles = getStyles(props.theme);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (isLoading) {
      return;
    }
    dispatch(loginUser(data.email, data.password, setError));
  };
  const isLoading = useSelector((state) => state.auth.isLoading);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.singInScreen}>
        <View style={styles.backButton}>
          <BackButton
            onPress={() => {
              if (isLoading) {
                return;
              }
              props.navigation.goBack();
            }}
            size={40}
            color={getThemeColor('text', props.theme)}
          />
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'flex-start',
            marginBottom: 30,
          }}>
          <Text style={styles.header}>Enter your credentials</Text>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Controller
            name='email'
            initialValue=''
            control={control}
            rules={{ required: 'Please provide a valid email.' }}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <CustomTextInput
                  keyboardType='email-address'
                  autoCapitalize='none'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder='Email'
                  error={errors.email?.message}
                />
              );
            }}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Controller
            name='password'
            initialValue=''
            control={control}
            rules={{ required: 'Please provide a valid password.' }}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <CustomTextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder='Password'
                  isPassword
                  error={errors.password?.message}
                />
              );
            }}
          />
        </View>
        {/* <View style={styles.siginOptions}>
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
        </View> */}
        <TouchableOpacity
          style={{ width: '100%' }}
          onPress={handleSubmit(onSubmit)}>
          <View style={styles.signInButton}>
            {isLoading ? (
              <ActivityIndicator
                size='small'
                color={getThemeColor('text', props.theme)}
              />
            ) : (
              <>
                <Text style={styles.textSignIn}>Sign In</Text>
                <ArrowButton color='white' size={18} />
              </>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    singInScreen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 62,
    },
    backButton: {
      position: 'absolute',
      left: 25,
      top: 75,
    },
    header: {
      fontFamily: 'rubik-bold',
      fontSize: 20,
      color: getThemeColor('text', theme),
    },
    siginOptions: {
      flexDirection: 'row',
      marginTop: 4,
    },
    facebook: {
      backgroundColor: '#1877F2',
      marginRight: 5,
    },
    google: {
      backgroundColor: 'white',
      marginHorizontal: 5,
    },
    apple: {
      backgroundColor: '#000000',
      marginLeft: 5,
    },
    partiesButton: {
      height: 30,
      flex: 1,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    signInButton: {
      height: 44,
      width: '100%',
      backgroundColor: getThemeColor('primary', theme),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      borderRadius: 10,
      flexDirection: 'row',
    },
    textSignIn: {
      color: 'white',
      fontSize: 14,
    },
  });

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(SignInScreen);
