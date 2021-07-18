import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import * as Progress from "react-native-progress";
import CustomTextInput from "../../components/CustomTextInput";
import Colors from "../../constants/Colors";
import ArrowButton from "../../components/Icons/ArrowButton";
import StepOne from "../../components/steps/StepOne";
import StepTwo from "../../components/steps/StepTwo";
import StepThree from "../../components/steps/StepThree";

import BackButton from "../../components/Icons/BackButton";
import { signupUser } from "../../store/actions/auth";

export default function CreateAccount(props) {
  const [step, setStep] = useState(1);
  const data = useRef({});

  const dispatch = useDispatch();

  const handleStepForward = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      const { firstName, lastName, email, password } = data.current;
      dispatch(signupUser(firstName, lastName, email, password));
    }
  };
  const handleStepbackward = () => {
    if (step === 1) {
      props.navigation.navigate("auth");
    } else {
      setStep(step - 1);
    }
  };
  let currentStep = (
    <StepOne
      onChange={(gData) => (data.current = { ...data.current, ...gData })}
    />
  );
  if (step === 2) {
    currentStep = (
      <StepTwo
        onChange={(gData) => (data.current = { ...data.current, ...gData })}
      />
    );
  } else if (step === 1) {
    currentStep = (
      <StepOne
        onChange={(gData) => (data.current = { ...data.current, ...gData })}
      />
    );
  } else {
    currentStep = <StepThree />;
  }
  const backButton = (
    <View style={styles.backButton}>
      <BackButton size={40} color="#2b2b2b" onPress={handleStepbackward} />
    </View>
  );
  return (
    <View style={styles.createAccountScreen}>
      {backButton}
      <View style={styles.header}>
        <Text>Sign Up</Text>
        <Text>Step: {step}/3</Text>
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
      <TouchableWithoutFeedback onPress={handleStepForward}>
        <View style={styles.signInButton}>
          <Text style={styles.textSignIn}>Continue</Text>
          <ArrowButton color="white" size={18} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  createAccountScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 62,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressBar: {
    marginTop: 15,
    marginBottom: 32,
    width: "100%",
  },

  signInButton: {
    height: 44,
    width: "100%",
    backgroundColor: Colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 100,
  },
  textSignIn: {
    color: "white",
    fontSize: 14,
  },
  backButton: {
    position: "absolute",
    left: 25,
    top: 75,
  },
});
