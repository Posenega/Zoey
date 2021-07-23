import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "../screens/Auth/AuthScreen";
import SignInScreen from "../screens/Auth/SignInScreen";
import CreateAccount from "../screens/Auth/CreateAccount";
import { getThemeColor } from "../constants/Colors";
import { connect } from "react-redux";

const Stack = createStackNavigator();

const AuthNavigator = (props) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: getThemeColor("background", props.theme),
      },
    }}
  >
    <Stack.Screen name="auth" component={AuthScreen} />
    <Stack.Screen name="signIn" component={SignInScreen} />
    <Stack.Screen name="createAccount" component={CreateAccount} />
  </Stack.Navigator>
);

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(AuthNavigator);
