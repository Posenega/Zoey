import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as Progress from "react-native-progress";
import CustomTextInput from "../../components/CustomTextInput";
import Colors, { getThemeColor } from "../../constants/Colors";
import ArrowButton from "../../components/Icons/ArrowButton";
import StepOne from "../../components/steps/StepOne";
import StepTwo from "../../components/steps/StepTwo";
import StepThree from "../../components/steps/StepThree";
import { useForm, Controller } from "react-hook-form";

import BackButton from "../../components/Icons/BackButton";
import { signupUser } from "../../store/actions/auth";

function CreateAccount(props) {
  const styles = getStyles(props.theme);
  const [step, setStep] = useState(1);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (isLoading) {
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    }
    if (step === 3) {
      const { firstName, lastName, email, password, city } = data;
      dispatch(
        signupUser(firstName, lastName, email, password, city, setError)
      );
    }
  };
  const handleStepbackward = () => {
    if (isLoading) {
      return;
    }
    if (step === 1) {
      props.navigation.goBack();
    } else {
      setStep(step - 1);
    }
  };
  let currentStep = <StepOne control={control} errors={errors} />;
  if (step === 2) {
    currentStep = <StepTwo control={control} errors={errors} watch={watch} />;
  } else if (step === 1) {
    currentStep = <StepOne control={control} errors={errors} />;
  } else {
    currentStep = <StepThree control={control} errors={errors} />;
  }
  const backButton = (
    <View style={styles.backButton}>
      <BackButton
        size={40}
        color={getThemeColor("text", props.theme)}
        onPress={handleStepbackward}
      />
    </View>
  );
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.createAccountScreen}>
        {backButton}
        <View style={styles.header}>
          <Text style={styles.headerText}>Sign Up</Text>
          <Text style={styles.headerText}>Step: {step}/3</Text>
        </View>
        <View style={styles.progressBar}>
          <Progress.Bar
            color={getThemeColor("primary", props.theme)}
            progress={step / 3}
            width={null}
            borderWidth={0}
          />
        </View>
        {currentStep}
        {step === 4 ? null : (
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <View style={styles.signInButton}>
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <>
                  <Text style={styles.textSignIn}>Continue</Text>
                  <ArrowButton color="white" size={18} />
                </>
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
const getStyles = (theme) =>
  StyleSheet.create({
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
    headerText: {
      color: getThemeColor("text", theme),
    },
    progressBar: {
      marginTop: 15,
      marginBottom: 32,
      width: "100%",
    },

    signInButton: {
      height: 44,
      width: "100%",
      backgroundColor: getThemeColor("primary", theme),
      justifyContent: "center",
      alignItems: "center",
      marginTop: 25,
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "center",
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

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(CreateAccount);
