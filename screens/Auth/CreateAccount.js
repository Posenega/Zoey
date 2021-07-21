import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import * as Progress from 'react-native-progress';
import CustomTextInput from '../../components/CustomTextInput';
import Colors from '../../constants/Colors';
import ArrowButton from '../../components/Icons/ArrowButton';
import StepOne from '../../components/steps/StepOne';
import StepTwo from '../../components/steps/StepTwo';
import StepThree from '../../components/steps/StepThree';
import { useForm, Controller } from 'react-hook-form';

import BackButton from '../../components/Icons/BackButton';
import { signupUser } from '../../store/actions/auth';

export default function CreateAccount(props) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (step < 3) {
      setStep(step + 1);
    }
    if (step === 3) {
      const { firstName, lastName, email, password } = data;
      setEmail(email);
      dispatch(
        signupUser(firstName, lastName, email, password, setError)
      );
    }
  };
  const handleStepbackward = () => {
    if (step === 1) {
      props.navigation.goBack();
    } else {
      setStep(step - 1);
    }
  };
  let currentStep = <StepOne control={control} errors={errors} />;
  if (step === 2) {
    currentStep = (
      <StepTwo control={control} errors={errors} watch={watch} />
    );
  } else if (step === 1) {
    currentStep = <StepOne control={control} errors={errors} />;
  } else {
    currentStep = <StepThree control={control} errors={errors} />;
  }
  const backButton = (
    <View style={styles.backButton}>
      <BackButton
        size={40}
        color='#2b2b2b'
        onPress={handleStepbackward}
      />
    </View>
  );
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.createAccountScreen}>
        {backButton}
        <View style={styles.header}>
          <Text>Sign Up</Text>
          {step === 4 ? (
            <Text>Verification</Text>
          ) : (
            <Text>Step: {step}/3</Text>
          )}
        </View>
        <View style={styles.progressBar}>
          <Progress.Bar
            color={Colors.primaryColor}
            progress={step / 3}
            width={null}
            borderWidth={0}
          />
        </View>
        {currentStep}
        {step === 4 ? null : (
          <TouchableWithoutFeedback onPress={handleSubmit(onSubmit)}>
            <View style={styles.signInButton}>
              <Text style={styles.textSignIn}>Continue</Text>
              <ArrowButton color='white' size={18} />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  createAccountScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 62,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressBar: {
    marginTop: 15,
    marginBottom: 32,
    width: '100%',
  },

  signInButton: {
    height: 44,
    width: '100%',
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textSignIn: {
    color: 'white',
    fontSize: 14,
  },
  backButton: {
    position: 'absolute',
    left: 25,
    top: 75,
  },
});
