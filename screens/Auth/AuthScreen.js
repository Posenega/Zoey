import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import CustomButton from "../../components/CustomButton";
import Colors from "../../constants/Colors";

export default function AuthScreen(props) {
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

const styles = StyleSheet.create({
  authScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontFamily: "rubik-bold",
    fontSize: 20,
    color: Colors.accentColor,
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
    color: Colors.primaryColor,
  },
});
