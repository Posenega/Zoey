import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Colors, { getThemeColor } from "../constants/Colors";
import { connect } from "react-redux";
import ProfileScreen, { profileScreenOptions } from "../screens/ProfileScreen";

const Stack = createStackNavigator();

const BooksNavigator = (props) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
      headerTransparent: true,

      headerTitleStyle: {
        fontFamily: "rubik-bold",
        fontSize: 18,
        color: getThemeColor("text", props.theme),
      },
      cardStyle: {
        backgroundColor: getThemeColor("background", props.theme),
      },
      headerTitleAlign: "left",
    }}
  >
    <Stack.Screen
      name="profile"
      component={ProfileScreen}
      options={profileScreenOptions}
    />
  </Stack.Navigator>
);

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(BooksNavigator);
