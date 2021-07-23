import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Colors, { getThemeColor } from "../constants/Colors";
import ProfileScreen, {
  screenOptions as profileScreenOptions,
} from "../screens/ProfileScreen";
import SettingsScreen, {
  screenOptions as settingsScreenOptions,
} from "../screens/SettingsScreen";
import BookDetailScreen, {
  screenOptions as bookDetailScreenOptions,
} from "../screens/BookDetailScreen";
import AccountScreen, {
  accountOptions as accountScreenOptions,
} from "../screens/AccountScreen";
import { connect } from "react-redux";

const Stack = createStackNavigator();

const ProfileNavigator = (props) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
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
    <Stack.Screen
      name="settings"
      component={SettingsScreen}
      options={settingsScreenOptions}
    />
    <Stack.Screen
      name="detail"
      component={BookDetailScreen}
      options={bookDetailScreenOptions}
    />
    <Stack.Screen
      name="account"
      component={AccountScreen}
      options={accountScreenOptions}
    />
  </Stack.Navigator>
);

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(ProfileNavigator);
