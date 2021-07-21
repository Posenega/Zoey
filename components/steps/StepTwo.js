import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import CustomTextInput from '../CustomTextInput';

export default function StepTwo({ control, errors, watch }) {
  return (
    <View>
      <Controller
        name='email'
        initialValue=''
        control={control}
        rules={{
          required: 'Please enter your email.',
          validate: (val) => {
            const re = /\S+@\S+\.\S+/;
            if (!re.test(val)) {
              return 'Please enter a valid Email adress.';
            }
            return true;
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <CustomTextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='Email'
              error={errors.email?.message}
            />
          );
        }}
      />
      <Controller
        name='password'
        initialValue=''
        control={control}
        rules={{ required: 'Please enter your password.' }}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <CustomTextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.textInput}
              isPassword
              placeholder='Password'
              error={errors.password?.message}
            />
          );
        }}
      />
      <Controller
        name='confirmPassword'
        initialValue=''
        control={control}
        rules={{
          validate: (val) => {
            if (val !== watch('password')) {
              return 'Passwords do not match.';
            }
            return true;
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <CustomTextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              isPassword
              placeholder='Confirm Password'
              style={styles.textInput}
              error={errors.confirmPassword?.message}
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
