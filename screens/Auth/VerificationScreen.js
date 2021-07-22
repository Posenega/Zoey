import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { useForm, Controller } from 'react-hook-form';
import { logout, verifyUser } from '../../store/actions/auth';
import Colors from '../../constants/Colors';
import BackButton from '../../components/Icons/BackButton';

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
      <View style={styles.backButton}>
        <BackButton
          size={40}
          color='#2b2b2b'
          onPress={() => {
            dispatch(logout());
          }}
        />
      </View>

      <Text style={{ textAlign: 'center', paddingHorizontal: 18 }}>
        A verification code has been sent to {email}
      </Text>
      <Controller
        control={control}
        name='code'
        defaultValue=''
        rules={{
          minLength: {
            value: 4,
            message: 'Please code should be 4 characters',
          },
          maxLength: {
            value: 4,
            message: 'Please code should be 4 characters',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <CustomTextInput
              placeholder='Enter code...'
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.code?.message}
              keyboardType='number-pad'
            />
          );
        }}
      />
      <CustomButton onPress={handleSubmit(onSubmit)}>
        {isLoading ? (
          <ActivityIndicator
            size='small'
            color={Colors.accentColor}
          />
        ) : (
          'Proceed'
        )}
      </CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  verificationScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  input: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  backButton: {
    position: 'absolute',
    left: 25,
    top: 75,
  },
});
