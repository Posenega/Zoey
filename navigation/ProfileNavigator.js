import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Colors from "../constants/Colors";
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

const Stack = createStackNavigator();

const defaultNavOptions = {
  headerShown: false,
  headerTransparent: true,

  headerTitleStyle: {
    fontFamily: "rubik-bold",
    fontSize: 18,
    color: Colors.accentColor,
  },
  headerTitleAlign: "left",
};

const ProfileNavigator = () => (
  <Stack.Navigator screenOptions={defaultNavOptions}>
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
export default ProfileNavigator;
