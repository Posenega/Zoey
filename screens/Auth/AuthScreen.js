import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { connect } from "react-redux";
import CustomButton from "../../components/CustomButton";
import Colors, { getThemeColor } from "../../constants/Colors";

function AuthScreen(props) {
  const styles = getStyles(props.theme);
  return (
    <View style={styles.authScreen}>
      <Text style={styles.header}>Welcome to BookApp</Text>
      <Text style={styles.subHeader}>Choose how you want to log in</Text>
      <CustomButton onPress={() => props.navigation.navigate("createAccount")}>
        Create An Account
      </CustomButton>
      <Text style={styles.signIn}>
        Already have an account?
        <TouchableWithoutFeedback
          onPress={() => props.navigation.navigate("signIn")}
        >
          <Text style={styles.signInButton}> Sign In</Text>
        </TouchableWithoutFeedback>
      </Text>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    authScreen: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      fontFamily: "rubik-bold",
      fontSize: 20,
      color: getThemeColor("text", theme),
      marginBottom: 5,
    },
    subHeader: {
      fontSize: 14,
      color: "#979797",
      marginTop: 5,
      marginBottom: 10,
    },
    signIn: {
      marginTop: 5,
      fontSize: 10,
      color: "#979797",
    },
    signInButton: {
      color: getThemeColor("primary", theme),
      fontFamily: "rubik-bold",
    },
  });

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(AuthScreen);
