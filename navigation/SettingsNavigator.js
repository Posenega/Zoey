import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen, {
  accountOptions as accountScreenOptions,
} from "../screens/AccountScreen";
import SettingsScreen, {
  screenOptions as settingsScreenOptions,
} from "../screens/SettingsScreen";
import Colors from "../constants/Colors";

const Stack = createStackNavigator();

const defaultNavOptions = {
  headerShown: true,
  headerTransparent: true,

  headerTitleStyle: {
    fontFamily: "rubik-bold",
    fontSize: 18,
    color: getThemeColor("text", props.theme),
  },
  headerTitleAlign: "left",
};

const SettingsNavigator = () => (
  <Stack.Navigator screenOptions={defaultNavOptions}>
    <Stack.Screen
      name="settings"
      component={SettingsScreen}
      options={settingsScreenOptions}
    />
    <Stack.Screen
      name="account"
      component={AccountScreen}
      options={accountScreenOptions}
    />
  </Stack.Navigator>
);
export default SettingsNavigator;
