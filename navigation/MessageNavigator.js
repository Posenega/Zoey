import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesScreen, {
  messageOptions,
} from "../screens/messages/MessagesScreen";
import Colors, { getThemeColor } from "../constants/Colors";

import { connect } from "react-redux";

const Stack = createStackNavigator();

const MessageNavigator = (props) => (
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
      name="messages"
      component={MessagesScreen}
      options={messageOptions}
    />
  </Stack.Navigator>
);

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(MessageNavigator);
